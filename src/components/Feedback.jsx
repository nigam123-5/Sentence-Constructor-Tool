const Feedback = ({ questions, userAnswers }) => {
    const score = userAnswers.reduce((acc, ans, idx) => {
      const correct = questions[idx].correctAnswer;
      const isCorrect = JSON.stringify(ans) === JSON.stringify(correct);
      return isCorrect ? acc + 1 : acc;
    }, 0);
  
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4">🎉 Feedback</h2>
        <p className="mb-6 text-lg font-semibold">
          Your Score: {score} / {questions.length}
        </p>
  
        {questions.map((q, idx) => {
          const isCorrect = JSON.stringify(userAnswers[idx]) === JSON.stringify(q.correctAnswer);
          return (
            <div key={q.questionId} className="mb-4 p-4 border rounded-md">
              <p className="font-semibold mb-2">Q{idx + 1}: {q.question}</p>
              <p className="text-sm">
                <strong>Your Answer:</strong> {userAnswers[idx].join(", ")}
              </p>
              {!isCorrect && (
                <p className="text-sm text-red-600">
                  <strong>Correct Answer:</strong> {q.correctAnswer.join(", ")}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  export default Feedback;
  