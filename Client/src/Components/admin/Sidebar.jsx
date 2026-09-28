import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  List,
  MessageSquare,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-16 sm:w-60 min-h-screen border-r border-gray-200 p-2 sm:p-5">
      <div className="flex flex-col gap-2">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 sm:px-4 py-3 rounded-md ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600"
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          <span className="hidden sm:block">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/addBlog"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 sm:px-4 py-3 rounded-md ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600"
            }`
          }
        >
          <PlusSquare className="w-5 h-5 shrink-0" />
          <span className="hidden sm:block">Add Blog</span>
        </NavLink>

        <NavLink
          to="/admin/listBlog"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 sm:px-4 py-3 rounded-md ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600"
            }`
          }
        >
          <List className="w-5 h-5 shrink-0" />
          <span className="hidden sm:block">List Blog</span>
        </NavLink>

        <NavLink
          to="/admin/comments"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 sm:px-4 py-3 rounded-md ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600"
            }`
          }
        >
          <MessageSquare className="w-5 h-5 shrink-0" />
          <span className="hidden sm:block">Comments</span>
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;