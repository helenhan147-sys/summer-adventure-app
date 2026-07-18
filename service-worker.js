const CACHE_NAME = 'summer-adventure-pwa-v1784390772250';
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/map-background.webp",
  "./assets/pig-cape.png",
  "./assets/wobble-sport.webp",
  "./assets/wobble-english.webp",
  "./assets/wobble-calculation.webp",
  "./assets/wobble-go.webp",
  "./assets/wobble-picture.webp",
  "./assets/wobble-writing.webp",
  "./assets/wobble-thinking.webp",
  "./assets/wobble-fun.webp",
  "./assets/wobble-finish.webp",
  "./assets/real-dolphin.wav",
  "./assets/real-seagull.mp3",
  "./assets/real-ship-horn.mp3",
  "./assets/Voices/Click%20Island/1-25%20Launch%20from%20the%20Skyview%20Tower!.m4a",
  "./assets/Voices/Click%20Island/1-29%20Descend%20to%20the%20Depths.m4a",
  "./assets/Voices/Click%20Island/01.%20Crazy%20Dave's%20Greeting.m4a",
  "./assets/Voices/Click%20Island/2-05.%20Cooking%20Fanfare%20(Major%20Success).m4a",
  "./assets/Voices/Click%20Island/5-25.%20Game%20Over.m4a",
  "./assets/Voices/Click%20Island/6-03.%20A%20Korok%20Appears.m4a",
  "./assets/Voices/Click%20Island/6-04.%20Hestu's%20Dance.m4a",
  "./assets/Voices/Click%20Island/7-31%20Hestu's%20Dance!%20-Upgrade-.m4a",
  "./assets/Voices/Click%20Island/9-33%20Get%20Fanfare%20(Important%20Item).m4a",
  "./assets/Voices/Click%20Island/9-38%20Zonai%20Device%20Dispenser.m4a",
  "./assets/Voices/Click%20Island/9-42%20Korok%20Challenge%20Complete.m4a",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_17_03_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_17_52_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_18_27_Crazy%20Eddie_pvc_sp101_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_19_02_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_19_30_Crazy%20Eddie_pvc_sp101_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_20_20_Crazy%20Eddie_pvc_sp101_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_20_49_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_21_09_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_21_28_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_21_47_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_22_48_Crazy%20Eddie_pvc_sp101_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_23_11_Crazy%20Eddie_pvc_sp101_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_23_40_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_24_10_Crazy%20Eddie_pvc_sp101_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_24_21_Crazy%20Eddie_pvc_sp101_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_24_33_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_24_53_female%20teacher%20talking%20to%20kids_gen_sp100_s50_sb75_se0_b_m2.mp3",
  "./assets/Voices/Click%20Island/ElevenLabs_2026-07-17T05_34_34_Hinata%20-%20Inviting%2C%20Smooth%20and%20Measured_pvc_sp100_s93_sb60_se49_b_m2.mp3",
  "./assets/Voices/Click%20Island/JPMale_01.mp3",
  "./assets/Voices/Click%20Island/JPMale_02.mp3",
  "./assets/Voices/Click%20Island/JPMale_03.mp3",
  "./assets/Voices/Click%20Island/JPMale_04.mp3",
  "./assets/Voices/Click%20Sun/ElevenLabs_2026-07-17T05_28_03_Crazy%20Eddie_pvc_sp70_s0_sb62_se68_b_m2.mp3",
  "./assets/Voices/Firework/dragon-studio-fireworks-07-419025.m4a"
];
const RUNTIME_ASSETS = [
  "./assets/Voices/Background/1-06%20Opening.m4a",
  "./assets/Voices/Background/1-12%20Shrine%20of%20Light.m4a",
  "./assets/Voices/Background/1-43.%20Great%20Fairy%20Fountain.m4a",
  "./assets/Voices/Background/2-05%20Highlands.m4a",
  "./assets/Voices/Background/2-17%20Wind%20Temple-%201st%20Stage.m4a",
  "./assets/Voices/Background/2-25%20Heart%20Container%20Appears.m4a",
  "./assets/Voices/Background/2-31%20Rito%20Village%20(Day).m4a",
  "./assets/Voices/Background/2-35%20The%20Arrogant%20Master%20Kohga.m4a",
  "./assets/Voices/Background/3-14.%20Hinox%20Battle.m4a",
  "./assets/Voices/Background/3-36%20Furious%20Master%20Kohga.m4a",
  "./assets/Voices/Background/4-01%20Riding%20(Day).m4a",
  "./assets/Voices/Background/4-05.%20Battle%203%20(Field).m4a",
  "./assets/Voices/Background/4-28%20Zora's%20Domain%20(Day).m4a",
  "./assets/Voices/Background/4-36%20The%20Return%20of%20Master%20Kohga-%20Battle.m4a",
  "./assets/Voices/Background/5-09%20Kara%20Kara%20Bazaar%20Defense%20Battle.m4a",
  "./assets/Voices/Background/5-14.%20Goron%20City.m4a",
  "./assets/Voices/Background/5-28%20Gerudo%20Town%20(Day).m4a",
  "./assets/Voices/Background/6-06%20Lurelin%20Village%20(Day).m4a",
  "./assets/Voices/Background/6-11%20Lookout%20Landing%20Shrouded%20in%20Dark%20Clouds.m4a",
  "./assets/Voices/Background/6-19%20Lookout%20Landing%20(Four%20Sages%20Gathered).m4a",
  "./assets/Voices/Background/6-20%20Kakariko%20Village%20(Day).m4a",
  "./assets/Voices/Background/8-13.%20Hateno%20Village%20(Day).m4a",
  "./assets/Voices/Background/9-05%20Tarrey%20Town%20(Day).m4a",
  "./assets/Voices/Background/9-16%20Mini-Game%20(Yiga%20Clan%20Training).m4a",
  "./assets/Voices/Background/9-16.%20Korok%20Forest%20(Early%20Night%20to%20Day).m4a",
  "./assets/Voices/Background/9-25%20Stables.m4a"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  if (url.origin !== location.origin) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok && (SHELL_ASSETS.includes(url.pathname.split('/').pop()) || RUNTIME_ASSETS.some(asset => url.pathname.endsWith(asset.slice(1))))) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});
