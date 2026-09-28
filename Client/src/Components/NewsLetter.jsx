import React from 'react'

function NewsLetter() {
  return (
    <div className='mt-40'>
    <h1 className='font-bold text-4xl'>Never Miss a Blog!</h1>
    <p className='md:text-lg text-gray-400 mt-2'>Subscribe to get the latest blog, new tech, and exclusive news.</p>
    <form className="max-w-2xl mx-auto mt-10 flex">
        <input type='email' placeholder='Enter your email id' required className="w-full border border-gray-300 px-4 py-3 outline-none "></input>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-10 py-3 cursor-pointer rounded-r-lg text-1xl font-semibold"
        >
          Subscribe
        </button>
    </form>
    </div> 
  )
}

export default NewsLetter