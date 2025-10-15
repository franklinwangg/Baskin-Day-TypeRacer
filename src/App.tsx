// import React, { useState } from "react";
// import "./App.css";
// import TypingGame from "./components/TypingGame/TypingGame";
// import Leaderboard from "./components/Leaderboard/Leaderboard";
// import SignUpPage from "./components/SignUp/SignUp";
// import Background from "./components/Background/Background";
// import { useGameStore } from "./store/gameStore";

// export default function App() {
//   const { playerName, playerEmail } = useGameStore();
//   const [signedUp, setSignedUp] = useState(false);
//   const [activePage, setActivePage] = useState<"game" | "leaderboard">("game");

//   return (
//     <div className="app-container">
//             <Background />
//       <header className="app-header">
//         <div className="header-content">
//           <div className="header-title">Baskin Day — TypeRacer</div>


// {signedUp ? (
//   <div className="header-buttons">
//     <button className="header-button" onClick={() => setActivePage("game")}>Race</button>
//     <button className="header-button" onClick={() => setActivePage("leaderboard")}>Leaderboard</button>
//     <button className="header-button" onClick={() => console.log("Profile clicked")}>Profile</button>
//     <button className="header-button" onClick={() => console.log("Settings clicked")}>Settings</button>
//   </div>
// ) : (
//   <div className="header-subtitle">
//     60s race · Top scorer wins $50
//   </div>
// )}




//         </div>
//       </header>

//       <main className="app-main">
//         {!signedUp ? (
//           <SignUpPage onComplete={() => setSignedUp(true)} />
//         ) : (
//           <>
//             {activePage === "game" && <TypingGame />}
//             {activePage === "leaderboard" && <Leaderboard />}
//           </>
//         )}
//       </main>

//       <footer className="app-footer">
//         Built for Baskin Engineering · frontend-first MVP
//       </footer>
//     </div>
//   );
// }







import React from "react";
import "./App.css";
import TypingGame from "./components/TypingGame/TypingGame";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import SignUpPage from "./components/SignUp/SignUp";
import Background from "./components/Background/Background";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="app-container">
      <Background />
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">Baskin Day — TypeRacer</div>
          <nav className="header-buttons">
            <Link className="header-button" to="/game">
              Race
            </Link>
            <Link className="header-button" to="/leaderboard">
              Leaderboard
            </Link>
            <Link className="header-button" to="/signup">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          {/* <Route path="/signup" element={<SignUpPage onComplete={() => {navigate to typing game}}/>} /> */}
          <Route path="/game" element={<TypingGame />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/signup" element={<SignUpPage />} />

        </Routes>
      </main>

      <footer className="app-footer">
        Built for Baskin Engineering · frontend-first MVP
      </footer>
    </div>
  );
}
