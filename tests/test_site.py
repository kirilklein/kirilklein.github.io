import json
import re
import unittest
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.references = []
        self.json_ld = []
        self._in_json_ld = False

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if "id" in attributes:
            self.ids.append(attributes["id"])
        for name in ("href", "src"):
            if name in attributes:
                self.references.append(attributes[name])
        self._in_json_ld = (
            tag == "script" and attributes.get("type") == "application/ld+json"
        )

    def handle_endtag(self, tag):
        if tag == "script":
            self._in_json_ld = False

    def handle_data(self, data):
        if self._in_json_ld:
            self.json_ld.append(data)


def parse_html(path):
    parser = SiteParser()
    parser.feed(path.read_text(encoding="utf-8"))
    parser.close()
    return parser


class SiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.index = parse_html(ROOT / "index.html")

    def test_html_ids_are_unique(self):
        self.assertEqual(len(self.index.ids), len(set(self.index.ids)))

    def test_local_links_and_anchors_exist(self):
        ids = set(self.index.ids)
        for reference in self.index.references:
            parsed = urlsplit(reference)
            if parsed.scheme or parsed.netloc:
                continue
            if parsed.path:
                target = ROOT / unquote(parsed.path)
                self.assertTrue(target.is_file(), f"Missing local target: {reference}")
            if parsed.fragment and not parsed.path:
                self.assertIn(parsed.fragment, ids, f"Missing anchor: {reference}")

    def test_css_assets_exist(self):
        css = (ROOT / "style.css").read_text(encoding="utf-8")
        for raw_reference in re.findall(r"url\(([^)]+)\)", css):
            reference = raw_reference.strip(" \"'")
            parsed = urlsplit(reference)
            if parsed.scheme or parsed.netloc or reference.startswith("data:"):
                continue
            self.assertTrue(
                (ROOT / unquote(parsed.path)).is_file(),
                f"Missing CSS asset: {reference}",
            )

    def test_structured_data_is_valid_json(self):
        self.assertTrue(self.index.json_ld, "No JSON-LD structured data found")
        for document in self.index.json_ld:
            json.loads(document)

    def test_sitemaps_are_valid_xml(self):
        sitemap_files = sorted(ROOT.glob("*sitemap.xml"))
        self.assertTrue(sitemap_files, "No sitemap files found")
        for sitemap in sitemap_files:
            with self.subTest(sitemap=sitemap.name):
                ET.parse(sitemap)

    def test_robots_points_to_root_sitemap(self):
        robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
        expected = "Sitemap: https://kirilklein.github.io/sitemap.xml"
        self.assertIn(expected, robots)

    def test_github_pages_marker_exists(self):
        self.assertTrue((ROOT / ".nojekyll").is_file())


if __name__ == "__main__":
    unittest.main()
