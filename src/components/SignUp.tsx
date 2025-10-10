import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

// Fix for TypeScript form typing
const MotionForm = motion.form as React.ComponentType<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > & {
    initial?: any
    animate?: any
    transition?: any
  }
>

export default function SignUpPage({ onComplete }: { onComplete: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const setPlayerInfo = useGameStore((s) => s.setPlayerInfo)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required')
      return
    }
    setPlayerInfo(name.trim(), email.trim())
    onComplete()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <MotionForm
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
    <motion.h2
      className="text-2xl font-semibold text-gray-800 mb-6 text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      Sign Up to Play
    </motion.h2>

        {error && (
          <motion.div
            className="text-red-500 bg-red-50 border border-red-200 p-2 rounded mb-3 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Display Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
          />
        </motion.div>

        <motion.div
          className="mb-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          Continue
        </motion.button>
      </MotionForm>
    </div>
  )
}
