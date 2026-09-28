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
      const { data } =  await axios.get("/api/blogs");


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
    <div>
      <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
        <FileText size={20} className="text-indigo-600" />
        <p>All Blogs</p>
      </div>

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
            {blogs.map((blog, index) => {
              return (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchblogs}
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

export default ListBlog;
