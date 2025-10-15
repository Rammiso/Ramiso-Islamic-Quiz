export default function QuestionItem({ questions, dispatch, answer }) {
  let isAnswered = answer !== null;
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          key={option}
          disabled={isAnswered}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            isAnswered
              ? index === questions.answerIndex
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
