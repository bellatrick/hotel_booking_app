import { toast } from "@/components/ui/use-toast";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import * as apiClient from "../api-client";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;

type ToastMessage = {
  message: string;
  type: "success" | "error";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};
const stripePromise = loadStripe(STRIPE_PUB_KEY);
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
      value={{ showToast: handleToast, isLoggedIn: !isError, stripePromise }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
