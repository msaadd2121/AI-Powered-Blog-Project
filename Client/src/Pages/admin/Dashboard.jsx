import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import BlogTableItem from "../../Components/admin/BlogTableItem";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

function Dashboard() {
  const [blogs, setBlogs] = useState(0);
  const [comments, setComments] = useState(0);
  const [drafts, setDrafts] = useState(0);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/dashboard");

      if (data.success) {
        setBlogs(data.dashboardData.blogs);
        setComments(data.dashboardData.comments);
        setDrafts(data.dashboardData.drafts);
        setRecentBlogs(data.dashboardData.recentBlogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 min-h-screen bg-blue-50/50 p-3 sm:p-5 md:p-8 overflow-x-hidden">

      {/* Dashboard Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl">

        {/* Blogs */}
        <div className="bg-white border border-gray-200 rounded-md sm:rounded-lg p-3 sm:p-5 text-center hover:shadow-md transition-all">
          <h2 className="text-lg sm:text-2xl font-bold text-indigo-600">
            {blogs}
          </h2>

          <p className="text-[11px] sm:text-sm text-gray-600 mt-1">
            Blogs
          </p>
        </div>

        {/* Comments */}
        <div className="bg-white border border-gray-200 rounded-md sm:rounded-lg p-3 sm:p-5 text-center hover:shadow-md transition-all">
          <h2 className="text-lg sm:text-2xl font-bold text-indigo-600">
            {comments}
          </h2>

          <p className="text-[11px] sm:text-sm text-gray-600 mt-1">
            Comments
          </p>
        </div>

        {/* Drafts */}
        <div className="bg-white border border-gray-200 rounded-md sm:rounded-lg p-3 sm:p-5 text-center hover:shadow-md transition-all">
          <h2 className="text-lg sm:text-2xl font-bold text-indigo-600">
            {drafts}
          </h2>

          <p className="text-[11px] sm:text-sm text-gray-600 mt-1">
            Drafts
          </p>
        </div>

      </div>

      {/* Latest Blogs Heading */}
      <div className="flex items-center gap-2 mt-6 sm:mt-8 mb-3 sm:mb-4 text-gray-600">
        <FileText
          size={18}
          className="text-indigo-600 sm:w-5 sm:h-5"
        />

        <p className="text-sm sm:text-base font-medium">
          Latest Blogs
        </p>
      </div>

      {/* Blog Table */}
      <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">

        <table className="w-full table-fixed">

          <thead>
            <tr className="border-b border-gray-200 text-left text-[10px] sm:text-xs md:text-sm text-gray-600">

              <th className="w-[8%] px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                #
              </th>

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
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboardData}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-xs sm:text-sm text-gray-500"
                >
                  No recent blogs found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;