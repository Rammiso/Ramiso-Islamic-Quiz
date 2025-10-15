export default function Progress({ questions, index, points, answer }) {
  // const progress = ((index + 1) / questions.length) * 100;
  const total = 20;
  return (
    <header className="progress">
      <progress max={20} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/20
      </p>
      <p>
        <strong>{points}</strong>/{total} Points
      </p>
    </header>
  );
}
