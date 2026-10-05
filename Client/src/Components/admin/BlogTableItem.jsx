import React from "react";
import { X } from "lucide-react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

function BlogTableItem({ blog, fetchBlogs, index }) {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirm) return;

    try {
      const { data } = await axios.post("api/blog/delete", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const tooglePublish = async () => {
    try {
      const { data } = await axios.post("api/blog/toogle-publish", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      {/* Number */}
      <th className="px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm">
        {index}
      </th>

      {/* Title */}
      <td className="px-2 sm:px-3 py-3 sm:py-4">
        <p className="text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[250px] md:max-w-[350px]">
          {title}
        </p>
      </td>

      {/* Date */}
      <td className="px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm max-sm:hidden">
        {BlogDate.toDateString()}
      </td>

      {/* Status */}
      <td className="px-2 sm:px-3 py-3 sm:py-4 max-sm:hidden">
        <p
          className={`text-xs sm:text-sm ${
            blog.isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "UnPublished"}
        </p>
      </td>

      {/* Actions */}
      <td className="px-2 sm:px-3 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={tooglePublish}
            className="border px-2 py-1 text-[10px] sm:text-xs rounded cursor-pointer whitespace-nowrap"
          >
            {blog.isPublished ? "UnPublished" : "Publish"}
          </button>

          <button
            onClick={deleteBlog}
            className="cursor-pointer text-red-500 shrink-0 flex items-center justify-center"
          >
            <X
              size={16}
              className="sm:w-[18px] sm:h-[18px]"
            />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default BlogTableItem;