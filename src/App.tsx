import React, { useState } from "react";
import "./App.css";
import TypingGame from "./components/TypingGame/TypingGame";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import SignUpPage from "./components/SignUp/SignUp";
import { useGameStore } from "./store/gameStore";

export default function App() {
  const { playerName, playerEmail } = useGameStore();
  const [signedUp, setSignedUp] = useState(false);
  const [activePage, setActivePage] = useState<"game" | "leaderboard">("game");

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">Baskin Day — TypeRacer</div>

          {/* {signedUp ? (
            <div className="header-buttons">
              <button onClick={() => setActivePage("leaderboard")}>
                Leaderboard
              </button>

            <button
              className="leaderboard-button"
              onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            >
              Leaderboard
            </button>

              <button onClick={() => console.log("Profile clicked")}>
                Profile
              </button>
              <button onClick={() => console.log("Settings clicked")}>
                Settings
              </button>
            </div>
          ) : (
            <div className="header-subtitle">
              60s race · Top scorer wins $50
            </div>
          )} */}

{/* {signedUp ? (
  <div className="header-buttons">
    <button onClick={() => setActivePage("game")}>Race</button>

            <button
              className="header-button"
              onClick={() => setActivePage("leaderboard")}
            >
              Leaderboard
            </button>

    <button className="header-button" onClick={() => console.log("Profile clicked")}>Profile</button>
    <button className="header-button" onClick={() => console.log("Settings clicked")}>Settings</button>
  </div>
) : (
  <div className="header-subtitle">
    60s race · Top scorer wins $50
  </div>
)} */}

{signedUp ? (
  <div className="header-buttons">
    <button className="header-button" onClick={() => setActivePage("game")}>Race</button>
    <button className="header-button" onClick={() => setActivePage("leaderboard")}>Leaderboard</button>
    <button className="header-button" onClick={() => console.log("Profile clicked")}>Profile</button>
    <button className="header-button" onClick={() => console.log("Settings clicked")}>Settings</button>
  </div>
) : (
  <div className="header-subtitle">
    60s race · Top scorer wins $50
  </div>
)}




        </div>
      </header>

      <main className="app-main">
        {!signedUp ? (
          <SignUpPage onComplete={() => setSignedUp(true)} />
        ) : (
          <>
            {activePage === "game" && <TypingGame />}
            {activePage === "leaderboard" && <Leaderboard />}
          </>
        )}
      </main>

      <footer className="app-footer">
        Built for Baskin Engineering · frontend-first MVP
      </footer>
    </div>
  );
}
