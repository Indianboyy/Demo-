import React, { useState } from "react";
import SpeakerIcon from "./icons/SpeakerIcon";
import BookmarkIcon from "./icons/BookmarkIcon";

const TranscriptViewer = ({ result, savedTranslations, setSavedTranslations }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSave = () => {
    if (!savedTranslations.find(t => t.videoId === result.videoId)) {
      setSavedTranslations([result, ...savedTranslations]);
    }
  };

  const handleTTS = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(result.translatedTranscript);
    utterance.lang = result.targetLanguage || "en-US";
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const saved = savedTranslations.find(t => t.videoId === result.videoId);

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mb-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-3">Translation</h3>
      <div className="mb-3"><p className="text-gray-300 font-semibold">Original ({result.detectedLanguage})</p><p className="text-gray-200 whitespace-pre-wrap">{result.originalTranscript}</p></div>
      <div className="mb-3"><p className="text-gray-300 font-semibold">Translated ({result.targetLanguage})</p><p className="text-gray-200 whitespace-pre-wrap">{result.translatedTranscript}</p></div>
      <div className="flex gap-3">
        <button onClick={handleTTS} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center gap-2">
          <SpeakerIcon isSpeaking={isSpeaking} /> {isSpeaking ? 'Stop' : 'Listen'}
        </button>
        <button onClick={handleSave} disabled={saved} className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white py-2 px-4 rounded-lg flex items-center gap-2">
          <BookmarkIcon saved={saved} /> {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default TranscriptViewer;
