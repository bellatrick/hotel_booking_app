import { useSearchContext } from "@/contexts/SearchContext";
import { FormEvent, useState } from "react";
import { MdChildCare, MdPerson, MdTravelExplore } from "react-icons/md";
import { Input } from "../ui/input";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState(search.destination||'');
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search.saveSearchValues({
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
    });
    navigate("/search");
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="-mt-8 p-3 bg-white/80 dark:bg-black/90 rounded-md shadow-md grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 items-center gap-4"
      >
        <div className="flex border dark:border-white/30 border-gray-300 flex-row items-center focus:border-primary flex-1 px-2 rounded-md">
          <MdTravelExplore size={25} className="mr-2" />
          <Input
            placeholder="where are you going"
            className="w-full focus-visible:outline-none focus-visible:ring-0 focus:border-none  focus:outline-none border-none"
            value={destination||''}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="flex border dark:border-white/30 border-gray-300 flex-row items-center focus:border-primary flex-1 px-2 rounded-md">
          <label className="flex items-center">Adult:</label>
          <MdPerson size={20} className="mr-2" />
          <Input
            placeholder="where are you going"
            className="w-full focus-visible:outline-none focus-visible:ring-0 focus:border-none  focus:outline-none border-none"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </div>

        <div className="flex border dark:border-white/30 border-gray-300 flex-row items-center focus:border-primary flex-1 px-2 rounded-md">
          <label className="flex items-center">Children:</label>
          <MdChildCare size={25} className="mr-2" />
          <Input
            placeholder="where are you going"
            className="w-full focus-visible:outline-none focus-visible:ring-0 focus:border-none  focus:outline-none border-none"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:col-span-2">
          <div>
            <DatePicker
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full p-2 focus:outline-none bg-transparent border border-gray-300 dark:border-white/20 rounded-md"
              selected={checkIn}
              onChange={(date) => setCheckIn(date as Date)}
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full p-2 focus:outline-none bg-transparent border border-gray-300 dark:border-white/20  rounded-md"
              selected={checkOut}
              onChange={(date) => setCheckOut(date as Date)}
              wrapperClassName="min-w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 w-2/3">
            <Button className="w-full">Search</Button>
          </div>
          <div className="flex gap-2 w-1/3">
            <Button className="w-full" variant={"outline"}>
              Clear
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
