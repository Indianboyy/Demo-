import React, { useState } from "react";

const QuizComponent = ({ quizData }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === quizData[current].correctAnswer) setScore(score + 1);
  };

  const handleNext = () => {
    setAnswered(false);
    setSelected(null);
    setCurrent(current + 1);
  };

  if (!quizData || quizData.length === 0) return null;

  const finished = current >= quizData.length;

  return (
    <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
      <h3 className="text-2xl font-bold text-center text-purple-400 mb-4">✨ Knowledge Check</h3>
      {finished ? (
        <div className="text-center">
          <h4 className="text-xl font-semibold">Quiz Complete!</h4>
          <p className="text-2xl my-4">Score: <span className="text-green-400 font-bold">{score}</span> / {quizData.length}</p>
          <button onClick={() => { setCurrent(0); setScore(0); }} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Restart</button>
        </div>
      ) : (
        <div>
          <p className="text-gray-400 text-sm mb-2">Q{current+1} of {quizData.length}</p>
          <p className="font-semibold text-lg mb-4">{quizData[current].question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quizData[current].options.map((opt, i) => {
              const correct = opt === quizData[current].correctAnswer;
              const selectedOpt = opt === selected;
              let cls = "bg-gray-700 hover:bg-gray-600";
              if (answered) {
                if (correct) cls = "bg-green-500/80";
                else if (selectedOpt) cls = "bg-red-500/80";
              }
              return <button key={i} onClick={() => handleAnswer(opt)} disabled={answered} className={`p-3 rounded-lg text-left transition-all duration-300 ${cls}`}>{opt}</button>;
            })}
          </div>
          {answered && (
            <div className="text-right mt-4">
              <button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">
                {current === quizData.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
