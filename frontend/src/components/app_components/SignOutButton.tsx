import { useMutation, useQueryClient } from "react-query";
import { Button } from "../ui/button";
import * as apiClient from "../../api-client";
import { useAppContext } from "@/contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ type: "success", message: "Logout success" });
    },
    onError: (err: Error) => {
      showToast({ type: "error", message: err.message });
    },
  });
  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <Button onClick={handleLogout} variant={"outline"}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
