import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/admin/Sidebar";
import { useAppContext } from "../../../context/AppContext";


function Layout() {
  const navigate = useNavigate();
  const { setToken } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between font-bold mt-3 text-xl sm:text-2xl lg:text-3xl px-5 sm:px-10 lg:px-20 pb-4">
          <a href="/">Quickblog</a>

          <button
            onClick={logout}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full text-xs sm:text-sm font-medium cursor-pointer mt-3 whitespace-nowrap transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
