import ManageHotelForm from "@/components/app_components/forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "@/contexts/AppContext";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel saved!", type: "success" });
    },
    onError: () => {
      showToast({ message: "Error saving hotel", type: "error" });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;
