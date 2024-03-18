import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfo from "@/components/app_components/GuestInfo";
import LoadingSpinner from "@/components/app_components/LoadingSpinner";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel,isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!hotel) {
    return <div>No hotel found</div>;
  }
  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel?.starRating || 0 }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}{" "}
          {+hotel?.starRating < 5 &&
            Array.from({ length: 5 - hotel?.starRating || 0 }).map(() => (
              <AiFillStar className="fill-gray-300" />
            ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={hotel.name}
              className="rounded-lg w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div className="border rounded-sm p-3">{facility}</div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr] gap-3">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfo hotelId={hotel._id} pricePerNight={hotel.pricePerNight} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
