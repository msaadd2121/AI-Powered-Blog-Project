import React, { useRef } from "react";
import Bloglist from "../Components/Bloglist";
import NewsLetter from "../Components/NewsLetter";
import Header from "../Components/Header";
import { useAppContext } from "../../context/AppContext";

function Home() {
  const inputRef=useRef()
  const{input,setInput}=useAppContext()

  const OnSubmitHandler=async(e)=>{
    e.preventDefault();
    setInput(inputRef.current.value)
  }
  const OnClear=()=>{
    setInput('')
    inputRef.current.value=''
  }
  return (
    <div>
    <Header/>
    <section className="text-center mt-20 px-4">
      <div className="inline-flex items-center gap-2 border border-indigo-300 bg-indigo-50 px-5 py-2 rounded-full text-sm text-indigo-600">
        New: AI feature integrated ✦
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-700 mt-6">
        Your own <span className="text-indigo-600">blogging</span>
        <br />
        platform.
      </h1>

      <p className="max-w-2xl mx-auto text-gray-600 mt-6 text-sm sm:text-base">
        This is your space to think out loud, to share what matters, and to
        write without filters. Whether it's one word or a thousand, your story
        starts right here.
      </p>

      {/* Search Bar */}
      <form onSubmit={OnSubmitHandler} className="max-w-lg mx-auto mt-8 flex">
        <input
          ref={inputRef}
          type="text"
          required
          placeholder="Search blogs..."
          className="w-full border border-gray-300 px-4 py-3 outline-none "
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 cursor-pointer"
        >
          Search
        </button>
      </form>
      <div className="text-center mt-6">
        {input&& <button onClick={OnClear}className="border font-light text-xs py-1 px-3 rounded-sm shado-custom-sm cursor-pointer">Clear Search</button>
        }
        
      </div>
      
      <Bloglist/>
      <NewsLetter/>
    </section>
    </div>
    
  );
}

export default Home;
