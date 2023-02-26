import { useEffect, useMemo, useState } from "react";
import QuizService from "./API/QuizService";
import "./App.css";
import Entry from "./components/Entry";
import Quiz from "./components/Quiz";
import { useFetching } from "./hooks/useFetching";
import LocalStorage from "./utils/localStorage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [myResults, setMyResults] = useState({
    lastGames: [],
    totalGames: 0,
    totalAnswers: 0,
    totalCorrect: 0,
    totalWrong: 0,
  });
  const [quiz, setQuiz] = useState([]);
  const [quizSettings, setQuizSettings] = useState({
    numOfQuestions: 5,
    category: "",
    difficulty: "",
    type: "",
    isTimerDisabled: false,
  });
  const [fetchQuiz, isLoading, error, setError] = useFetching(
    async settings => {
      const data = await QuizService.getQuiz(settings);
      setQuiz(data.results);
    }
  );

  // set myResult from the local storage
  useMemo(() => {
    if (LocalStorage.get("myResults")) {
      setMyResults(LocalStorage.get("myResults"));
    }
  }, []);

  // save to local storage when results changes
  useEffect(() => {
    LocalStorage.set("myResults", myResults);
  }, [myResults]);

  // reset quiz and settings
  function resetQuiz() {
    setQuiz([]);
    setQuizSettings({
      numOfQuestions: 5,
      category: "",
      difficulty: "",
      type: "",
      isTimerDisabled: false,
    });
  }

  return (
    <main className={isDarkMode ? "darkmode" : ""}>
      {quiz.length > 0 ? (
        <div className="container">
          <Quiz
            setIsDarkMode={setIsDarkMode}
            quizSettings={quizSettings}
            quiz={quiz}
            setQuiz={setQuiz}
            fetchQuiz={fetchQuiz}
            resetQuiz={resetQuiz}
            setError={setError}
            myResults={myResults}
            setMyResults={setMyResults}
          />
        </div>
      ) : (
        <Entry
          setIsDarkMode={setIsDarkMode}
          quizSettings={quizSettings}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          setQuizSettings={setQuizSettings}
          fetchQuiz={fetchQuiz}
          resetQuiz={resetQuiz}
          error={error}
          myResults={myResults}
          setMyResults={setMyResults}
        />
      )}
    </main>
  );
}

export default App;
