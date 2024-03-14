import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import { Separator } from "@/components/ui/separator";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { HotelType } from "../../../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
};
interface Props {
  isLoading: boolean;
  onSave: (props: FormData) => void;
  hotel?: HotelType;
}
const ManageHotelForm = ({ isLoading, onSave, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();

  const { handleSubmit, reset } = formMethods;
  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const {
      name,
      city,
      country,
      imageFiles,
      description,
      type,
      adultCount,
      childCount,
      facilities,
      pricePerNight,
      starRating,
      imageUrls,
    } = formDataJson;
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", name);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("adultCount", adultCount.toString());
    formData.append("childCount", childCount.toString());

    formData.append("pricePerNight", pricePerNight.toString());
    formData.append("starRating", starRating.toString());

    facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    // Append files to the FormData object

    if (imageUrls) {
      imageUrls.forEach((url, i) => {
        formData.append(`imageUrls[${i}]`, url);
      });
    }
    Array.from(imageFiles).forEach((image) => {
      formData.append(`imageFiles`, image);
    });
    onSave(formData);
  });
  useEffect(() => {
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={onSubmit}
        className="max-w-3xl flex flex-col gap-[60px] mx-auto p-8 border rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <TypeSection />
        <Separator />
        <FacilitiesSection />
        <Separator />
        <GuestSection />
        <Separator />
        <ImagesSection />
        <Separator />
        <span className="flex justify-end">
          <Button disabled={isLoading} type="submit">
            {" "}
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
