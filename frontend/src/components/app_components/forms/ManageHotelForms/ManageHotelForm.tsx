import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import { Separator } from "@/components/ui/separator";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";

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
  starRating: string;
  imageFiles: FileList;
};
interface Props {
  isLoading: boolean;
  onSave: (props: FormData) => void;
}
const ManageHotelForm = ({ isLoading, onSave }: Props) => {
  const formMethods = useForm<HotelFormData>();

  const { handleSubmit } = formMethods;
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
    } = formDataJson;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("adultCount", adultCount.toString());
    formData.append("childCount", childCount.toString());

    formData.append("pricePerNight", pricePerNight.toString());
    formData.append("starRating", starRating);

    facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    // Append files to the FormData object
    Array.from(imageFiles).forEach((image) => {
      formData.append(`imageFiles`, image);
    });
    onSave(formData);
  });
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
