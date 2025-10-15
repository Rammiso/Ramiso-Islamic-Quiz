import Header from "./Components/UI Components/Header/Header";
import Main from "./Components/Main/main";
import Loader from "./Components/Loader/Loader";
import Error from "./Components/Error/Error";
import StartScreen from "./Components/UI Components/StartScreen";
import Question from "./Components/QuestionComponent/Question";
import Progress from "./Components/Progress/Progress";
import Finished from "./Components/Finished/Finished";
import { motion } from "framer-motion";
import Footer from "./Components/Footer/footer";
import Timer from "./Components/Timer/Timer";
import Button from "./Components/Button/Button";
import { useEffect, useReducer } from "react";

const SEC_REMAINING = 30;
const storedHighscore = Number(localStorage.getItem("highscore")) || 0;
const initialState = {
  questions: [],

  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: storedHighscore,
  secondsRemaining: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_REMAINING,
      };
    case "nextQuestion":
      return {
        ...state,
        index:
          state.index < state.questions.length - 1
            ? state.index + 1
            : state.index,
        answer: null,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.answerIndex
            ? state.points + 1
            : state.points,
      };
    case "haveFinished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore > state.points ? state.highscore : state.points,
      };
    case "retake":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        highscore: state.highscore,
      };
    case "remainingTime":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Something is wrong!");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await fetch("/questions.json");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestion();
  }, []);

  useEffect(() => {
    localStorage.setItem("highscore", state.highscore);
  }, [state.highscore]);

  let total = numQuestions - 1;
  return (
    <div className="App">
      <Header />

      <Main>
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              questions={questions}
              index={index}
              points={points}
              answer={answer}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Question
                questions={questions[index]}
                dispatch={dispatch}
                answer={answer}
                points={points}
                questionIndex={index}
                numQuestions={numQuestions}
                secondsRemaining={secondsRemaining}
              />
            </motion.div>
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />

              <Button
                dispatchType={"nextQuestion"}
                dispatch={dispatch}
                answer={answer}
                questionIndex={index < total}
              >
                Next
              </Button>

              <Button
                dispatchType={"haveFinished"}
                dispatch={dispatch}
                answer={answer}
                questionIndex={index === total}
              >
                Finished
              </Button>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            numQuestions={numQuestions}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
