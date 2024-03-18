import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "@/components/app_components/forms/BookingForm/BookingForm";
import { useEffect, useState } from "react";
import { useSearchContext } from "@/contexts/SearchContext";
import { useParams } from "react-router-dom";
import BookingDetailsSummary from "@/components/app_components/BookingDetailSummary";
import { useAppContext } from "@/contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";
import LoadingSpinner from "@/components/app_components/LoadingSpinner";
const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights) < 1 ? 1 : Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);
  const { data: paymentIntentData,isLoading } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );
  const { data: hotel } = useQuery(
    "fetchHotelByID",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const { data: currentUser } = useQuery("getUser", apiClient.fetchCurrentUser);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
      {hotel && (
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel}
        />
      )}
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
