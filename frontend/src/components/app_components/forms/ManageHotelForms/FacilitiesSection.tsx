import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilites } from "@/config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Facilities</h1>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilites.map((facility,i) => (
          <label key={i} className="capitalize text-sm ">
            <input
              {...register("facilities", {
                validate: (facilties) => {
                  if (facilties && facilties.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
              value={facility}
              className="border-2 border-primary accent-primary "
              type="checkbox"
            />
            <span className="ml-2">{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <p className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </p>
      )}
    </div>
  );
};

export default FacilitiesSection;
