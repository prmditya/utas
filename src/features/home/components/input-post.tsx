import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useCreatePost } from "@/features/home/hooks/use-post";

export default function InputPost() {
  const { mutate: createPost } = useCreatePost();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("content")?.toString().trim();
    createPost({ content });
  };

  return (
    <div className="sticky bottom-0 p-4">
      <form className="relative max-w-3xl mx-auto" onSubmit={handleSubmit}>
        <Textarea
          className="h-[90px] w-full resize-none p-4 pr-12 backdrop-blur-md"
          placeholder="What's on your mind?"
          name="content"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 bottom-3 h-8 w-8"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
