import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import BlogTableItem from "../../Components/admin/BlogTableItem";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

function ListBlog() {
  const [blogs, setBlogs] = useState([]);

  const { axios } = useAppContext();

  const fetchblogs = async () => {
    try {
      const { data } = await axios.get("/api/blogs");

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchblogs();
  }, []);

  return (
    <div className="flex-1 min-h-screen bg-blue-50/50 p-3 sm:p-5 md:p-8 overflow-x-hidden">
      {/* Heading */}
      <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-5 mb-3 sm:mb-4 text-gray-600">
        <FileText size={18} className="text-indigo-600 sm:w-5 sm:h-5" />

        <p className="text-sm sm:text-base font-medium">All Blogs</p>
      </div>

      {/* Blog Table */}
      <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200 text-left text-[10px] sm:text-xs md:text-sm text-gray-600">
              <th className="w-[8%] px-2 sm:px-3 md:px-4 py-2 sm:py-3">#</th>

              <th className="w-[42%] px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                Blog Title
              </th>

              <th className="w-[18%] px-2 sm:px-3 md:px-4 py-2 sm:py-3 max-sm:hidden">
                Date
              </th>

              <th className="w-[15%] px-2 sm:px-3 md:px-4 py-2 sm:py-3 max-sm:hidden">
                Status
              </th>

              <th className="w-[32%] sm:w-[17%] px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchblogs}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-xs sm:text-sm text-gray-500"
                >
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBlog;
