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
  content: z.string().min(5, "Too short"),
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

  const isSubmitting = form.formState.isSubmitting || isPending;

  return (
    <div className="sticky bottom-0 p-4 z-50">
      <form
        className="relative w-full md:w-xl lg:w-2xl mx-auto"
        onSubmit={form.handleSubmit(postContent)}
      >
        <Controller
          name="content"
          control={form.control}
          render={({ field, formState }) => (
            <>
              <Textarea
                className="h-[100px] w-[98%] resize-none p-4 pr-12 backdrop-blur-md"
                placeholder="What's on your mind?"
                disabled={isSubmitting}
                {...field}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 bottom-2 size-9 z-10"
                disabled={
                  isSubmitting || !formState.isDirty || !formState.isValid
                }
              >
                {isSubmitting ? <Spinner fontSize={24} /> : <Send size={24} />}
              </Button>
            </>
          )}
        />
      </form>
    </div>
  );
}
