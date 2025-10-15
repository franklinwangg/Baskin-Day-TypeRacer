import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import { useNavigate } from "react-router-dom";
import "../SignUp/SignUp.css";

const MotionForm = motion.form as React.ComponentType<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > & {
    initial?: any;
    animate?: any;
    transition?: any;
  }
>;

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const setPlayerInfo = useGameStore((s) => s.setPlayerInfo);
    const navigate = useNavigate();

  function onComplete() {
    navigate("/game");
    return;
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }
    setPlayerInfo(name.trim(), email.trim());
    onComplete();
  }



  return (
    <div className="signup-container">
      <MotionForm
        onSubmit={handleSubmit}
        className="signup-form"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="signup-title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Sign Up to Play
        </motion.h2>

        {error && (
          <motion.div
            className="signup-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <motion.div
          className="input-group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Display Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
          />
        </motion.div>

        <motion.div
          className="input-group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          type="submit"
          className="signup-button"
        >
          Continue
        </motion.button>
      </MotionForm>
    </div>
  );
}
