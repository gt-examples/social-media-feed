import { T, Num, Plural } from "gt-next";
import { getGT } from "gt-next/server";
import Header from "@/components/Header";
import Disclaimer from "@/components/Disclaimer";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";

export default async function Home() {
  const gt = await getGT();
  const postTexts: Record<number, string> = {
    1: gt("Just shipped a new feature for our internationalization pipeline. The translation quality has been incredible across all supported languages."),
    2: gt("Check out this architecture diagram for our new multilingual content delivery system."),
    3: gt("Recorded a walkthrough of the new locale switching feature. Seamless transitions between 5 languages."),
    4: gt("Great article on the future of real-time translation in web applications."),
    5: gt("Our team just crossed 1,000,000 translated strings this quarter. The automation tools have been a game changer for our workflow."),
  };
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Disclaimer />
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} translatedText={postTexts[post.id]} />
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
