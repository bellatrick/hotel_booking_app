import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSearchContext } from "@/contexts/SearchContext";
import { useMutation } from "react-query";
import * as apiClient from "../../../../api-client";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};
const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const stripe = useStripe();
  const elements = useElements();

  const { showToast } = useAppContext();
  const [showDialogue, setShowDialogue] = useState(false);
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        setShowDialogue(true);
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "error" });
      },
    }
  );
  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 rounded-lg border border-lg p-5"
      >
        <span className="text-3xl  font-bold">Confirm your details</span>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex-1">
            <label>First Name</label>
            <Input type="text" readOnly disabled {...register("firstName")} />
          </div>
          <div className="flex-1">
            <label>Last Name</label>
            <Input type="text" readOnly disabled {...register("lastName")} />
          </div>
          <div className="flex-1">
            <label>Email</label>
            <Input type="text" readOnly disabled {...register("email")} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your Price Summary</h2>

          <div className="bg-primary/30 p-4 rounded-md">
            <div className="font-semibold text-lg">
              Total Cost: ${paymentIntent.totalCost.toFixed(2)}
            </div>
            <div className="text-xs">Includes taxes and charges</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold"> Payment Details</h3>
          <CardElement
            id="payment-element"
            className="border bg-green-900 rounded-md p-2 text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </div>
      </form>

      <AlertDialog open={showDialogue}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You have successfully created a booking! An Email will be sent to
              you with details of your booking and a receipt.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialogue(false)}>
              Close
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/")}>
              Go back Home
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingForm;
