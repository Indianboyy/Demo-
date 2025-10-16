import React from "react";

const VideoInput = ({ youtubeUrl, setYoutubeUrl, handleFetchVideoInfo, isLoading }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-300">Step 1: Enter YouTube URL</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="url"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetchVideoInfo}
          disabled={isLoading || !youtubeUrl}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          {isLoading ? "Loading..." : "Analyze Video"}
        </button>
      </div>
    </div>
  );
};

export default VideoInput;
