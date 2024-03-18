import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";
import LoadingSpinner from "@/components/app_components/LoadingSpinner";
const MyHotel = () => {
  const { data: HotelData, isLoading } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );
  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }
  return (
    <div className="space-y-5 w-full sm:w-[80%] mx-auto">
      <span className="flex justify-between">
        <h1 className="text-2xl font-bold">My hotels</h1>
        <Button>
          {" "}
          <Link to={"/add-hotel"}>Add Hotel</Link>
        </Button>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {HotelData?.map((hotel, i) => (
          <div
            className="flex flex-col justify-between border h-fit rounded-lg gap-4"
            key={i}
          >
            <img
              className="h-[400px] object-cover w-full"
              src={hotel.imageUrls[0]}
              alt=""
            />
            <div className="px-8 pb-10 flex flex-col gap-4">
              <h2 className="text-xl font-bold">{hotel.name}</h2>
              <p className="whitespace-pre-line">
                {hotel.description.substring(0, 100)}...
              </p>
              <div className="grid grid-cols-5 gap-2">
                <div className="flex p-3 text-[15px] items-center rounded-sm border">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="flex p-3 text-[15px] items-center rounded-sm border">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="flex p-3 text-[15px] items-center rounded-sm border">
                  <BiMoney className="mr-1" />${hotel.pricePerNight}
                </div>
                <div className="flex p-3 text-[15px] items-center rounded-sm border">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} chilren
                </div>
                <div className="flex p-3 text-[15px] items-center rounded-sm border">
                  <BiStar className="mr-1" />
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Link to={`/edit-hotel/${hotel._id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotel;
