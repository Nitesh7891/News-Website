import React, { useState, useEffect } from "react";
import image from "../assets/news.jpg";

const NewsItem = ({ title, description, src, url }) => {
  const storageKey = `comments-${url}`;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Load comments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, [storageKey]);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      text: comment.trim(),
      likes: 0,
      time: new Date().toLocaleTimeString(),
    };

    setComments((prev) => [newComment, ...prev]);
    setComment("");
  };

  const handleLike = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  // 3D tilt handler
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1
    const rotateX = (0.5 - y) * 10; // -5 to 5 deg
    const rotateY = (x - 0.5) * 10; // -5 to 5 deg
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-sm sm:max-w-[345px]">
      <div
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-xl transition-transform duration-150"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={src || image}
            alt="news"
          />
        </a>

        <div className="p-4 sm:p-5">
          <h5 className="mb-2 text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
            {title ? title.slice(0, 60) : "Untitled"}
          </h5>

          <p className="mb-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            {description
              ? description.slice(0, 120)
              : "No description available."}
          </p>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 mb-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>

          {/* Comment input */}
          <textarea
            className="w-full text-sm p-2 border border-gray-300 dark:border-gray-600 rounded-md mt-2 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="2"
          ></textarea>

          <button
            onClick={handleAddComment}
            className="mt-2 w-full py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Post Comment
          </button>

          {/* Comments */}
          <div className="mt-4 space-y-3 max-h-44 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No comments yet.
              </p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                >
                  <p className="text-sm text-gray-900 dark:text-gray-200">
                    {c.text}
                  </p>

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[11px] text-gray-500">
                      {c.time}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLike(c.id)}
                        className="text-blue-600 text-xs font-semibold hover:underline"
                      >
                        ❤️{" "}
                        {c.likes === 0
                          ? "Like"
                          : `${c.likes} Like${c.likes > 1 ? "s" : ""}`}
                      </button>

                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-red-500 text-xs font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
