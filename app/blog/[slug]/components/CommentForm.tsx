"use client";

import { useState } from "react";

const CommentForm = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2">
      <textarea
        className="rounded border border-yellow-300 p-2 text-sm focus:border-yellow-500 focus:outline-none"
        rows={3}
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="self-end rounded bg-yellow-500 px-4 py-1 text-white hover:bg-yellow-600"
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
