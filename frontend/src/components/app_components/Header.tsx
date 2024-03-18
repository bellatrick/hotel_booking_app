import { useAppContext } from "@/contexts/AppContext";
import { ModeToggle } from "../ui/mode-toggle";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-primary   py-6">
      <div className="container px-8 lg:px-1 mx-auto flex justify-between">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to="/">BookHub.com</Link>
        </span>
        <span className="space-x-4 font-semibold flex items-center">
          {isLoggedIn ? (
            <>
              <Link
                className="hover:underline hover:text-pink-200 text-white"
                to="/my-bookings"
              >
                My bookings
              </Link>
              <Link
                className="hover:underline hover:text-pink-200 text-white"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              className="flex items-center text-primary px-3 bg-white font-bold hover:bg-primary-foreground rounded-sm"
              to={"/signin"}
            >
              Sign in
            </Link>
          )}
          <ModeToggle />
        </span>
      </div>
    </div>
  );
};

export default Header;
