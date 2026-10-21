import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const bodoni = readFileSync(new URL("../src/fonts/bodoni-normal.woff2", import.meta.url)).toString(
  "base64",
);
const instrument = readFileSync(
  new URL("../src/fonts/instrument-normal.woff2", import.meta.url),
).toString("base64");

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: "Bodoni";
    src: url(data:font/woff2;base64,${bodoni}) format("woff2");
    font-weight: 400 900;
    font-display: block;
  }
  @font-face {
    font-family: "Instrument";
    src: url(data:font/woff2;base64,${instrument}) format("woff2");
    font-weight: 400 700;
    font-display: block;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1200px; height: 630px; }
  body {
    display: grid;
    grid-template-columns: 730px 470px;
    background: #E9E4DA;
    color: #111315;
    font-family: "Instrument", sans-serif;
    overflow: hidden;
  }
  .left {
    position: relative;
    padding: 58px 64px 46px 70px;
    display: flex;
    flex-direction: column;
  }
  .left::after {
    content: "";
    position: absolute;
    inset: 22px;
    border: 1px solid rgba(17,19,21,0.14);
    pointer-events: none;
  }
  .kicker {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #555b57;
  }
  .kicker i {
    display: block;
    width: 34px;
    height: 1px;
    background: #8E6E4A;
  }
  .brand {
    margin-top: 44px;
    font-family: "Bodoni", serif;
    font-size: 132px;
    line-height: 0.82;
    letter-spacing: -0.055em;
    font-weight: 500;
  }
  .descriptor {
    margin-top: 20px;
    font-size: 12px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #555b57;
  }
  .rule {
    width: 96px;
    height: 1px;
    margin-top: 30px;
    background: #8E6E4A;
  }
  .claim {
    margin-top: 26px;
    font-family: "Bodoni", serif;
    font-size: 35px;
    line-height: 1.16;
    letter-spacing: -0.02em;
    max-width: 560px;
  }
  .claim em { color: #705333; }
  .foot {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #555b57;
  }
  .right {
    position: relative;
    background: #111315;
    overflow: hidden;
  }
  .right::before {
    content: "";
    position: absolute;
    inset: 22px;
    border: 1px solid rgba(233,228,218,0.16);
  }
  .right svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .coordinates {
    position: absolute;
    left: 46px;
    bottom: 42px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #A8ADA8;
  }
  .sequence {
    position: absolute;
    right: 44px;
    top: 42px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #A8ADA8;
    writing-mode: vertical-rl;
  }
</style>
</head>
<body>
  <section class="left">
    <p class="kicker"><i></i>Proyecto conceptual · Estrategia jurídica</p>
    <p class="brand">VÉRTICE</p>
    <p class="descriptor">Derecho · Criterio · Decisión</p>
    <span class="rule"></span>
    <p class="claim">El derecho se interpreta.<br><em>La estrategia se construye.</em></p>
    <div class="foot"><span>La geometría de la ley</span><span>Madrid · España</span></div>
  </section>
  <section class="right">
    <svg viewBox="0 0 470 630" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M92 118H378V512H92V118Z" stroke="#E9E4DA" stroke-opacity="0.4" stroke-width="1"/>
      <path d="M92 118L235 315L378 118M92 512L235 315L378 512" stroke="#E9E4DA" stroke-opacity="0.28" stroke-width="1"/>
      <path d="M235 118V512" stroke="#E9E4DA" stroke-opacity="0.3" stroke-width="1"/>
      <path d="M160 232H310V424H160V232Z" stroke="#B08A5F" stroke-opacity="0.6" stroke-width="1"/>
      <path d="M160 232L235 315L310 232M160 424L235 315L310 424" stroke="#B08A5F" stroke-opacity="0.38" stroke-width="1"/>
      <path d="M176 278L235 454L294 278" stroke="#E9E4DA" stroke-width="1.4"/>
      <path d="M235 264V454" stroke="#E9E4DA" stroke-opacity="0.72" stroke-width="1"/>
      <circle cx="235" cy="454" r="4.5" fill="#B08A5F"/>
      <path d="M92 92V118M378 92V118M92 512V538M378 512V538" stroke="#A8ADA8" stroke-opacity="0.55" stroke-width="1"/>
      <path d="M235 118H420M235 512H420" stroke="#777C78" stroke-opacity="0.38" stroke-width="1"/>
      <circle cx="235" cy="315" r="120" stroke="#8E6E4A" stroke-opacity="0.16" stroke-width="1"/>
      <text x="92" y="78" fill="#A8ADA8" font-family="Instrument, sans-serif" font-size="10" letter-spacing="2.4">PLANO 01</text>
      <text x="378" y="78" text-anchor="end" fill="#777C78" font-family="Instrument, sans-serif" font-size="10" letter-spacing="2.4">ESCALA 1:1</text>
      <text x="92" y="568" fill="#777C78" font-family="Instrument, sans-serif" font-size="10" letter-spacing="2.4">EJE V / DECISIÓN</text>
      <text x="378" y="568" text-anchor="end" fill="#A8ADA8" font-family="Instrument, sans-serif" font-size="10" letter-spacing="2.4">X 04.12 / Y 08.37</text>
    </svg>
    <span class="sequence">La geometría de la ley</span>
    <span class="coordinates">40° 25′ N · 03° 42′ O</span>
  </section>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(200);
await page.screenshot({ path: "public/og.png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

console.log("public/og.png generado (1200×630).");
