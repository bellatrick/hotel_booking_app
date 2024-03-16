
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from "../ui/select";

type Props = {
  selectedPrice?: string;
  onChange: (value?: string) => void;
};
const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-md font-semibold mb-2">Max Price:</div>
      <Select
        value={selectedPrice}
        onValueChange={(value) => onChange(value ? value : undefined)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Hotel Price Per Night" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {" "}
            {[50, 100, 200, 300, 500, 1000, 1500].map((price, i) => (
              <SelectItem key={i} value={price.toString()}>
                {price}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PriceFilter;
