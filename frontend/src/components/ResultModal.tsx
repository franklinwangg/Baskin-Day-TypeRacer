import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  open: boolean
  onClose: () => void
  correctCount: number
  totalSubmitted: number
  wpm: number
  accuracy: number
  playerName: string
  playerEmail: string
  onSubmit: () => void
}

export default function ResultModal({
  open,
  onClose,
  correctCount,
  totalSubmitted,
  wpm,
  accuracy,
  playerName,
  playerEmail,
  onSubmit,
}: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-2">Round results</h3>
        <div className="space-y-2">
          <div>Correct words: <strong>{correctCount}</strong></div>
          <div>Submitted tokens: <strong>{totalSubmitted}</strong></div>
          <div>WPM: <strong>{wpm}</strong></div>
          <div>Accuracy: <strong>{Math.round(accuracy * 100)}%</strong></div>
          <div className="mt-3 text-sm text-gray-600">Name: {playerName || 'Anonymous'}</div>
          <div className="text-sm text-gray-600">Email: {playerEmail || '—'}</div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 border rounded">Close</button>
          <button onClick={onSubmit} className="px-3 py-2 bg-blue-600 text-white rounded">Submit score</button>
        </div>
      </motion.div>
    </div>
  )
}
