import React from 'react'
import TypingGame from './components/TypingGame'
import Leaderboard from './components/Leaderboard'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-lg font-semibold">Baskin Day — TypeRacer</div>
          <div className="text-sm text-gray-500">60s race · Top scorer wins $50</div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto p-6">
        <TypingGame />
        <Leaderboard />
      </main>

      <footer className="p-4 text-center text-sm text-gray-500">
        Built for Baskin Engineering · frontend-first MVP
      </footer>
    </div>
  )
}
