import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "@/components/app_components/forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "@/contexts/AppContext";
const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({
        type: "success",
        message: "You have successfully updated your hotel",
      });
    },
    onError: () => {
      showToast({
        type: "error",
        message: "Something went wrong",
      });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  return (
    <div>
      <ManageHotelForm
        hotel={hotel}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditHotel;
