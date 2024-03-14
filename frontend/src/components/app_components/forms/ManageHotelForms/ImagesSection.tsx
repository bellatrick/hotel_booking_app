import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { Input } from "@/components/ui/input";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();
  const existingImageUrl = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrl.filter((url) => url !== imageUrl)
    );
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Images</h1>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrl && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrl.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  className="min-h-full rounded-md object-cover"
                  src={img}
                  alt="hotel"
                />
                <button
                  onClick={(e) => handleDelete(e, img)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <Input
          multiple
          accept="image/*"
          type="file"
          className="w-full bg-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrl?.length || 0);
              if (totalLength === 0) {
                return "At least one image should be added";
              }
              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              } else return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
