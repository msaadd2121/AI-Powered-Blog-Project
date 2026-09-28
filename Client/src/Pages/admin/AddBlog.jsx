import { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const AddBlog = () => {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  // Generate Blog with AI
  const generateContent = async () => {
    if (!title.trim()) {
      return toast.error('Please Enter a Title');
    }

    setLoading(true);

    try {
      const { data } = await axios.post('/api/blog/generate', {
        prompt: title,
      });

      if (data.success) {
        quillRef.current.root.innerHTML = data.content;
        toast.success('Content generated successfully');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('GENERATE ERROR:', error);
      toast.error(
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Add Blog
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error('Please upload a thumbnail image');
    }

    const description = quillRef.current?.root?.innerHTML || '';

    if (!description.trim() || description === '<p><br></p>') {
      return toast.error('Please enter blog description');
    }

    setIsAdding(true);

    try {
      const formData = new FormData();

      formData.append('image', image);
      formData.append('title', title);
      formData.append('subtitle', subTitle);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('isPublished', String(isPublished));

      const { data } = await axios.post(
        '/api/blog/add',
        formData
      );

      if (data.success) {
        toast.success(data.message);

        // Clear form only after successful submission
        setImage(false);
        setTitle('');
        setSubTitle('');
        setCategory('Startup');
        setIsPublished(false);

        if (quillRef.current) {
          quillRef.current.root.innerHTML = '';
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('ADD BLOG ERROR:', error);

      toast.error(
        error.response?.data?.message || error.message
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-y-scroll"
    >
      <div className="bg-white w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-10 sm:m-6 md:m-10 shadow rounded">

        {/* Upload Thumbnail */}
        <p>Upload thumbnail</p>

        <label htmlFor="image">
          {!image ? (
            <div className="mt-2 h-16 w-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0L8 8m4-4l4 4"
                />
              </svg>
            </div>
          ) : (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="mt-2 h-16 rounded cursor-pointer"
            />
          )}

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        {/* Blog Title */}
        <p className="mt-4">Blog title</p>

        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full mt-2 p-2 border rounded outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Blog Subtitle */}
        <p className="mt-4">Blog subtitle</p>

        <input
          type="text"
          placeholder="Type here"
          className="w-full mt-2 p-2 border rounded outline-none"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />

        {/* Blog Description */}
        <p className="mt-4">Blog Description</p>

        <div className="w-full pb-16 sm:pb-10 pt-2 relative">

          <div
            ref={editorRef}
            style={{ minHeight: '300px' }}
            className="bg-white"
          ></div>

          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}

          <button
            type="button"
            disabled={loading}
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline"
          >
            {loading ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>

        {/* Category */}
        <p className="mt-4">Blog category</p>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-auto mt-2 px-3 py-2 border text-gray-500 rounded outline-none"
        >
          <option value="">Select category</option>
          <option value="All">All</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Startup">Startup</option>
          <option value="Finance">Finance</option>
        </select>

        {/* Publish */}
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>

          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer"
          />
        </div>

        {/* Add Blog Button */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-full sm:w-40 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded cursor-pointer disabled:opacity-50"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>

      </div>
    </form>
  );
};

export default AddBlog;