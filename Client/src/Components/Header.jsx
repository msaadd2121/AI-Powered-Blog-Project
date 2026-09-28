import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function Header() {

  const {token}=useAppContext()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between font-bold mt-3 text-xl sm:text-2xl lg:text-3xl px-5 sm:px-10 lg:px-20">
        <a href="/">Quickblog</a>

        <Link to="/admin">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium cursor-pointer mt-3 whitespace-nowrap transition-colors duration-200">
            {token ? "Dashboard": "Admin Login"} 
            <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
