import { T, Var, Num, Plural } from "gt-next";
import { getGT } from "gt-next/server";
import Link from "next/link";
import Header from "@/components/Header";
import { trendingTopics, suggestedUsers, posts } from "@/data/posts";
import PostCard from "@/components/PostCard";

const postTextMap: Record<number, string> = {
  1: "Just shipped a new feature for our internationalization pipeline. The translation quality has been incredible across all supported languages.",
  2: "Check out this architecture diagram for our new multilingual content delivery system.",
  3: "Recorded a walkthrough of the new locale switching feature. Seamless transitions between 5 languages.",
  4: "Great article on the future of real-time translation in web applications.",
  5: "Our team just crossed 1,000,000 translated strings this quarter. The automation tools have been a game changer for our workflow.",
};

const suggestedBioMap: Record<string, string> = {
  "@priyasharma": "Localization engineer at a global e-commerce company.",
  "@jlmartin": "French-Canadian developer passionate about accessible i18n.",
  "@aishabello": "Open source contributor focused on African language support.",
};

export default async function Explore() {
  const t = await getGT();

  // Show top 3 most-liked posts as "popular"
  const popularPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <T>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-neutral-100 mb-1">Explore</h1>
            <p className="text-neutral-500 text-sm">
              Discover trending topics, popular posts, and people to follow.
            </p>
          </div>
        </T>

        {/* Search bar (decorative) */}
        <T>
          <div className="mb-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-neutral-600">
              Search posts, people, and topics...
            </div>
          </div>
        </T>

        {/* Trending Topics */}
        <T>
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Trending Topics
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {trendingTopics.map((topic) => (
                <div
                  key={topic.tag}
                  className="border border-neutral-800 rounded-lg p-3 hover:border-neutral-700 transition-colors"
                >
                  <p className="text-neutral-200 font-medium text-sm">
                    #<Var>{topic.tag}</Var>
                  </p>
                  <p className="text-neutral-500 text-xs mt-1">
                    <Num>{topic.postCount}</Num>{" "}
                    <Plural singular="post" plural="posts" n={topic.postCount} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        </T>

        {/* Suggested People */}
        <T>
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Who to Follow
            </h2>
            <div className="space-y-3">
              {suggestedUsers.map((user) => {
                const handleSlug = user.handle.replace("@", "");
                return (
                  <div
                    key={user.handle}
                    className="border border-neutral-800 rounded-lg p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-sm font-medium text-neutral-400">
                      <Var>{user.avatar}</Var>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-neutral-100 text-sm">
                        <Var>{user.author}</Var>
                      </p>
                      <p className="text-neutral-500 text-xs"><Var>{user.handle}</Var></p>
                      <p className="text-neutral-400 text-xs mt-0.5">
                        <Var>{t(suggestedBioMap[user.handle] ?? user.bio ?? "")}</Var>
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-neutral-100 text-neutral-900 text-xs font-medium rounded-md hover:bg-neutral-200 transition-colors cursor-default flex-shrink-0">
                      Follow
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </T>

        {/* Popular Posts */}
        <T>
          <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
            Popular Posts
          </h2>
        </T>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              translatedText={t(postTextMap[post.id] ?? post.text)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
