import React, { useEffect, useRef, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { supabase } from "../../lib/supabase";
import ResultModal from "../ResultModal/ResultModal";
import "./TypingGame.css";

const DEFAULT_WORDS = `apple orange banana keyboard mouse monitor desk chair code compile react vite typescript function variable loop conditional string number boolean array object server client network latency`.split(
  " "
);

function calcWpm(correctWords: number, elapsedSeconds: number) {
  if (elapsedSeconds <= 0) return 0;
  return Math.round((correctWords / elapsedSeconds) * 60);
}

export default function TypingGame() {
  const {
    words,
    setWords,
    typed,
    submitToken,
    currentIndex,
    correctCount,
    totalSubmitted,
    start,
    running,
    reset,
    tick,
    playerName,
    playerEmail,
  } = useGameStore(); // ✅ get player info from store

  const [timeLeft, setTimeLeft] = useState(60);
  const [showResult, setShowResult] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Shuffle and set words at start
  useEffect(() => {
    setWords(shuffle([...DEFAULT_WORDS, ...DEFAULT_WORDS]));
  }, [setWords]);



  useEffect(() => {
    if (running) {
      inputRef.current?.focus();
      const startTs = Date.now();

      intervalRef.current = window.setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTs) / 1000);
        setTimeLeft(Math.max(0, 60 - elapsedSeconds));
        tick(0);

        // 🟡 Access currentIndex and words dynamically each tick
        const { currentIndex: idx, words: wordList } = useGameStore.getState();
        const timeUp = elapsedSeconds >= 60;
        const allWordsTyped = idx >= wordList.length;

        if (timeUp || allWordsTyped) {
          clearInterval(intervalRef.current!);
          setShowResult(true);
        }
      }, 200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }
}, [running, tick]);





  // Shuffle helper
  function shuffle<T>(arr: T[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function handleStart() {
    reset();
    start();
    setShowResult(false);
    setTimeLeft(60);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!running) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const current = words[currentIndex] ?? "";
      const token = typed.trim();
      submitToken(token === current);
    }
  }

  async function submitScore() {
    if (correctCount > 200) {
      alert("Suspicious score — please try again.");
      return;
    }

    try {
      const { error } = await supabase.from("scores").insert([
        {
          display_name: playerName || "Anonymous",
          email: playerEmail || null,
          correct_words: correctCount,
          total_tokens: totalSubmitted,
          wpm: calcWpm(
            correctCount,
            60 - timeLeft === 0 ? 60 : 60 - timeLeft
          ),
          accuracy:
            totalSubmitted === 0 ? 0 : correctCount / totalSubmitted,
        },
      ]);
      if (error) throw error;
      setShowResult(false);
      alert("Score submitted! Check leaderboard.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit score.");
    }
  }

  return (
    <div className="typing-game-container">
      <div className="game-header">
        <h1>Baskin Day TypeRacer</h1>
        <div className="header-right">
          <div className="time-left">
            <div className="time-label">Time left</div>
            <div className="time-value">{timeLeft}s</div>
          </div>
        </div>
      </div>

      <div className="game-box">
        <div className="instructions">
          Type the words shown. Press Space or Enter to submit each word.
        </div>

        <div className="words-box">
          {words.slice(currentIndex, currentIndex + 30).map((w, i) => {
            const idx = currentIndex + i;
            const isCurrent = idx === currentIndex;
            return (
              <span key={idx} className={isCurrent ? "word-current" : "word"}>
                {w}
              </span>
            );
          })}
        </div>

        <input
          ref={inputRef}
          value={typed}
          onChange={(e) =>
            useGameStore.getState().setTyped(e.target.value)
          }
          onKeyDown={onKeyDown}
          placeholder="Start typing..."
          className="typing-input-2"
          disabled={!running}
          aria-label="Typing input"
        />

        <div className="stats">
          <div>
            <div>
              Correct: <span>{correctCount}</span>
            </div>
            <div>
              Submitted: <span>{totalSubmitted}</span>
            </div>
          </div>
          <div className="wpm-box">
            <div>WPM</div>
            <div className="wpm-value">
              {calcWpm(
                correctCount,
                60 - timeLeft === 0 ? 60 : 60 - timeLeft
              )}
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="start-btn" onClick={handleStart}>
            Start Race
          </button>
          <button
            className="reset-btn"
            onClick={() => {
              reset();
              setShowResult(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <ResultModal
        open={showResult}
        onClose={() => setShowResult(false)}
        correctCount={correctCount}
        totalSubmitted={totalSubmitted}
        wpm={calcWpm(correctCount, 60 - timeLeft === 0 ? 60 : 60 - timeLeft)}
        accuracy={totalSubmitted === 0 ? 0 : correctCount / totalSubmitted}
        playerName={playerName}
        playerEmail={playerEmail}
        onSubmit={submitScore}
      />
    </div>
  );
}
