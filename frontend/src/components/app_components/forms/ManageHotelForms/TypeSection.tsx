import { hotelTypes } from "@/config/hotel-options-config";
import { cn } from "@/lib/utils";

import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Type</h1>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type, i) => (
          <label
            key={i}
            className={cn(
              typeWatch === type ? "bg-pink-400" : "bg-gray-300 ",
              "cursor-pointer  text-[13px] rounded-full text-gray-800 px-4 py-2 font-semibold"
            )}
          >
            <input
              className="hidden"
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
            />
            <span> {type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
