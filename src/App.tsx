import React, { useState } from 'react'
import TypingGame from './components/TypingGame'
import Leaderboard from './components/Leaderboard'
import SignUpPage from './components/SignUp'
import { useGameStore } from './store/gameStore'

export default function App() {
  const { playerName, playerEmail } = useGameStore()
  const [signedUp, setSignedUp] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-lg font-semibold">Baskin Day — TypeRacer</div>
          <div className="text-sm text-gray-500">60s race · Top scorer wins $50</div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto p-6">
        {!signedUp ? (
          <SignUpPage onComplete={() => setSignedUp(true)} />
        ) : (
          <>
            <TypingGame />
            <Leaderboard />
          </>
        )}
      </main>

      <footer className="p-4 text-center text-sm text-gray-500">
        Built for Baskin Engineering · frontend-first MVP
      </footer>
    </div>
  )
}
