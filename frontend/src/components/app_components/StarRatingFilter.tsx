type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-primary pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "2"].map((rating, i) => (
        <label key={i} className="flex items-center space-x-2">
          <input
            value={rating}
            className="rounded border-2 border-primary accent-primary"
            type="checkbox"
            checked={selectedStars.includes(rating)}
            onChange={onChange}
          />
          <span>{rating}</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
