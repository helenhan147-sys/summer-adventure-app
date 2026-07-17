const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const fragmentPath = path.join(projectRoot, 'src', 'summer-adventure-checkin.html');
const outputPath = path.join(projectRoot, 'index.html');
const assetRoot = path.join(projectRoot, 'assets');
const voiceRoot = path.join(assetRoot, 'Voices');
const imageNames = [
  'map-background.webp',
  'pig-cape.png',
  'wobble-sport.webp',
  'wobble-english.webp',
  'wobble-calculation.webp',
  'wobble-go.webp',
  'wobble-picture.webp',
  'wobble-writing.webp',
  'wobble-thinking.webp',
  'wobble-fun.webp',
  'wobble-finish.webp'
];
const audioNames = [
  'real-dolphin.wav',
  'real-seagull.mp3',
  'real-ship-horn.mp3'
];
let fragment = fs.readFileSync(fragmentPath, 'utf8');
for (const imageName of imageNames) {
  const imagePath = path.join(assetRoot, imageName);
  const mimeType = imageName.endsWith('.png') ? 'image/png' : 'image/webp';
  const imageData = `data:${mimeType};base64,${fs.readFileSync(imagePath).toString('base64')}`;
  fragment = fragment.replaceAll(`assets/${imageName}`, imageData);
}
for (const audioName of audioNames) {
  const audioPath = path.join(assetRoot, audioName);
  const mimeType = audioName.endsWith('.wav') ? 'audio/wav' : 'audio/mpeg';
  const audioData = `data:${mimeType};base64,${fs.readFileSync(audioPath).toString('base64')}`;
  fragment = fragment.replaceAll(`assets/${audioName}`, audioData);
}

function listVoiceFiles(folderName) {
  const folder = path.join(voiceRoot, folderName);
  return fs.readdirSync(folder, { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(mp3|wav|m4a|ogg)$/i.test(entry.name))
    .map(entry => path.join(folder, entry.name))
    .sort((left, right) => left.localeCompare(right, 'en', { numeric: true }));
}

function audioMime(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.wav') return 'audio/wav';
  if (extension === '.m4a') return 'audio/mp4';
  if (extension === '.ogg') return 'audio/ogg';
  return 'audio/mpeg';
}

function voiceMarkup(kind, files) {
  return files.map((filePath, index) => {
    const source = `data:${audioMime(filePath)};base64,${fs.readFileSync(filePath).toString('base64')}`;
    return `<audio preload="auto" playsinline data-voice-kind="${kind}" data-voice-index="${index}" src="${source}"></audio>`;
  }).join('\n');
}

const islandVoices = listVoiceFiles('Click Island');
const sunVoices = listVoiceFiles('Click Sun');
const voices = `${voiceMarkup('island', islandVoices)}\n${voiceMarkup('sun', sunVoices)}`;
if (!fragment.includes('<!--VOICE_AUDIO_POOL-->')) throw new Error('Voice audio pool placeholder missing');
fragment = fragment.replace('<!--VOICE_AUDIO_POOL-->', voices);

const document = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#29aeca">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <title>暑假冒险打卡</title>
  <style>
    :root {
      color-scheme: light dark;
      --background: #eafcff;
      --foreground: #18314c;
      --card: #ffffff;
      --card-foreground: #18314c;
      --muted: #d8f3f7;
      --muted-foreground: #547086;
      --primary: #147fa0;
      --primary-foreground: #ffffff;
      --secondary: #e6f7df;
      --secondary-foreground: #24422f;
      --accent: #fff1bc;
      --accent-foreground: #523c08;
      --border: #b8dbe2;
      --ring: #147fa0;
      --viz-series-1: #1f9ccc;
      --viz-series-2: #f2a623;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --background: #102a35;
        --foreground: #eaf8fb;
        --card: #183945;
        --card-foreground: #edf9fb;
        --muted: #244b58;
        --muted-foreground: #b5d1d8;
        --primary: #73d2ec;
        --primary-foreground: #092733;
        --secondary: #294a3a;
        --secondary-foreground: #e6f5ea;
        --accent: #5e4a1e;
        --accent-foreground: #fff4c8;
        --border: #3d6672;
        --ring: #73d2ec;
        --viz-series-1: #5cc9ee;
        --viz-series-2: #ffc657;
      }
    }

    html { background: var(--background); }
    body {
      margin: 0;
      min-width: 320px;
      background: var(--background);
      color: var(--foreground);
      font-family: "Microsoft YaHei", "PingFang SC", system-ui, sans-serif;
      font-size: 16px;
      line-height: 1.45;
    }

    main {
      width: 100%;
      max-width: 1480px;
      margin: 0 auto;
      padding: clamp(10px, 2vw, 24px);
      box-sizing: border-box;
    }

    button { font: inherit; }
    button:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
    .text-small { font-size: 12px; }
    .text-muted { color: var(--muted-foreground); }
  </style>
</head>
<body>
  <main>${fragment}</main>
</body>
</html>
`;

fs.writeFileSync(outputPath, document, 'utf8');
console.log(`${outputPath} (${islandVoices.length} island voices, ${sunVoices.length} sun voices)`);
