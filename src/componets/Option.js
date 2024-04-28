function Option({ answer, curQuestion, dispatch }) {
  const { options, correctOption } = curQuestion;
  const hasAnswer = answer !== null;
  return (
    <>
      {options.map((option, i) => (
        <button
          className={` btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswer ? (i === correctOption ? "correct" : "wrong") : ""
          }`}
          disabled={hasAnswer}
          key={i + 2}
          onClick={() => dispatch({ type: "getAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default Option;
