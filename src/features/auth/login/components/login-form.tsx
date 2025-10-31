"use client";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/features/auth/login/hooks/use-login";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { field } from "@/features/auth/types/field.type";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

const FIELDS: field[] = [
  {
    fieldLabel: "Email",
    fieldName: "email",
    fieldPlaceHolder: "name@example.com",
    fieldType: "email",
  },
  {
    fieldLabel: "Pasword",
    fieldName: "password",
    fieldType: "password",
  },
];

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser = (data: z.infer<typeof loginSchema>) => {
    login(data, {
      onSuccess: () => {
        toast.success("Login Successful Redirecting to /home ...");
        router.push("/home");
      },
      onError: (error) => {
        const errorMessage = error.message || "Error can't login now";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(loginUser)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Image
                  src="/assets/logo.webp"
                  alt="Utas Logo"
                  width={48}
                  height={48}
                />
              </div>
              <span className="sr-only">Utas.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Utas.</h1>
            <FieldDescription>
              Don&apos;t have an account? <a href="/register">Sign up</a>
            </FieldDescription>
          </div>

          {FIELDS.map((FIELD) => (
            <Field key={FIELD.fieldName}>
              <Controller
                name={FIELD.fieldName as keyof z.infer<typeof loginSchema>}
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <FieldLabel>
                      {FIELD.fieldLabel}
                      <span className="text-red-500 ml-[-5px]">*</span>
                    </FieldLabel>
                    <Input
                      type={FIELD.fieldType}
                      placeholder={FIELD.fieldPlaceHolder}
                      autoComplete="false"
                      required
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </>
                )}
              />
            </Field>
          ))}
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
