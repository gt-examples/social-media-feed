import { T, Var, Num, DateTime, Plural } from "gt-next";
import { getGT } from "gt-next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { getPostById, comments } from "@/data/posts";

const postTextMap: Record<number, string> = {
  1: "Just shipped a new feature for our internationalization pipeline. The translation quality has been incredible across all supported languages.",
  2: "Check out this architecture diagram for our new multilingual content delivery system.",
  3: "Recorded a walkthrough of the new locale switching feature. Seamless transitions between 5 languages.",
  4: "Great article on the future of real-time translation in web applications.",
  5: "Our team just crossed 1,000,000 translated strings this quarter. The automation tools have been a game changer for our workflow.",
};

const commentTextMap: Record<string, string> = {
  "Congrats on the launch! The pipeline looks solid.": "Congrats on the launch! The pipeline looks solid.",
  "The quality improvements are really noticeable. Great work!": "The quality improvements are really noticeable. Great work!",
  "Love the separation of concerns in this design.": "Love the separation of concerns in this design.",
  "We should adopt this pattern for our next project.": "We should adopt this pattern for our next project.",
  "Would love to write about this architecture. Mind if I reach out?": "Would love to write about this architecture. Mind if I reach out?",
  "Smooth transitions! What framework are you using?": "Smooth transitions! What framework are you using?",
  "Bookmarked. The section on neural machine translation was fascinating.": "Bookmarked. The section on neural machine translation was fascinating.",
  "That's an incredible milestone! What was the biggest scaling challenge?": "That's an incredible milestone! What was the biggest scaling challenge?",
  "A million strings! The automation really pays off at scale.": "A million strings! The automation really pays off at scale.",
  "Inspiring numbers. Our team is working toward the same goal.": "Inspiring numbers. Our team is working toward the same goal.",
  "This deserves a feature article. The growth is remarkable.": "This deserves a feature article. The growth is remarkable.",
};

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  const post = getPostById(postId);
  if (!post) notFound();

  const t = await getGT();
  const translatedText = t(postTextMap[postId] ?? post.text);
  const postComments = comments[postId] ?? [];

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

        <PostCard post={post} translatedText={translatedText} linkToDetail={false} />

        <T>
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Comments (<Num>{postComments.length}</Num>)
            </h2>
          </div>
        </T>

        {postComments.length === 0 ? (
          <T>
            <div className="text-center py-8 text-neutral-600 text-sm">
              No comments yet. Be the first to reply!
            </div>
          </T>
        ) : (
          <div className="space-y-3">
            {postComments.map((comment, i) => {
              const translatedComment = t(commentTextMap[comment.text] ?? comment.text);
              const handleSlug = comment.handle.replace("@", "");
              return (
                <T key={i}>
                  <div className="border border-neutral-800/60 rounded-lg p-4 ml-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Link
                        href={`/user/${handleSlug}`}
                        className="font-medium text-neutral-200 text-sm hover:underline"
                      >
                        <Var>{comment.author}</Var>
                      </Link>
                      <span className="text-neutral-500 text-xs"><Var>{comment.handle}</Var></span>
                      <span className="text-neutral-600 text-xs">·</span>
                      <span className="text-neutral-500 text-xs">
                        <DateTime>{comment.timestamp}</DateTime>
                      </span>
                    </div>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      <Var>{translatedComment}</Var>
                    </p>
                  </div>
                </T>
              );
            })}
          </div>
        )}

        <T>
          <div className="mt-6 border border-neutral-800 rounded-lg p-4">
            <p className="text-sm text-neutral-500 mb-3">Write a reply</p>
            <div className="bg-neutral-900 border border-neutral-800 rounded-md p-3 text-sm text-neutral-600 min-h-[60px]">
              Share your thoughts...
            </div>
            <div className="mt-3 flex justify-end">
              <button className="px-4 py-1.5 bg-neutral-800 text-neutral-300 text-sm rounded-md border border-neutral-700 hover:bg-neutral-700 transition-colors cursor-default">
                Reply
              </button>
            </div>
          </div>
        </T>
      </main>
    </div>
  );
}
