import React from "react";

const QuizIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
    />
    <polyline points="14 2 14 8 20 8" />
    <path d="M12 18h.01" />
    <path d="M10 14c.2-.5.8-1 1.5-1s1.3.5 1.5 1" />
  </svg>
);

export default QuizIcon;
