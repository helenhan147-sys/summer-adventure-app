const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(match => match[1]);

if (scripts.length === 0) throw new Error('No inline script found');
for (const source of scripts) new Function(source);

const required = [
  'data-task="sport"',
  'data-task="english"',
  'data-task="calculation"',
  'data-task="writing"',
  'data-task="thinking"',
  'data-task="go"',
  'data-task="picture"',
  'data-task="fun"',
  'data-task="outdoor"',
  'class="badge-grid"',
  'class="progress-track"',
  'id="flagRail"',
  "star.className = 'star-pop'",
  'function playCheckinSound()',
  'function playRandomVoice(kind, fallback)',
  'function startBackgroundMusic()',
  'data-voice-weight="3"',
  'id="backgroundAudio"',
  'id="backgroundAudioList"',
  "playRandomVoice('island', playCheckinSound)",
  "playRandomVoice('sun', playCheckinSound)",
  'aria-valuemax="183"',
  '@keyframes island-wobble'
];

const missing = required.filter(item => !html.includes(item));
if (missing.length) throw new Error(`Missing: ${missing.join(', ')}`);

const imageMatch = html.match(/<img\s+src="([^"]+)"/);
if (!imageMatch) throw new Error('Map reference missing');
if (!imageMatch[1].startsWith('data:image/webp;base64,')) throw new Error('Embedded map asset missing');

const taskHotspots = (html.match(/data-task="[^"]+"[^>]*><\/button>/g) || []).length;
if (taskHotspots !== 9) throw new Error(`Expected 9 invisible task hotspots, found ${taskHotspots}`);
const wobblePieces = (html.match(/class="wobble-piece"/g) || []).length;
if (wobblePieces !== 9) throw new Error(`Expected 9 wobble pieces, found ${wobblePieces}`);
const islandVoices = (html.match(/data-voice-kind="island"/g) || []).length;
const sunVoices = (html.match(/data-voice-kind="sun"/g) || []).length;
const heavyIslandVoices = (html.match(/data-voice-kind="island"[^>]+data-voice-weight="3"/g) || []).length;
const backgroundTracks = (html.match(/assets\/Voices\/Background/g) || []).length;
if (islandVoices !== 27) throw new Error(`Expected 27 island voices, found ${islandVoices}`);
if (sunVoices !== 1) throw new Error(`Expected 1 sun voice, found ${sunVoices}`);
if (heavyIslandVoices !== 5) throw new Error(`Expected 5 weighted island voices, found ${heavyIslandVoices}`);
if (backgroundTracks !== 6) throw new Error(`Expected 6 background tracks, found ${backgroundTracks}`);

console.log(JSON.stringify({
  syntax: 'ok',
  inlineScripts: scripts.length,
  mapAsset: 'embedded webp',
  taskHotspots,
  wobblePieces,
  islandVoices,
  sunVoices,
  heavyIslandVoices,
  backgroundTracks,
  totalGoal: 183,
  htmlBytes: Buffer.byteLength(html)
}, null, 2));
