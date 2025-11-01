import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useCreatePost } from "@/features/home/hooks/use-post";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const inputPostSchema = z.object({
  content: z.string().min(1, "Too short"),
});

export default function InputPost() {
  const { mutate: createPost, isPending } = useCreatePost();

  const form = useForm<z.infer<typeof inputPostSchema>>({
    resolver: zodResolver(inputPostSchema),
    defaultValues: {
      content: "",
    },
  });

  const postContent = (data: z.infer<typeof inputPostSchema>) => {
    createPost(data, {
      onSuccess: () => {
        toast.success("Successfully Upload Post!!", {
          description: new Date().toLocaleTimeString(),
        });
        form.reset();
      },
      onError: (error) => {
        const errorMessage =
          error.message || "Failed to Post, Try Again Later!!";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="sticky bottom-0 pb-2 md:pb-4 z-50 w-full px-1">
      <form
        className="flex items-center w-full md:w-xl lg:w-2xl mx-auto "
        onSubmit={form.handleSubmit(postContent)}
      >
        <Controller
          name="content"
          control={form.control}
          render={({ field, formState }) => (
            <div className="flex flex-col w-screen resize-none p-2 md:p-4 backdrop-blur-md bg-slate-900/10 rounded-xl border mx-auto ">
              <Textarea
                placeholder="What's on your mind?"
                disabled={isPending}
                className="resize-none border-0 bg-transparent! focus-visible:ring-0 focus-visible:ring-offset-0 "
                {...field}
              />
              <Button
                type="submit"
                size="icon"
                className="ml-auto size-9"
                disabled={isPending || !formState.isDirty || !formState.isValid}
              >
                {isPending ? <Spinner fontSize={24} /> : <Send size={24} />}
              </Button>
            </div>
          )}
        />
      </form>
    </div>
  );
}
