import QuestionItem from "./QuestionItem";
export default function Question({ questions, dispatch, answer }) {
  return (
    <div className="main-body">
      <h4 className="question-statement">{questions.question}</h4>

      <QuestionItem questions={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}
