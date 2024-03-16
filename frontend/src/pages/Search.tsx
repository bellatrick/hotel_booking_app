import { useSearchContext } from "@/contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { HotelSearchResponse } from "../../../backend/src/shared/types";
import SearchResultsCard from "@/components/app_components/SearchResultsCard";
import Pagination from "@/components/app_components/Pagination";
import StarRatingFilter from "@/components/app_components/StarRatingFilter";
import HotelTypesFilter from "@/components/app_components/HotelTypesFilter";
import FacilitiesFilter from "@/components/app_components/FacilitiesFilter";
import PriceFilter from "@/components/app_components/PriceFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Search = () => {
  const search = useSearchContext();
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setselectedPrice] = useState<string | undefined>();
  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = e.target.value;
    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = e.target.value;
    setSelectedTypes((prevTypes) =>
      e.target.checked
        ? [...prevTypes, hotelType]
        : prevTypes.filter((prev) => prev !== hotelType)
    );
  };
  const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const facility = e.target.value;
    setSelectedFacilities((prevTypes) =>
      e.target.checked
        ? [...prevTypes, facility]
        : prevTypes.filter((prev) => prev !== facility)
    );
  };
  const { destination, checkIn, checkOut, adultCount, childCount } = search;
  const searchParams = {
    destination,
    checkIn: checkIn.toISOString(),
    checkOut: checkOut.toISOString(),
    adultCount: adultCount.toString(),
    childCount: childCount.toString(),
    page,
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice,
    sortOption,
  };
  const {
    data: hotelData,
    isLoading,
  }: UseQueryResult<HotelSearchResponse, unknown> = useQuery(
    ["searchHotels", searchParams],
    () => {
      return apiClient.searchHotels(searchParams);
    }
  );

  //   if (!hotelData) {
  //     return <div>No hotels found</div>;
  //   }
  console.log(hotelData, isLoading);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>

          <StarRatingFilter
            onChange={handleStarsChange}
            selectedStars={selectedStars}
          />
          <HotelTypesFilter
            onChange={handleHotelTypeChange}
            selectedHotelTypes={selectedTypes}
          />
          <FacilitiesFilter
            onChange={handleFacilitiesChange}
            selectedFacilities={selectedFacilities}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: string) => setselectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex-1">
          {" "}
          <div className="flex justify-between items-center mb-4 ">
            <div className="w-[70%]">
              {" "}
              <span className="text-xl font-bold ">
                {(hotelData as HotelSearchResponse)?.pagination.total || 0}{" "}
                Hotel(s) found
                {search.destination ? `in ${search.destination}` : ""}
              </span>
            </div>

            <div className="w-[30%]">
              {" "}
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="starRating">Star Rating</SelectItem>
                    <SelectItem value="pricePerNightAsc">
                      Price per night(low to high)
                    </SelectItem>{" "}
                    <SelectItem value="pricePerNightDesc">
                      Price per night(high to low)
                    </SelectItem>{" "}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {hotelData?.data.map((hotel) => (
            <SearchResultsCard hotel={hotel} />
          ))}
        </div>
        <div className="">
          <Pagination
            pages={hotelData?.pagination.pages || 1}
            page={hotelData?.pagination.page || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
