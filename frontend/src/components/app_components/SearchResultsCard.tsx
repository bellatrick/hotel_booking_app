import { HotelType } from "../../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
type Props = {
  hotel: HotelType;
};
const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border dark:border-white/10 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full rounded-lg h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}{" "}
              {+hotel.starRating < 5 &&
                Array.from({ length: 5 - hotel.starRating }).map(() => (
                  <AiFillStar className="fill-gray-300" />
                ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
        </div>
        <Link
          to={`/detail/${hotel._id}`}
          className="text-2xl font-bold cursor-pointer"
        >
          {hotel.name}
        </Link>
        <div>
          <div className="line-clamp-4">{hotel.description}</div>
          <div className="grid grid-cols-2 items-end whitespace-nowrap">
            <div className="flex gap-1 items-center">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span className="border p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                  {facility}
                </span>
              ))}
              <span className="text-sm">
                {hotel.facilities.length > 3 &&
                  `+${hotel.facilities.length - 3} more`}
              </span>
            </div>
            <div className="flex mt-4 flex-col items-end gap-1">
              <span className="font-bold">
                ${hotel.pricePerNight} per night
              </span>
              <Link to={`/detail/${hotel._id}`}>
                <Button className="h-full max-w-fit">View More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
