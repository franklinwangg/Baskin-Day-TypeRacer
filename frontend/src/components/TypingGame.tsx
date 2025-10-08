import React, { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import ResultModal from './ResultModal'

const DEFAULT_WORDS = `apple orange banana keyboard mouse monitor desk chair code compile react vite typescript function variable loop conditional string number boolean array object server client network latency`.split(
  ' ',
)

function calcWpm(correctWords: number, elapsedSeconds: number) {
  if (elapsedSeconds <= 0) return 0
  return Math.round((correctWords / elapsedSeconds) * 60)
}

export default function TypingGame() {
  const {
    words,
    setWords,
    typed,
    setTyped,
    submitToken,
    currentIndex,
    correctCount,
    totalSubmitted,
    start,
    running,
    elapsed,
    reset,
    tick,
  } = useGameStore()
  const [timeLeft, setTimeLeft] = useState(60)
  const [showResult, setShowResult] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerEmail, setPlayerEmail] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    setWords(shuffle([...DEFAULT_WORDS, ...DEFAULT_WORDS])) // simple pool
  }, [setWords])

  useEffect(() => {
    if (running) {
      inputRef.current?.focus()
      const startTs = Date.now()
      intervalRef.current = window.setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTs) / 1000)
        setTimeLeft(Math.max(0, 60 - elapsedSeconds))
        tick(0)
        if (elapsedSeconds >= 60) {
          // stop
          clearInterval(intervalRef.current!)
          setShowResult(true)
        }
      }, 200)
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [running, tick])

  function shuffle<T>(arr: T[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  function handleStart() {
    reset()
    start()
    setShowResult(false)
    setTimeLeft(60)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!running) return
    if (e.key === ' ') {
      e.preventDefault()
      const current = words[currentIndex] ?? ''
      const token = typed.trim()
      const isCorrect = token === current
      submitToken(isCorrect)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const current = words[currentIndex] ?? ''
      const token = typed.trim()
      const isCorrect = token === current
      submitToken(isCorrect)
    }
  }

  async function submitScore() {
    // basic client-side anti-cheat
    if (correctCount > 200) {
      alert('Suspicious score — please try again.')
      return
    }

    // write to Supabase
    try {
      const { error } = await supabase.from('scores').insert([
        {
          display_name: playerName || 'Anonymous',
          email: playerEmail,
          correct_words: correctCount,
          total_tokens: totalSubmitted,
          wpm: calcWpm(correctCount, 60 - timeLeft === 0 ? 60 : 60 - timeLeft),
          accuracy: totalSubmitted === 0 ? 0 : correctCount / totalSubmitted,
        },
      ])
      if (error) throw error
      setShowResult(false)
      alert('Score submitted! Check leaderboard.')
    } catch (err) {
      console.error(err)
      alert('Failed to submit score.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Baskin Day TypeRacer</h1>
        <div className="text-right">
          <div className="text-sm text-gray-600">Time left</div>
          <div className="text-xl font-mono">{timeLeft}s</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="mb-4">
          <div className="text-sm text-gray-500">Type the words shown. Press Space or Enter to submit each word.</div>
        </div>

        <div className="min-h-[120px] p-4 border rounded mb-4">
          <div className="flex flex-wrap gap-2">
            {words.slice(currentIndex, currentIndex + 30).map((w, i) => {
              const idx = currentIndex + i
              const isCurrent = idx === currentIndex
              return (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded ${isCurrent ? 'bg-blue-100 font-semibold' : 'text-gray-700'}`}
                >
                  {w}
                </span>
              )
            })}
          </div>
        </div>

        <input
          ref={inputRef}
          value={typed}
          onChange={(e) => useGameStore.getState().setTyped(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Start typing..."
          className="w-full p-3 border rounded focus:outline-none focus:ring"
          disabled={!running}
          aria-label="Typing input"
        />

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm">Correct: <span className="font-mono">{correctCount}</span></div>
            <div className="text-sm">Submitted: <span className="font-mono">{totalSubmitted}</span></div>
          </div>
          <div className="text-right">
            <div className="text-sm">WPM</div>
            <div className="text-2xl font-mono">{calcWpm(correctCount, 60 - timeLeft === 0 ? 60 : 60 - timeLeft)}</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            Start Race
          </button>
          <button
            onClick={() => {
              reset()
              setShowResult(false)
            }}
            className="px-4 py-2 border rounded"
          >
            Reset
          </button>
          <div className="ml-auto text-sm text-gray-500 self-center">Tip: press Space to submit words</div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Submit your score</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            className="p-2 border rounded col-span-1 md:col-span-1"
            placeholder="Display name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            className="p-2 border rounded col-span-1 md:col-span-1"
            placeholder="Email (for gift card)"
            value={playerEmail}
            onChange={(e) => setPlayerEmail(e.target.value)}
          />
          <div className="col-span-1 md:col-span-1 flex items-center">
            <button
              onClick={() => setShowResult(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Preview Result
            </button>
            <div className="ml-3 text-sm text-gray-500">You must preview to submit after a race.</div>
          </div>
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
        onSubmit={() => submitScore()}
      />
    </div>
  )
}
