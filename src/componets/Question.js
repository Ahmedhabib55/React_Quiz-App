import Option from "./Option";

export default function Question({ curQuestion, dispatch, answer }) {
  return (
    <div className="question">
      <h4>{curQuestion.question}</h4>
      <div className="options">
        <Option curQuestion={curQuestion} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  );
}

// className={`btn btn-option ${index === answer ? "answer" : ""} ${
//   hasAnswered
//     ? index === question.correctOption
//       ? "correct"
//       : "wrong"
//     : ""
// }`}
// key={option}
// disabled={hasAnswered}

// ! ${correctOption === answer ? "correct" : "wrong"} this i was do that but wrong because wrong case work in first
