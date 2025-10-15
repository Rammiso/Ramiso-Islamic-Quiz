import { useEffect } from "react";
import "./timer.css";
export default function Timer({ secondsRemaining, dispatch }) {
  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: "remainingTime" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  let minutes = Math.floor(secondsRemaining / 60);
  let seconds = secondsRemaining % 60;
  return (
    <div className="timer">
      <strong>
        {minutes < 10 && "0"}
        {minutes}
        <strong>:</strong>
        {seconds < 10 && "0"}
        {seconds}
      </strong>
    </div>
  );
}
