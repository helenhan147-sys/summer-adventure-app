const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const manifest = fs.readFileSync(path.resolve(__dirname, '..', 'manifest.webmanifest'), 'utf8');
const serviceWorker = fs.readFileSync(path.resolve(__dirname, '..', 'service-worker.js'), 'utf8');
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
  'assets/wobble-music.webp',
  'assets/wobble-mystery.webp',
  'assets/music-speaker-left.webp',
  'assets/music-speaker-right.webp',
  'data-music-control',
  'data-mystery-bonus',
  'function playMusicControl()',
  'function checkMysteryBonus(',
  'class="badge-grid"',
  'class="progress-track"',
  'id="flagRail"',
  "star.className = 'star-pop'",
  'function playCheckinSound()',
  'function playRandomVoice(kind, fallback)',
  'function startBackgroundMusic()',
  'function pauseBackgroundMusic()',
  'function resumeBackgroundMusic()',
  'summer-adventure-background-queue-v1',
  'function takeBackgroundIndex()',
  'function requestBackgroundCache()',
  "type: 'CACHE_BACKGROUND_TRACKS'",
  'music-note-dancer',
  'music-speaker left',
  "playRandomVoice('mystery', playCheckinSound)",
  'function synthFireworks()',
  "playRandomVoice('firework', synthFireworks)",
  "document.addEventListener('visibilitychange'",
  'data-voice-weight="3"',
  'data-voice-weight="2"',
  'id="backgroundAudio"',
  'id="backgroundAudioList"',
  "playRandomVoice('island', playCheckinSound)",
  "playRandomVoice('sun', playCheckinSound)",
  'aria-valuemax="183"',
  '@keyframes island-wobble'
];

const missing = required.filter(item => !html.includes(item));
if (missing.length) throw new Error(`Missing: ${missing.join(', ')}`);
if (html.includes('\n      startBackgroundMusic();\n\n      root.querySelector')) {
  throw new Error('Background music should wait for a user gesture before drawing from the persisted queue');
}
if (html.includes("window.addEventListener(type, startBackgroundMusic")) {
  throw new Error('Background music should be controlled by the music island, not any screen tap');
}

const imageMatch = html.match(/<img\s+src="([^"]+)"/);
if (!imageMatch) throw new Error('Map reference missing');
if (imageMatch[1] !== 'assets/map-background.webp') throw new Error(`Expected external map asset, found ${imageMatch[1]}`);
if (html.includes('data:image/') || html.includes('data:audio/')) throw new Error('PWA build should not embed image or audio data URIs');
if (!html.includes('rel="manifest" href="manifest.webmanifest"')) throw new Error('Manifest link missing');
if (!html.includes("navigator.serviceWorker.register('service-worker.js')")) throw new Error('Service worker registration missing');
if (!manifest.includes('"display": "standalone"')) throw new Error('Standalone display missing from manifest');
if (!serviceWorker.includes('APP_CACHE')) throw new Error('Service worker app cache missing');
if (!serviceWorker.includes('MEDIA_CACHE')) throw new Error('Service worker media cache missing');
if (!serviceWorker.includes("key.startsWith('summer-adventure-pwa-v')")) throw new Error('Old PWA caches should be preserved for already-cached music');
if (!serviceWorker.includes("event.data?.type !== 'CACHE_BACKGROUND_TRACKS'")) throw new Error('Background cache message handler missing');
if (!serviceWorker.includes('await wait(850)')) throw new Error('Background precache should be throttled');

const taskHotspots = (html.match(/data-task="[^"]+"[^>]*><\/button>/g) || []).length;
if (taskHotspots !== 9) throw new Error(`Expected 9 invisible task hotspots, found ${taskHotspots}`);
const wobblePieces = (html.match(/class="wobble-piece(?:\s[^"]*)?"/g) || []).length;
if (wobblePieces !== 11) throw new Error(`Expected 11 wobble pieces, found ${wobblePieces}`);
const islandVoices = (html.match(/data-voice-kind="island"/g) || []).length;
const sunVoices = (html.match(/data-voice-kind="sun"/g) || []).length;
const heavyIslandVoices = (html.match(/data-voice-kind="island"[^>]+data-voice-weight="3"/g) || []).length;
const doubleIslandVoices = (html.match(/data-voice-kind="island"[^>]+data-voice-weight="2"/g) || []).length;
const fireworkVoices = (html.match(/data-voice-kind="firework"/g) || []).length;
const mysteryVoices = (html.match(/data-voice-kind="mystery"/g) || []).length;
const backgroundTracks = (html.match(/assets\/Voices\/Background/g) || []).length;
if (islandVoices !== 34) throw new Error(`Expected 34 island voices, found ${islandVoices}`);
if (sunVoices !== 1) throw new Error(`Expected 1 sun voice, found ${sunVoices}`);
if (heavyIslandVoices !== 5) throw new Error(`Expected 5 weighted island voices, found ${heavyIslandVoices}`);
if (doubleIslandVoices !== 7) throw new Error(`Expected 7 double-weight island voices, found ${doubleIslandVoices}`);
if (fireworkVoices !== 1) throw new Error(`Expected 1 firework voice, found ${fireworkVoices}`);
if (mysteryVoices !== 12) throw new Error(`Expected 12 mystery voices, found ${mysteryVoices}`);
if (backgroundTracks !== 32) throw new Error(`Expected 32 background tracks, found ${backgroundTracks}`);

console.log(JSON.stringify({
  syntax: 'ok',
  inlineScripts: scripts.length,
  mapAsset: 'embedded webp',
  taskHotspots,
  wobblePieces,
  islandVoices,
  sunVoices,
  heavyIslandVoices,
  doubleIslandVoices,
  fireworkVoices,
  mysteryVoices,
  backgroundTracks,
  totalGoal: 183,
  pwa: true,
  htmlBytes: Buffer.byteLength(html)
}, null, 2));
