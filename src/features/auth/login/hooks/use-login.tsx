import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

interface UserData {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: UserData) => {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.error) throw new Error(response.error);
      return response;
    },
  });
}
