import { useSession } from "next-auth/react";
import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetPosts() {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await api.get("/api/post");
      return response.data;
    },
    enabled: !!session?.user?.id,
  });
}

export function useCreatePost() {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: async (data: { content: string }) => {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }
      const response = await api.post("/api/post", {
        content: data.content,
        authorId: session.user.id,
      });
      return response.data;
    },
  });
}
