import { HotelFormData } from "./ManageHotelForm";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Hotels</h1>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-900/20">
        <div>
          {" "}
          <FormLabel>Adults</FormLabel>
          <Input
            type="number"
            min={1}
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="text-sm font-bold text-red-500">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        <div>
          {" "}
          <FormLabel>Children</FormLabel>
          <Input
            type="number"
            min={0}
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="text-sm font-bold text-red-500">
              {errors.childCount.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestSection;
