export default function Finished({
  points,
  numQuestions,
  dispatch,
  highscore,
}) {
  const percentage = (points / numQuestions) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of 20({Math.ceil(percentage)}%)
      </p>
      <p className="highscore"> (Highscore: {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "retake" })}
      >
        Restart quiz?{" "}
      </button>
    </>
  );
}
