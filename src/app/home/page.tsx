"use client";
import InputPost from "@/features/home/components/input-post";
import CardPost from "@/features/home/components/card-post";
import { useGetPosts } from "@/features/home/hooks/use-post";

function dateFormatter(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    hour12: false,
  });
}

export default function HomePage() {
  const { data: posts, isLoading } = useGetPosts();

  return (
    <main className="flex flex-col h-screen w-[90%] md:w-[70%] mx-auto ">
      <div className="p-0 md:p-6 space-y-4">
        <h1 className="text-3xl font-bold mt-2">Latest Post</h1>

        {/* Example posts or messages */}
        {posts?.map((post) => (
          <CardPost
            key={post.id}
            username={post.author.username}
            content={post.content}
            date={dateFormatter(post.createdAt)}
          />
        ))}
      </div>
      <InputPost />
    </main>
  );
}
