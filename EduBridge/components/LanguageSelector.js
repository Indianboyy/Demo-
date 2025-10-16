import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import SparklesIcon from "./icons/SparklesIcon";

const languages = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "ja", name: "Japanese" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh-CN", name: "Mandarin" },
  { code: "ar", name: "Arabic" },
  { code: "ko", name: "Korean" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
];

const LanguageSelector = ({
  videoInfo,
  targetLanguage,
  setTargetLanguage,
  setResult,
  setError,
  callGeminiAPI,
  setLoadingMessage,
}) => {
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!targetLanguage) return;

    setError(null);
    setResult(null);
    setIsTranslating(true);
    setLoadingMessage("Translating transcript...");

    try {
      const selectedLangName = languages.find((l) => l.code === targetLanguage)?.name;
      const translatePrompt = `Translate the following text to ${selectedLangName}. Provide ONLY the translated text:\n\n"${videoInfo.originalTranscript}"`;

      const translatedText = await callGeminiAPI({
        contents: [{ parts: [{ text: translatePrompt }] }],
      });

      setResult({
        videoId: videoInfo.videoId,
        title: "Video Translation",
        translatedTranscript: translatedText.trim(),
        originalTranscript: videoInfo.originalTranscript,
        detectedLanguage: videoInfo.detectedLanguage,
        targetLanguage: selectedLangName,
      });
    } catch (err) {
      setError("Translation failed. Please try again.");
      console.error(err);
    } finally {
      setIsTranslating(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-purple-300">Step 2: Choose Translation Language</h2>
      <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
        <p className="text-gray-300">
          <span className="font-semibold text-blue-400">Detected Language:</span> {videoInfo.detectedLanguage}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select target language...</option>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleTranslate}
          disabled={!targetLanguage || isTranslating}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold py-3 px-6 flex items-center justify-center gap-2 transition-all"
        >
          <SparklesIcon />
          {isTranslating ? "Translating..." : "Translate"}
        </button>
      </div>
      {isTranslating && <LoadingSpinner text="Translating..." />}
    </div>
  );
};

export default LanguageSelector;
