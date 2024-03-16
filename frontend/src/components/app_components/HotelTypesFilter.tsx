import { hotelTypes } from "@/config/hotel-options-config";

type Props = {
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Hotel Types</h4>
        {hotelTypes.map((hotelType, i) => (
          <label key={i} className="flex items-center space-x-2">
            <input
              value={hotelType}
              className="rounded border-2 border-primary accent-primary"
              type="checkbox"
              checked={selectedHotelTypes.includes(hotelType)}
              onChange={onChange}
            />
            <span>{hotelType}</span>
          </label>
        ))}
      </div>
    );
  };

  export default HotelTypesFilter;
