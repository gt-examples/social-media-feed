import { T, Var, Num, DateTime, Plural, Branch } from "gt-next";
import Header from "@/components/Header";
import Disclaimer from "@/components/Disclaimer";

type Post = {
  id: number;
  author: string;
  handle: string;
  text: string;
  timestamp: Date;
  type: "text" | "photo" | "video" | "link";
  likes: number;
  comments: number;
  shares: number;
};

const posts: Post[] = [
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
  },
];

function PostTypeBadge({ type }: { type: Post["type"] }) {
  return (
    <T>
      <span className="inline-flex items-center rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300 border border-neutral-700">
        <Branch
          branch={type}
          text="Text"
          photo="Photo"
          video="Video"
          link="Link"
        />
      </span>
    </T>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <T>
      <article className="border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 transition-colors">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex-shrink-0 flex items-center justify-center text-sm font-medium text-neutral-400">
            <Var>{post.author[0]}</Var>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-neutral-100"><Var>{post.author}</Var></span>
              <span className="text-neutral-500 text-sm"><Var>{post.handle}</Var></span>
              <span className="text-neutral-600 text-sm">·</span>
              <span className="text-neutral-500 text-sm">
                <DateTime>{post.timestamp}</DateTime>
              </span>
              <PostTypeBadge type={post.type} />
            </div>
            <p className="mt-2 text-neutral-300 leading-relaxed"><Var>{post.text}</Var></p>
            <div className="mt-3 flex items-center gap-6 text-sm text-neutral-500">
              <span>
                <Num>{post.likes}</Num>{" "}
                <Plural singular="like" plural="likes" n={post.likes} />
              </span>
              <span>
                <Num>{post.comments}</Num>{" "}
                <Plural singular="comment" plural="comments" n={post.comments} />
              </span>
              <span>
                <Num>{post.shares}</Num>{" "}
                <Plural singular="share" plural="shares" n={post.shares} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </T>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Disclaimer />
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <T>
          <div className="mt-8 py-6 text-center text-neutral-600 text-sm border-t border-neutral-800">
            Showing <Num>{posts.length}</Num>{" "}
            <Plural singular="post" plural="posts" n={posts.length} />
          </div>
        </T>
      </main>
    </div>
  );
}
