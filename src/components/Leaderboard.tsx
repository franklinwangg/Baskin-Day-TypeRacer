import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type ScoreRow = {
  id: string
  display_name: string
  correct_words: number
  wpm: number
  accuracy: number
  inserted_at: string
}

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreRow[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchTop() {
    setLoading(true)
    const { data, error } = await supabase
      .from('scores')
      .select('id, display_name, correct_words, wpm, accuracy, inserted_at')
      .order('correct_words', { ascending: false })
      .order('wpm', { ascending: false })
      .limit(10)
    if (error) {
      console.error(error)
    } else {
      setScores(data as ScoreRow[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTop()
    // optional: setInterval to poll
    const t = setInterval(fetchTop, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Leaderboard (Top 10)</h2>
      <div className="bg-white p-4 rounded shadow">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
        <ol className="space-y-2">
          {scores.map((s, i) => (
            <li key={s.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{i + 1}. {s.display_name}</div>
                <div className="text-sm text-gray-500">WPM: {s.wpm} · Accuracy: {Math.round((s.accuracy ?? 0) * 100)}%</div>
              </div>
              <div className="font-mono text-lg">{s.correct_words}</div>
            </li>
          ))}
          {scores.length === 0 && <div className="text-sm text-gray-500">No scores yet — be the first!</div>}
        </ol>
      </div>
    </div>
  )
}
