function Progress({ curQuestion, numQuestions, totalPoints, points, answer }) {
  return (
    <header className="Progress">
      <progress
        max={numQuestions}
        value={curQuestion + Number(answer !== null)}
      />
      <p>
        Question <strong>{curQuestion + 1}</strong> / {numQuestions}
      </p>
      <p>
        Question <strong>{points}</strong> / {totalPoints}
      </p>

      <div>
        <span></span>
      </div>
    </header>
  );
}

export default Progress;
