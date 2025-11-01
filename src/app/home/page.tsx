"use client";
import InputPost from "@/features/home/components/input-post";
import CardPost from "@/features/home/components/card-post";
import { useGetPosts } from "@/features/home/hooks/use-post";
import { Separator } from "@/components/ui/separator";
import LoadingPage from "@/components/loading-page";

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
  const { data: posts, isLoading } = useGetPosts();

  if (isLoading) return <LoadingPage iconSize="LARGE" />;

  return (
    <main className="flex flex-col h-100vh items-center pt-14">
      {/* Posts Section */}

      {posts?.map((post: Post) => (
        <section key={post.id} className="w-full md:w-[600px] sm:border-x">
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
          fixed bottom-0 w-full h-50 
          bg-linear-to-t from-background to-transparent 
          z-10
        "
      >
        <div className="max-w-screen h-full mx-auto" />
      </div>

      <InputPost />
    </main>
  );
}
