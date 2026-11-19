// Records the looping card previews from the live explainers.
// Usage: node scripts/record-previews.mjs [slug ...]   (needs ffmpeg on PATH)
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const VIEWPORT = { width: 960, height: 600 };
const CLIP_SECONDS = 8;
const CLIP_WIDTH = 640;
const RECORDINGS_DIRECTORY = path.resolve("scripts/.recordings");
const PREVIEWS_DIRECTORY = path.resolve("public/previews");

async function scrollToTopOfViewport(page, locator, gapAbove) {
  await locator.evaluate((element, gap) => {
    window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - gap);
  }, gapAbove);
}

const scenarios = {
  "tree-explorer": {
    url: "https://kirilklein.github.io/tree-explorer/",
    async act(page) {
      await page.waitForTimeout(800);
      await page.getByRole("link", { name: "Leaves" }).click();
      await page.waitForTimeout(3600);
      await page.evaluate(() => (window.location.hash = "#/roots"));
      await page.waitForTimeout(3800);
    },
  },
  "causal-sandbox": {
    url: "https://kirilklein.github.io/causal-sandbox/?sandbox",
    async act(page) {
      const adjustForConfounder = page.getByLabel("Adjust for C (Confounder)");
      const resultsHeading = page.getByRole("heading", { name: "Can we recover the effect?" });
      await scrollToTopOfViewport(page, resultsHeading, 90);
      await page.waitForTimeout(1500);
      await adjustForConfounder.check();
      await page.waitForTimeout(2200);
      await adjustForConfounder.uncheck();
      await page.waitForTimeout(2000);
      await adjustForConfounder.check();
      await page.waitForTimeout(2500);
    },
  },
  "bolmo-explainer": {
    url: "https://kirilklein.github.io/bolmo-explainer/",
    async act(page) {
      await scrollToTopOfViewport(page, page.getByRole("textbox").first(), 24);
      await page.waitForTimeout(1500);
      for (const preset of ["Code", "Strawberry", "DNA", "Flowerbeds"]) {
        await page.getByRole("button", { name: preset, exact: true }).click();
        await page.waitForTimeout(1700);
      }
    },
  },
};

function ffmpeg(args) {
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
}

async function record(slug, browser) {
  const scenario = scenarios[slug];
  const context = await browser.newContext({
    viewport: VIEWPORT,
    colorScheme: "dark",
    recordVideo: { dir: RECORDINGS_DIRECTORY, size: VIEWPORT },
  });
  const recordingStartedAt = Date.now();
  const page = await context.newPage();
  await page.goto(scenario.url, { waitUntil: "load" });
  await page.waitForTimeout(6000);
  const secondsBeforeAction = (Date.now() - recordingStartedAt) / 1000;
  await scenario.act(page);
  await context.close();
  const recordingPath = await page.video().path();

  const trim = ["-ss", secondsBeforeAction.toFixed(2), "-i", recordingPath, "-t", String(CLIP_SECONDS)];
  const scale = ["-vf", `scale=${CLIP_WIDTH}:-2,fps=24`, "-an"];
  const target = path.join(PREVIEWS_DIRECTORY, slug);
  ffmpeg([...trim, ...scale, "-c:v", "libvpx-vp9", "-crf", "42", "-b:v", "0", `${target}.webm`]);
  ffmpeg([...trim, ...scale, "-c:v", "libx264", "-crf", "27", "-pix_fmt", "yuv420p", "-movflags", "+faststart", `${target}.mp4`]);
  ffmpeg([...trim, "-vf", `scale=${CLIP_WIDTH}:-2`, "-frames:v", "1", "-q:v", "4", `${target}.jpg`]);
}

const requestedSlugs = process.argv.slice(2);
const slugs = requestedSlugs.length > 0 ? requestedSlugs : Object.keys(scenarios);

mkdirSync(PREVIEWS_DIRECTORY, { recursive: true });
const browser = await chromium.launch({
  args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"],
});
for (const slug of slugs) {
  console.log(`recording ${slug}`);
  await record(slug, browser);
}
await browser.close();
rmSync(RECORDINGS_DIRECTORY, { recursive: true, force: true });
