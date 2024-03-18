import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { MdChildCare, MdPerson } from "react-icons/md";
import { Input } from "../ui/input";
import { useSearchContext } from "@/contexts/SearchContext";
import { Button } from "../ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};
const GuestInfo = ({ hotelId, pricePerNight }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const onSigninClick = (data: GuestInfoFormData) => {
    const { checkIn, checkOut, adultCount, childCount } = data;
    search.saveSearchValues({ checkIn, checkOut, adultCount, childCount });
    navigate("/signin", { state: { from: location } });
  };
  const onSubmit = (data: GuestInfoFormData) => {
    const { checkIn, checkOut, adultCount, childCount } = data;
    search.saveSearchValues({ checkIn, checkOut, adultCount, childCount });
    navigate(`/hotel/${hotelId}/booking`);
  };
  return (
    <div className="flex flex-col p-4 bg-primary/30 rounded-lg">
      <h3 className="text-lg mb-4 font-bold">Price: $ {pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSigninClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <label className="text-sm font-semibold">Check in Date</label>
            <ReactDatePicker
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full p-2 focus:outline-none bg-transparent border border-gray-400 dark:border-white/20  rounded-md"
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Check Out Date</label>
            <ReactDatePicker
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full p-2 focus:outline-none bg-transparent border border-gray-400 dark:border-white/20  rounded-md"
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex gap-4">
            {" "}
            <div className="flex border dark:border-white/30 border-gray-400 flex-row items-center focus:border-primary flex-1 px-2 rounded-md">
              <label className="flex items-center">Adult:</label>
              <MdPerson size={20} className="mr-2" />
              <Input
                placeholder="where are you going"
                className="w-full focus-visible:outline-none focus-visible:ring-0 focus:border-none  focus:outline-none border-none"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.adultCount && (
                <span className="text-red-500 font-semibold text-sm">
                  {errors.adultCount.message}
                </span>
              )}
            </div>
            <div className="flex border dark:border-white/30 border-gray-400 flex-row items-center focus:border-primary flex-1 px-2 rounded-md">
              <label className="flex items-center">Child:</label>
              <MdChildCare size={20} className="mr-2" />
              <Input
                placeholder="where are you going"
                className="w-full focus-visible:outline-none focus-visible:ring-0 focus:border-none  focus:outline-none border-none"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
              {errors.childCount && (
                <span className="text-red-500 font-semibold text-sm">
                  {errors.childCount.message}
                </span>
              )}
            </div>
          </div>
          {isLoggedIn ? (
            <Button>Book Now</Button>
          ) : (
            <Button>Sign in to Book</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfo;
