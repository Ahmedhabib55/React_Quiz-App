function Next({ dispatch, answer, curQuestion, numQuestions }) {
  // todo if you need user must answered question
  // ? do if (answer === null) return ;
  // if (answer === null) return null;
  if (curQuestion < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  if (curQuestion === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finsihed" })}
      >
        Finish
      </button>
    );
  }
}

export default Next;
