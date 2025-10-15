import React from "react";
import { motion } from "framer-motion";
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
  onSubmit: () => void;
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
  onSubmit,
}) => {
  if (!open) return null;

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
          <button className="modal-btn close" onClick={onClose}>
            Close
          </button>
          <button className="modal-btn submit" onClick={onSubmit}>
            Submit Score
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultModal;
