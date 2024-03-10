import { toast } from "@/components/ui/use-toast";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type ToastMessage = {
  message: string;
  type: "success" | "error";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const handleToast = (toastDetails: ToastMessage) => {
    toast({
      title: toastDetails.type,
      description: toastDetails.message,
      variant:
        toastDetails.type === "success" ? toastDetails.type : "destructive",
    });
  };
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{ showToast: handleToast, isLoggedIn: !isError }}
>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
