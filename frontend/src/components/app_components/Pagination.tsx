import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ onPageChange, page, pages }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center">
      <ul className="flex border-slate-300">
        {pageNumbers.map((number, i) => (
          <li
            key={i}
            className={cn("px-2 py-1", page === number ? "bg-gray-200" : "")}
          >
            <Button onClick={() => onPageChange(number)} variant={"outline"}>
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
