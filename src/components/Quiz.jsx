import { useEffect, useState } from "react";

const Quiz = ({ question, questionIndex, onNext }) => {
  const totalBlanks = question.correctAnswer.length;
  const [selectedWords, setSelectedWords] = useState(Array(totalBlanks).fill(null));
  const [remainingOptions, setRemainingOptions] = useState([...question.options]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(interval);
          handleNext();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWordSelect = (word) => {
    const emptyIndex = selectedWords.findIndex(w => w === null);
    if (emptyIndex === -1) return;

    const newSelected = [...selectedWords];
    newSelected[emptyIndex] = word;
    setSelectedWords(newSelected);
    setRemainingOptions(remainingOptions.filter(opt => opt !== word));
  };

  const handleUnselect = (index) => {
    const word = selectedWords[index];
    if (!word) return;

    const newSelected = [...selectedWords];
    newSelected[index] = null;
    setSelectedWords(newSelected);
    setRemainingOptions([...remainingOptions, word]);
  };

  const handleNext = () => {
    onNext(selectedWords);
    setSelectedWords(Array(totalBlanks).fill(null));
    setRemainingOptions([...question.options]);
    setTimer(30);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Question {questionIndex + 1}</h2>
      <p className="text-lg font-medium mb-6">
        {question.question.split("___________").map((chunk, i) => (
          <span key={i}>
            {chunk}
            {i < totalBlanks && (
              <span
                onClick={() => handleUnselect(i)}
                className="inline-block w-auto min-w-[80px] mx-1 px-2 py-1 border border-blue-500 rounded cursor-pointer bg-blue-100 hover:bg-blue-200 transition"
              >
                {selectedWords[i] || "____"}
              </span>
            )}
          </span>
        ))}
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        {remainingOptions.map((word, i) => (
          <button
            key={i}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => handleWordSelect(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">⏳ {timer}s</p>
        <button
          onClick={handleNext}
          disabled={selectedWords.includes(null)}
          className={`px-6 py-2 rounded text-white font-semibold transition ${
            selectedWords.includes(null)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
