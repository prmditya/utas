"use client";
import InputPost from "@/features/home/components/input-post";
import CardPost from "@/features/home/components/card-post";
import { useGetPosts } from "@/features/home/hooks/use-post";
import { Separator } from "@/components/ui/separator";

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

type Post = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    username: string;
  };
};

export default function HomePage() {
  const { data: posts } = useGetPosts();

  return (
    <main className="flex flex-col h-screen items-center">
      {/* Posts Section */}
      {posts?.map((post: Post) => (
        <section key={post.id} className="w-full md:w-[600px] border-x">
          <CardPost
            username={post.author.username}
            content={post.content}
            date={dateFormatter(post.createdAt)}
          />
          <Separator />
        </section>
      ))}

      <div className="h-[140px] w-full md:w-[600px]" />

      {/* Gradient*/}
      <div
        className="
          fixed bottom-0 w-full h-40 
          bg-gradient-to-t from-background to-transparent 
          z-10 // Sedikit lebih rendah dari InputPost
        "
      >
        {/* Height*/}
        <div className="max-w-[600px] h-full mx-auto border-x" />
      </div>

      <InputPost />
    </main>
  );
}
