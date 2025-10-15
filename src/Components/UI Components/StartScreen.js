export default function StartScreen({ numQuestions, dispatch }) {
  function handleBtClick() {
    dispatch({ type: "startQuiz" });
  }
  return (
    <div className="start">
      <h2>Welcome to the Islamic quiz.</h2>
      <h3>{numQuestions} questions to test about your islam knowledge.</h3>
      <button className="btn btn-ui" onClick={handleBtClick}>
        Lets Start...
      </button>
    </div>
  );
}
