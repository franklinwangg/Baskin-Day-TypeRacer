import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore"; // assuming this stores player info
import "./ResultModal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  correctCount: number;
  totalSubmitted: number;
  wpm: number;
  accuracy: number;
  playerName: string;
  playerEmail: string;
};

const ResultModal: React.FC<Props> = ({
  open,
  onClose,
  correctCount,
  totalSubmitted,
  wpm,
  accuracy,
  playerName,
  playerEmail,
}) => {
  const navigate = useNavigate();
  const { reset, setPlayerInfo } = useGameStore();

  if (!open) return null;

  // Handle closing: wipe player info and redirect
  const handleClose = () => {
    reset(); // clear game state
    setPlayerInfo("", ""); // clear player info
    onClose();
    navigate("/signup");
  };

  // Handle view leaderboard button
  const handleViewLeaderboard = () => {
    console.log("Viewing leaderboard");
    navigate("/leaderboard");
  };

  return (
    <div className="modal-backdrop">
      <motion.div
        className="result-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="modal-title">🎉 Round Results 🎉</h3>

        <div className="modal-content">
          <p>
            Correct Words: <span>{correctCount}</span>
          </p>
          <p>
            Submitted Tokens: <span>{totalSubmitted}</span>
          </p>
          <p>
            WPM: <span>{wpm}</span>
          </p>
          <p>
            Accuracy: <span>{Math.round(accuracy * 100)}%</span>
          </p>

          <div className="modal-player-info">
            <p>Name: {playerName || "Anonymous"}</p>
            <p>Email: {playerEmail || "—"}</p>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="modal-btn close" onClick={handleClose}>
            Close
          </button>
          <button className="modal-btn submit" onClick={handleViewLeaderboard}>
            View Leaderboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultModal;
