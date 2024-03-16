import { hotelFacilites } from "@/config/hotel-options-config";

type Props = {
    selectedFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Facilities</h4>
        {hotelFacilites.map((facility, i) => (
          <label key={i} className="flex items-center space-x-2">
            <input
              value={facility}
              className="rounded border-2 border-primary accent-primary"
              type="checkbox"
              checked={selectedFacilities.includes(facility)}
              onChange={onChange}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    );
  };

  export default FacilitiesFilter;
