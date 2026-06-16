/* ============================================================
   PLACEHOLDER MEDIA
   Free/dummy sources for the demo. Swap these for real Creative Monk
   assets later (or generate with the prompts in PROMPTS at the bottom).
   - Images: Unsplash (hotlinkable, free).
   - Video: Google's public sample bucket + Mux test stream (free).
   ============================================================ */

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  heroPoster: U("1551434678-e076c223a692", 1920), // team working / dark desk
  culture: [
    U("1522071820081-009f0129c71c", 1200),
    U("1517048676732-d65bc937f952", 1200),
    U("1600880292203-757bb62b4baf", 1200),
    U("1531497865144-0464ef8fb9a9", 1200),
  ],
  bigCta: U("1497366216548-37526070297c", 1920), // dark office
  avatars: [
    U("1500648767791-00dcc994a43e", 200),
    U("1494790108377-be9c29b29330", 200),
    U("1507003211169-0a1dd7228f2d", 200),
    U("1438761681033-6461ffad8d80", 200),
    U("1472099645785-5658abf4ff4e", 200),
  ],
};

/** Short, muted, loopable sample clips (royalty-free test assets). */
export const VIDEO = {
  // Real Creative Monk hero clip (in /public/video). Poster = its first frame.
  hero: "/video/hero.mp4",
  heroPoster: "/video/hero-poster.jpg",
  samples: [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ],
  posters: [
    U("1574717024653-61fd2cf4d44d", 900),
    U("1492691527719-9d1e07e534b4", 900),
    U("1626785774573-4b799315345d", 900),
    U("1620712943543-bcc4688e7485", 900),
    U("1611162617474-5b21e879e113", 900),
    U("1558655146-9f40138edfeb", 900),
  ],
};
