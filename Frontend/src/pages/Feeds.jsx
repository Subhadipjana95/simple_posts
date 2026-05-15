import React, { useEffect, useState } from "react";
import {
  Heart,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    const action = isLiked ? 'unlike' : 'like';
    const originalLikes = likes;
    const originalIsLiked = isLiked;

    // Optimistic update
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);

    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}/like`, { action });
      
      // Update local storage for persistence on this device
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
      if (action === 'like') {
        localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, post._id]));
      } else {
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts.filter(id => id !== post._id)));
      }
    } catch (err) {
      console.error("Failed to update like:", err);
      // Revert on error
      setLikes(originalLikes);
      setIsLiked(originalIsLiked);
    }
  };

  // Format Date String into Date & Time
  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${datePart} • ${timePart}`;
  };

  // Generate initial letters for avatar
  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.split(/[_\s.-]/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setIsLiked(likedPosts.includes(post._id));
  }, [post._id]);

  return (
    <div className="w-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-xl overflow-hidden transition-all hover:border-zinc-700/50">
      {/* Post Image */}
      <div className="relative aspect-square sm:aspect-video w-full overflow-hidden bg-zinc-950">
        <img
          src={post.image}
          alt="Post content"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Content */}
      <div className="px-4 py-5 space-y-4">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-zinc-800 flex items-center justify-center text-blue-400 font-bold text-xs tracking-tighter">
              {getInitials(post.user)}
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-zinc-100">
                {post.user}
              </h3>
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLike}
            className={`group flex items-center gap-0.5 transition-all mr-2 ${isLiked ? 'text-blue-500' : 'text-zinc-400 hover:text-blue-500'}`}
          >
            <div className={`p-1 rounded-full transition-all ${isLiked ? '' : 'group-hover:bg-blue-500/10'}`}>
              <Heart
                size={22}
                fill={isLiked ? "currentColor" : "none"}
                className="group-active:scale-125 transition-transform"
              />
            </div>
            <span className="text-sm font-medium">{likes}</span>
          </button>
        </div>

        {/* Caption */}
        <div className="space-y-1">
          <p className="text-zinc-300 text-sm leading-relaxed">
            {post.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/feeds`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-medium tracking-tighter bg-linear-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Vibe Thought
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/create-post"
              className="w-8.5 h-8.5 rounded-full bg-blue-400/50 border border-blue-400/80  hover:bg-blue-600 flex items-center justify-center text-white/80 transition-all transform active:scale-95 shadow-lg shadow-blue-500/20"
              title="Create Post"
            >
              <Plus size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pt-8 space-y-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center pt-20 gap-4">
             <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
             <p className="text-zinc-500 text-sm animate-pulse">Syncing vibes...</p>
          </div>
        ) : posts.length > 0 ? (
          posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))
        ) : (
          <div className="text-center pt-20">
            <p className="text-zinc-500">No thoughts shared yet.</p>
            <Link to="/create-post" className="text-blue-400 text-sm mt-2 inline-block">Be the first</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Feeds;
