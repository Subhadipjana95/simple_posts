import React from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  User,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

const demoPosts = [
  {
    id: 1,
    user: "creative_mind",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    caption:
      "Midnight abstractions and digital dreamscapes. Exploring the boundaries of color and light in the neo-minimalist era.",
    likes: 124,
    createdAt: "2024-05-15T10:00:00Z",
  },
  {
    id: 2,
    user: "urban_explorer",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
    caption:
      "The city never sleeps, and neither do the shadows. Captured this perspective during my early morning walk through the financial district.",
    likes: 89,
    createdAt: "2024-05-14T18:30:00Z",
  },
  {
    id: 3,
    user: "nature_spirit",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    caption:
      "Inhale the future, exhale the past. There is a hidden language in the way the mist crawls over the valley.",
    likes: 215,
    createdAt: "2024-05-14T07:15:00Z",
  },
];

const PostCard = ({ post }) => {
  const [likes, setLikes] = React.useState(post.likes);
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const formatDate = (dateString) => {
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

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(/[_\s.-]/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

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
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-20">
      {/* Navigation / Header */}
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
        {demoPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Feeds;
