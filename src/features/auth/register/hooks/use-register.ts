import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: UserData) => {
      const response = await api.post("/auth/register", data);
      return response.data;
    },
    onSuccess: async (data) => {
      return data;
    },
  });
}
