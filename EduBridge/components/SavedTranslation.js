import React from "react";

const SavedTranslations = ({
  savedTranslations,
  setYoutubeUrl,
  setVideoInfo,
  setResult,
  setSavedTranslations,
}) => {
  const handleLoad = (item) => {
    setYoutubeUrl(`https://www.youtube.com/watch?v=${item.videoId}`);
    setVideoInfo({
      videoId: item.videoId,
      originalTranscript: item.originalTranscript,
      detectedLanguage: item.detectedLanguage,
    });
    setResult(item);
  };

  const handleDelete = (videoId) => {
    const filtered = savedTranslations.filter((t) => t.videoId !== videoId);
    setSavedTranslations(filtered);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700 my-6">
      <h2 className="text-xl font-semibold mb-4 text-yellow-400">Saved Translations</h2>
      {savedTranslations.length === 0 ? (
        <p className="text-gray-400">No saved translations yet.</p>
      ) : (
        <ul className="space-y-3">
          {savedTranslations.map((item) => (
            <li
              key={item.videoId}
              className="bg-gray-700/30 p-4 rounded-lg flex justify-between items-center"
            >
              <span>{item.targetLanguage} - {item.videoId}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLoad(item)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg"
                >
                  Load
                </button>
                <button
                  onClick={() => handleDelete(item.videoId)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedTranslations;
