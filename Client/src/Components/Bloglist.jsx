import React from "react";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { blog_data } from "../assets/assets";
import { useAppContext } from "../../context/AppContext";

function Bloglist() {
  const {blogs,input}=useAppContext()
  const [active, setActive] = useState("All");
  const categories = ["All", "Technology", "Startup", "Lifestyle", "Finance"];
   
  const filteredblogs=()=>{
    if(input===''){
      return blogs
    }
    return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase())||blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-0 mt-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`px-5 py-2 rounded-full transition ${
              active === category
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-5 sm:px-10 lg:px-16">
        {filteredblogs()
          .filter((blog) => (active=== "All" ? true : blog.category === active))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
}

export default Bloglist;
