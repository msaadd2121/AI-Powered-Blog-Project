import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "moment";
import Header from "./Header";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Blog() {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);

      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCommentsData = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", {
        blogId: id,
      });

      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchCommentsData();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blogId: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <div className="min-h-75 flex flex-col items-center text-center px-5 pt-8 pb-10 mt-10">

        {/* Published Date */}
        <div>
          <p className="text-indigo-600 text-sm sm:text-base font-medium">
            Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
          </p>
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-5xl font-bold text-slate-800 mt-5 leading-[1.05]">
          {data.title}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-gray-600 text-sm sm:text-base mt-6">
          {data.subtitle}
        </p>

        {/* Author */}
        <p className="mt-6 px-5 py-2 border border-indigo-300 rounded-full text-indigo-600 text-sm font-bold">
          Michael Brown
        </p>

        {/* Blog Image */}
        <img
          src={data.image}
          alt={data.title}
          className="w-full max-w-6xl mx-auto mt-10 block object-cover h-75 sm:h-112.5 lg:h-145 px-5 sm:px-8 lg:px-10 rounded-3xl"
        />

        {/* Blog Content */}
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-0 mt-12 pb-16 text-left">
          <div
            className="
              text-base sm:text-[17px]
              text-gray-800
              leading-7

              [&_p]:mb-7

              [&_h1]:text-3xl
              [&_h1]:sm:text-5xl
              [&_h1]:font-bold
              [&_h1]:text-gray-800
              [&_h1]:leading-tight
              [&_h1]:mb-10

              [&_h2]:text-xl
              [&_h2]:sm:text-2xl
              [&_h2]:font-bold
              [&_h2]:text-gray-900
              [&_h2]:mt-8
              [&_h2]:mb-7

              [&_ul]:list-disc
              [&_ul]:pl-6
              [&_ul]:mb-7

              [&_ol]:list-decimal
              [&_ol]:pl-6
              [&_ol]:mb-7

              [&_li]:mb-2

              [&_strong]:font-bold
              [&_em]:italic
            "
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        {/* Comments */}
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-0 pr-8 mt-14 text-left">
          <h2 className="font-semibold text-lg">
            Comments ({comments.length})
          </h2>

          {comments.map((comment) => (
            <div
              key={comment._id}
              className="w-full border border-gray-200 p-5 mt-5 rounded-lg"
            >
              <p className="font-medium">{comment.name}</p>

              <p className="text-gray-600 mt-2">
                {comment.content}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                {Moment(comment.createdAt).fromNow()}
              </p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-0 pr-8 mt-10 pb-16 text-left">
          <h2 className="text-lg font-semibold mb-4">
            Add your comment
          </h2>

          <form onSubmit={addComment}>
            <input
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-[90%] border border-gray-300 rounded px-2 py-3 mb-4 outline-none"
            />

            <textarea
              placeholder="Comment"
              rows="6"
              required
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-[90%] border border-gray-300 rounded px-2 py-3 mb-4 outline-none resize-none"
            ></textarea>

            <button
              type="submit"
              className="bg-indigo-600 text-white font-medium px-8 py-2.5 rounded cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Blog;