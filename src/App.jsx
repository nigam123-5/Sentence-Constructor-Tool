import React, { useEffect, useState } from "react";
import data from "./data.json";
import Navbar from "./components/Navbar";
import './App.css';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timer, setTimer] = useState(30);

  const questions = data.data.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleWordClick = (word) => {
    if (selectedWords.length < currentQuestion.correctAnswer.length) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const checkAnswer = () => {
    const correct = currentQuestion.correctAnswer.every((word, i) => word === selectedWords[i]);
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedWords([]);
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
    }, 2000);
  };

  const handleNext = () => {
    checkAnswer();
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [currentQuestionIndex]);

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-200 flex items-center justify-center">
        <div
          className={`text-3xl font-bold px-10 py-8 rounded-3xl shadow-2xl transition-all duration-300 ${
            isCorrect
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans">
      
      <div className="background"></div>

      <div className="app-content min-h-screen px-4 py-8 flex items-center justify-center relative z-10">
        <Navbar />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="form-container bg-white/80 shadow-2xl rounded-3xl p-8 w-full max-w-3xl border border-gray-300 backdrop-blur-md"
        >
         
          <div className="top-info flex justify-between items-center mb-6 text-sm text-gray-700 font-medium">
            <span>🧠 Question {currentQuestionIndex + 1}</span>
            <span>⏳ {timer}s</span>
          </div>

        
          <h2 className="title text-2xl font-bold text-center text-gray-800 mb-6">
            Complete the sentence
          </h2>

          
          <p className="sentence text-lg text-center text-gray-800 leading-relaxed mb-8">
            {currentQuestion.question.split("______").map((part, index) => (
              <span key={index}>
                {part}
                {selectedWords[index] ? (
                  <span className="selected-word inline-block min-w-[90px] px-2 py-1 mx-1 text-center bg-blue-100 text-blue-700 font-semibold rounded-md shadow">
                    {selectedWords[index]}
                  </span>
                ) : (
                  <span className="blank-space inline-block min-w-[90px] h-8 mx-1 border-b-2 border-gray-500 align-middle"></span>
                )}
              </span>
            ))}
          </p>

        
          <div className="options flex flex-wrap justify-center gap-3 mb-6">
            {currentQuestion.options.map((word, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleWordClick(word)}
                className="option-button px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all shadow-md"
              >
                {word}
              </button>
            ))}
          </div>

          
          <div className="submit-container flex justify-center">
            <button
              type="submit"
              disabled={selectedWords.length !== currentQuestion.correctAnswer.length}
              className="submit-button px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>

      <footer className="footer">
        Designed by Suryansh Nigam
      </footer>
      </div>
    </div>
  );
};

export default App;
