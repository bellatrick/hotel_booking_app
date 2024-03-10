import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/ui/password";
import * as apiClient from "../api-client";
import { FaSpinner } from "react-icons/fa";
import { useAppContext } from "@/contexts/AppContext";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginToFormSchemaType = z.infer<typeof formSchema>;

const Signin = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signin, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        message: "You have successfully logged in",
        type: "success",
      });
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({
        message: err.message,
        type: "error",
      });
    },
  });

  const form = useForm<LoginToFormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: LoginToFormSchemaType) {
    try {
      mutation.mutate(values);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          className="flex border border-gray-600 p-8 rounded-md flex-col gap-3 max-w-3xl mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl text-center font-bold mb-3">
            Sign in to your account
          </h2>
          <Separator className="mb-4" />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Johndoe@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            {mutation.isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <span>Sign in</span>
            )}
          </Button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link className="underline hover:text-primary" to={"/register"}>
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Signin;
