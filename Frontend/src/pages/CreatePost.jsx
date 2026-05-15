import React, { useState, useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [username, setUsername] = useState("");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!preview) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    const file = fileInputRef.current.files[0];
    
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("user", username || "Anonymous");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center pt-2 pb-4 px-2 sm:p-6 font-sans overflow-x-hidden">
      <div className="w-full max-w-120 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden px-4 py-3 sm:p-8">
        <div className="mb-8 space-y-1.5">
          <h1 className="text-3xl font-medium tracking-tight bg-linear-to-br from-white to-zinc-600 bg-clip-text text-transparent">
            Create Post
          </h1>
          <p className="text-zinc-500 text-sm">
            Design your thoughts and share them.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Media Upload Area */}
          <div
            onClick={() => !preview && fileInputRef.current?.click()}
            className={`relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                ${preview ? "border-zinc-800" : "border-zinc-800/50 hover:border-blue-500/30 hover:bg-zinc-800/20"}`}
            style={{ minHeight: preview ? "auto" : "180px" }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {preview ? (
              <div className="w-full h-full relative group/img">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-72 object-cover"
                />
                <div className="sm:block absolute inset-0 bg-zinc-950/60 opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="bg-white/10 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 p-2.5 sm:p-3 rounded-full text-white transition-all transform hover:scale-110 active:scale-95"
                  >
                    <X size={20} className="sm:w-5.5" />
                  </button>
                </div>
                {/* Mobile delete button overlay (always visible on small screens) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute top-2 right-2 sm:hidden bg-zinc-950/80 border border-white/10 p-2 rounded-full text-white"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 sm:gap-4 py-8 sm:py-10 px-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800/50 rounded-xl sm:rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-blue-400 transition-all duration-500">
                  <ImagePlus size={24} className="sm:w-7" strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <p className="text-sm text-zinc-600 tracking-tighter mt-1">
                    Tap to upload image
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Caption Input */}
          <div className="group flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-400 group-focus-within:text-blue-400 transition-colors px-1">
              Show the Vibe
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Reveal your vibes..."
              className="w-full bg-zinc-800/30 border border-zinc-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 min-h-30 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-zinc-600 text-sm sm:text-base text-zinc-200"
            />
          </div>

          {/* Username Input Wrap */}
          <div className="group flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-400 group-focus-within:text-blue-400 transition-colors px-1">
              Want to be recognized?{" "}
              <span className="text-zinc-500">(Optional)</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              className="w-full bg-zinc-800/30 border border-zinc-800 rounded-lg px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-zinc-600 text-sm sm:text-base text-zinc-200"
            />
          </div>

          

          <div className="flex justify-between gap-2 flec-row-reverse">
            <Link to="/">
              <p className="text-center text-base px-3 text-zinc-500 hover:text-blue-400  py-4 border border-zinc-800 rounded-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                Explore Feeds
              </p>
            </Link>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative px-3 bg-blue-500/60 hover:bg-blue-500 text-white/70 font-semibold py-4 rounded-lg flex flex-1 items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              <span className="text-base tracking-tight">Share Vibe</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
