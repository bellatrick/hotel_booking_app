import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DetailsSection = () => {
  const {
    register,
    formState: { errors, defaultValues },
    setValue,
    watch,
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-3"> Add Hotel</h1>
      <div className="w-[50%]">
        <FormLabel>Name</FormLabel>
        <Input {...register("name", { required: "This field is required" })} />
        {errors.name && (
          <span className="text-red-600 text-sm ">{errors.name.message}</span>
        )}
      </div>
      <div className="flex gap-4 justify-between">
        <div className="w-full">
          <FormLabel>City</FormLabel>
          <Input
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-600 text-sm ">{errors.city.message}</span>
          )}
        </div>{" "}
        <div className="w-full">
          <FormLabel>Country</FormLabel>
          <Input
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-600 text-sm ">
              {errors.country.message}
            </span>
          )}
        </div>
      </div>
      <div>
        <FormLabel>Description</FormLabel>
        <Textarea
          rows={10}
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-600 text-sm ">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="w-[50%]">
        <FormLabel>Price per Night</FormLabel>
        <Input
          type="number"
          min={1}
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-600 text-sm ">
            {errors.pricePerNight.message}
          </span>
        )}
      </div>
      <div className="w-[50%]">
        <FormLabel>Star Rating</FormLabel>
        <Select
          defaultValue={defaultValues?.starRating?.toString()}
          onValueChange={(value) => setValue("starRating", +value)}
          {...register("starRating", { required: "This field is required" })}
          value={watch("starRating") ? watch("starRating").toString() : ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a rating" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {" "}
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num.toString()} value={num.toString()}>
                  {num.toString()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.starRating && (
          <span className="text-red-600 text-sm ">
            {errors.starRating.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default DetailsSection;
