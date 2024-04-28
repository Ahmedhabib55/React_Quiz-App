import { useReducer, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import Next from "./Next";
import Progress from "./Progress";
import FinsihedScrean from "./FinsihedScrean";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // todo stats of quiz  "loading" "error" "ready" "active" "finsihed"
  status: "loading",
  curQuestion: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFaild":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "getAnswer":
      const question = state.questions.at(state.curQuestion);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOpition
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        curQuestion: state.curQuestion + 1,
        answer: null,
      };
    case "finsihed":
      return {
        ...state,
        status: "finsihed",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      status,
      questions,
      curQuestion,
      answer,
      points,
      highScore,
      secondRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((perv, cur) => perv + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecved", payload: data }))
      .catch(dispatch({ type: "dataFaild" }));
  }, []);
  //dispatch({ type: "dataRecved", payload: data })
  //   .catch(dispatch({ type: "dataFaild" }));
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              curQuestion={curQuestion}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              curQuestion={questions[curQuestion]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondRemaining={secondRemaining} dispatch={dispatch} />

              <Next
                dispatch={dispatch}
                curQuestion={curQuestion}
                answer={answer}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finsihed" && (
          <FinsihedScrean
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
// todo increase  questions and save answer into array and you can see what is you answered and build btn perv question
