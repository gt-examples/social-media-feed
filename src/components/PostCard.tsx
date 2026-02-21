import { T, Var, Num, DateTime, Plural, Branch } from "gt-next";
import Link from "next/link";
import type { Post } from "@/data/posts";

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

function PostStats({
  post,
  linkToDetail,
}: {
  post: Post;
  linkToDetail: boolean;
}) {
  if (linkToDetail) {
    return (
      <T>
        <div className="mt-3 flex items-center gap-6 text-sm text-neutral-500">
          <Link href={`/post/${post.id}`} className="hover:text-neutral-300 transition-colors">
            <Num>{post.likes}</Num>{" "}
            <Plural singular="like" plural="likes" n={post.likes} />
          </Link>
          <Link href={`/post/${post.id}`} className="hover:text-neutral-300 transition-colors">
            <Num>{post.comments}</Num>{" "}
            <Plural singular="comment" plural="comments" n={post.comments} />
          </Link>
          <span>
            <Num>{post.shares}</Num>{" "}
            <Plural singular="share" plural="shares" n={post.shares} />
          </span>
        </div>
      </T>
    );
  }
  return (
    <T>
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
    </T>
  );
}

function PostBody({
  post,
  translatedText,
  linkToDetail,
}: {
  post: Post;
  translatedText: string;
  linkToDetail: boolean;
}) {
  if (linkToDetail) {
    return (
      <Link href={`/post/${post.id}`} className="block">
        <p className="mt-2 text-neutral-300 leading-relaxed hover:text-neutral-100 transition-colors">
          {translatedText}
        </p>
      </Link>
    );
  }
  return (
    <p className="mt-2 text-neutral-300 leading-relaxed">
      {translatedText}
    </p>
  );
}

export default function PostCard({
  post,
  translatedText,
  linkToDetail = true,
}: {
  post: Post;
  translatedText: string;
  linkToDetail?: boolean;
}) {
  const handleSlug = post.handle.replace("@", "");

  return (
    <article className="border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 transition-colors">
      <div className="flex items-start gap-3">
        <Link
          href={`/user/${handleSlug}`}
          className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex-shrink-0 flex items-center justify-center text-sm font-medium text-neutral-400 hover:border-neutral-500 transition-colors"
        >
          {post.avatar}
        </Link>
        <div className="flex-1 min-w-0">
          <T>
            <div className="flex items-center gap-2 flex-wrap">
              <Link href={`/user/${handleSlug}`} className="font-semibold text-neutral-100 hover:underline">
                <Var>{post.author}</Var>
              </Link>
              <span className="text-neutral-500 text-sm"><Var>{post.handle}</Var></span>
              <span className="text-neutral-600 text-sm">·</span>
              <span className="text-neutral-500 text-sm">
                <DateTime>{post.timestamp}</DateTime>
              </span>
              <PostTypeBadge type={post.type} />
            </div>
          </T>
          <PostBody post={post} translatedText={translatedText} linkToDetail={linkToDetail} />
          <PostStats post={post} linkToDetail={linkToDetail} />
        </div>
      </div>
    </article>
  );
}
