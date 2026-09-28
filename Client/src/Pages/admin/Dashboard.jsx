import React, { useEffect, useState } from "react";
import { dashboard_data, blog_data } from "../../assets/assets";
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
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-5 sm:p-8">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl">
        <div className="border border-gray-200 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-2xl font-bold text-indigo-600">{blogs}</h2>
          <p className="text-gray-600 mt-2">Blogs</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-2xl font-bold text-indigo-600">{comments}</h2>
          <p className="text-gray-600 mt-2">Comments</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-2xl font-bold text-indigo-600">{drafts}</h2>
          <p className="text-gray-600 mt-2">Drafts</p>
        </div>
      </div>

      {/* Latest Blogs Heading */}
      <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
        <FileText size={20} className="text-indigo-600" />
        <p>Latest Blogs</p>
      </div>

      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Blog Title</th>
              <th className="px-4 py-3 max-sm:hidden">Date</th>
              <th className="px-4 py-3 max-sm:hidden">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {recentBlogs.map((blog, index) => {
              return (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboardData}
                  index={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
