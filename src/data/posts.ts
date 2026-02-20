export type Post = {
  id: number;
  author: string;
  handle: string;
  text: string;
  timestamp: Date;
  type: "text" | "photo" | "video" | "link";
  likes: number;
  comments: number;
  shares: number;
  avatar: string;
  bio?: string;
  followers?: number;
  following?: number;
};

export const posts: Post[] = [
  {
    id: 1,
    author: "Alice Chen",
    handle: "@alicechen",
    text: "Just shipped a new feature for our internationalization pipeline. The translation quality has been incredible across all supported languages.",
    timestamp: new Date("2026-02-18T14:30:00"),
    type: "text",
    likes: 42,
    comments: 7,
    shares: 12,
    avatar: "AC",
    bio: "Engineering lead at a translation startup. Building bridges between languages.",
    followers: 2340,
    following: 891,
  },
  {
    id: 2,
    author: "Marcus Rivera",
    handle: "@mrivera",
    text: "Check out this architecture diagram for our new multilingual content delivery system.",
    timestamp: new Date("2026-02-18T12:15:00"),
    type: "photo",
    likes: 128,
    comments: 23,
    shares: 45,
    avatar: "MR",
    bio: "Systems architect. Distributed systems and localization infrastructure.",
    followers: 5120,
    following: 430,
  },
  {
    id: 3,
    author: "Yuki Tanaka",
    handle: "@yukitanaka",
    text: "Recorded a walkthrough of the new locale switching feature. Seamless transitions between 5 languages.",
    timestamp: new Date("2026-02-17T22:00:00"),
    type: "video",
    likes: 256,
    comments: 31,
    shares: 67,
    avatar: "YT",
    bio: "Frontend developer and i18n enthusiast. Making the web accessible to everyone.",
    followers: 8900,
    following: 612,
  },
  {
    id: 4,
    author: "Sarah Kim",
    handle: "@sarahkim",
    text: "Great article on the future of real-time translation in web applications.",
    timestamp: new Date("2026-02-17T18:45:00"),
    type: "link",
    likes: 1,
    comments: 1,
    shares: 3,
    avatar: "SK",
    bio: "Tech journalist covering localization and AI translation.",
    followers: 12400,
    following: 1520,
  },
  {
    id: 5,
    author: "David Okafor",
    handle: "@dokafor",
    text: "Our team just crossed 1,000,000 translated strings this quarter. The automation tools have been a game changer for our workflow.",
    timestamp: new Date("2026-02-17T10:20:00"),
    type: "text",
    likes: 891,
    comments: 156,
    shares: 203,
    avatar: "DO",
    bio: "VP of Engineering. Scaling translation infrastructure for global products.",
    followers: 15600,
    following: 340,
  },
];

export const comments: Record<number, { author: string; handle: string; text: string; timestamp: Date }[]> = {
  1: [
    { author: "Marcus Rivera", handle: "@mrivera", text: "Congrats on the launch! The pipeline looks solid.", timestamp: new Date("2026-02-18T15:00:00") },
    { author: "Yuki Tanaka", handle: "@yukitanaka", text: "The quality improvements are really noticeable. Great work!", timestamp: new Date("2026-02-18T15:30:00") },
  ],
  2: [
    { author: "Alice Chen", handle: "@alicechen", text: "Love the separation of concerns in this design.", timestamp: new Date("2026-02-18T13:00:00") },
    { author: "David Okafor", handle: "@dokafor", text: "We should adopt this pattern for our next project.", timestamp: new Date("2026-02-18T13:45:00") },
    { author: "Sarah Kim", handle: "@sarahkim", text: "Would love to write about this architecture. Mind if I reach out?", timestamp: new Date("2026-02-18T14:10:00") },
  ],
  3: [
    { author: "Sarah Kim", handle: "@sarahkim", text: "Smooth transitions! What framework are you using?", timestamp: new Date("2026-02-17T23:00:00") },
  ],
  4: [
    { author: "Yuki Tanaka", handle: "@yukitanaka", text: "Bookmarked. The section on neural machine translation was fascinating.", timestamp: new Date("2026-02-17T19:30:00") },
  ],
  5: [
    { author: "Alice Chen", handle: "@alicechen", text: "That's an incredible milestone! What was the biggest scaling challenge?", timestamp: new Date("2026-02-17T11:00:00") },
    { author: "Marcus Rivera", handle: "@mrivera", text: "A million strings! The automation really pays off at scale.", timestamp: new Date("2026-02-17T11:30:00") },
    { author: "Yuki Tanaka", handle: "@yukitanaka", text: "Inspiring numbers. Our team is working toward the same goal.", timestamp: new Date("2026-02-17T12:15:00") },
    { author: "Sarah Kim", handle: "@sarahkim", text: "This deserves a feature article. The growth is remarkable.", timestamp: new Date("2026-02-17T13:00:00") },
  ],
};

export const trendingTopics = [
  { tag: "i18n", postCount: 1240 },
  { tag: "localization", postCount: 890 },
  { tag: "translation-api", postCount: 672 },
  { tag: "multilingual", postCount: 534 },
  { tag: "react-i18n", postCount: 421 },
  { tag: "next-intl", postCount: 388 },
  { tag: "general-translation", postCount: 315 },
  { tag: "language-ai", postCount: 278 },
];

export const suggestedUsers: Pick<Post, "author" | "handle" | "avatar" | "bio">[] = [
  { author: "Priya Sharma", handle: "@priyasharma", avatar: "PS", bio: "Localization engineer at a global e-commerce company." },
  { author: "Jean-Luc Martin", handle: "@jlmartin", avatar: "JM", bio: "French-Canadian developer passionate about accessible i18n." },
  { author: "Aisha Bello", handle: "@aishabello", avatar: "AB", bio: "Open source contributor focused on African language support." },
];

export function getPostById(id: number): Post | undefined {
  return posts.find((p) => p.id === id);
}

export function getPostsByHandle(handle: string): Post[] {
  return posts.filter((p) => p.handle === handle);
}

export function getUserByHandle(handle: string): Post | undefined {
  return posts.find((p) => p.handle === handle);
}
