export default function Button({
  dispatchType,
  questionIndex,
  dispatch,
  answer,
  children,
}) {
  let isAnswered = answer !== null;
  return (
    isAnswered &&
    questionIndex && (
      <button
        className="btn btn-ui next"
        onClick={() => dispatch({ type: dispatchType })}
      >
        {children}
      </button>
    )
  );
}
