import { T, Var, Num, Plural } from "gt-next";
import { getGT } from "gt-next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { getUserByHandle, getPostsByHandle } from "@/data/posts";

const postTextMap: Record<number, string> = {
  1: "Just shipped a new feature for our internationalization pipeline. The translation quality has been incredible across all supported languages.",
  2: "Check out this architecture diagram for our new multilingual content delivery system.",
  3: "Recorded a walkthrough of the new locale switching feature. Seamless transitions between 5 languages.",
  4: "Great article on the future of real-time translation in web applications.",
  5: "Our team just crossed 1,000,000 translated strings this quarter. The automation tools have been a game changer for our workflow.",
};

const bioMap: Record<string, string> = {
  "@alicechen": "Engineering lead at a translation startup. Building bridges between languages.",
  "@mrivera": "Systems architect. Distributed systems and localization infrastructure.",
  "@yukitanaka": "Frontend developer and i18n enthusiast. Making the web accessible to everyone.",
  "@sarahkim": "Tech journalist covering localization and AI translation.",
  "@dokafor": "VP of Engineering. Scaling translation infrastructure for global products.",
};

export default async function UserProfile({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const user = getUserByHandle(`@${handle}`);
  if (!user) notFound();

  const t = await getGT();
  const userPosts = getPostsByHandle(user.handle);
  const translatedBio = t(bioMap[user.handle] ?? user.bio ?? "");

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <T>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-6"
          >
            ← Back to feed
          </Link>
        </T>

        <T>
          <div className="border border-neutral-800 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-lg font-semibold text-neutral-300">
                <Var>{user.avatar}</Var>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-neutral-100"><Var>{user.author}</Var></h1>
                <p className="text-neutral-500 text-sm"><Var>{user.handle}</Var></p>
                <p className="mt-2 text-neutral-300 text-sm leading-relaxed">
                  <Var>{translatedBio}</Var>
                </p>
                <div className="mt-4 flex items-center gap-6 text-sm">
                  <span className="text-neutral-300">
                    <span className="font-semibold"><Num>{user.followers ?? 0}</Num></span>{" "}
                    <span className="text-neutral-500">
                      <Plural singular="follower" plural="followers" n={user.followers ?? 0} />
                    </span>
                  </span>
                  <span className="text-neutral-300">
                    <span className="font-semibold"><Num>{user.following ?? 0}</Num></span>{" "}
                    <span className="text-neutral-500">following</span>
                  </span>
                </div>
                <button className="mt-4 px-4 py-1.5 bg-neutral-100 text-neutral-900 text-sm font-medium rounded-md hover:bg-neutral-200 transition-colors cursor-default">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </T>

        <T>
          <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
            Posts (<Num>{userPosts.length}</Num>)
          </h2>
        </T>

        <div className="space-y-4">
          {userPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              translatedText={t(postTextMap[post.id] ?? post.text)}
            />
          ))}
        </div>

        {userPosts.length === 0 && (
          <T>
            <div className="text-center py-12 text-neutral-600 text-sm">
              No posts yet.
            </div>
          </T>
        )}
      </main>
    </div>
  );
}
