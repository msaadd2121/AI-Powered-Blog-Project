import React from "react";
import { Check, Trash2 } from "lucide-react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

function CommentTableItem({ comment, fetchcomments }) {
  const { blog, createdAt, _id } = comment;
  const { axios } = useAppContext();
  const BlogDate = new Date(createdAt);

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/approve-comment", { id: _id });

      if (data.success) {
        toast.success(data.message);
        fetchcomments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteComments = async () => {
    try {
      const confirm = window.confirm(
        "Are u sure you want to delete this comment?",
      );

      if (!confirm) return;

      const { data } = await axios.post("/api/delete-comment", {
        commentId: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchcomments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b>: {blog?.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>: {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b>: {comment.content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <Check
              onClick={approveComment}
              className="w-5 h-5 text-green-600 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <Trash2
            onClick={deleteComments}
            className="w-5 h-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
}

export default CommentTableItem;
