import React, { useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import SparklesIcon from "./components/icons/SparklesIcon";
import QuizIcon from "./components/icons/QuizIcon";
import TranscriptViewer from "./components/TranscriptViewer";
import QuizComponent from "./components/QuizComponent";

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [savedTranslations, setSavedTranslations] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "ja", name: "Japanese" },
    { code: "pt", name: "Portuguese" }
  ];

  // Placeholder fetch/translate functions
  const handleFetchTranslate = async () => {
    setIsLoading(true);
    setResult({
      videoId: "abc123",
      originalTranscript: "Hello world. This is a test transcript.",
      translatedTranscript: "Hola mundo. Esto es una transcripción de prueba.",
      detectedLanguage: "English",
      targetLanguage: "Spanish"
    });
    setIsLoading(false);
  };

  const handleGenerateQuiz = async () => {
    setQuiz([
      { question: "What is this?", options: ["A", "B", "C", "D"], correctAnswer: "A" },
      { question: "Select B?", options: ["A", "B", "C", "D"], correctAnswer: "B" },
      { question: "Pick C?", options: ["A", "B", "C", "D"], correctAnswer: "C" }
    ]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-6">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">EduBridge</h1>

      {/* YouTube URL Input */}
      <div className="flex gap-4 mb-6">
        <input type="url" value={youtubeUrl} onChange={(e)=>setYoutubeUrl(e.target.value)} placeholder="YouTube URL" className="flex-grow p-3 rounded-lg bg-gray-700 text-white"/>
        <button onClick={handleFetchTranslate} className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg">Analyze Video</button>
      </div>

      {isLoading && <LoadingSpinner text="Fetching/Translating..." />}

      {result && <TranscriptViewer result={result} savedTranslations={savedTranslations} setSavedTranslations={setSavedTranslations} />}

      {result && (
        <button onClick={handleGenerateQuiz} className="bg-orange-600 hover:bg-orange-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <QuizIcon /> Generate Quiz
        </button>
      )}

      {quiz && <QuizComponent quizData={quiz} />}
    </div>
  );
}

export default App;
