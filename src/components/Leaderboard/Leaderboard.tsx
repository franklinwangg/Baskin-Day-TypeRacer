import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import './Leaderboard.css'

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

  // useEffect(() => {
  //   fetchTop()
  //   const t = setInterval(fetchTop, 5000)
  //   return () => clearInterval(t)
  // }, [])

  useEffect(() => {
  fetchTop()

  const channel = supabase
    .channel('scores-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'scores' },
      () => {
        fetchTop() // refresh when scores update
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])


  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-header">Leaderboard (Top 10)</h2>
      <div className="leaderboard-box">
        {loading && <div className="loading-text">Loading...</div>}
        <ol className="score-list">
          {scores.map((s, i) => (
            <li
              key={s.id}
              className={`score-item ${i < 3 ? 'top-score' : ''}`}
            >
              <div className="score-name">
                {i + 1}. {s.display_name}
              </div>
              <div className="score-details">
                WPM: {s.wpm} · Accuracy: {Math.round((s.accuracy ?? 0) * 100)}%
              </div>
              <div className="score-correct">{s.correct_words}</div>
            </li>
          ))}
          {scores.length === 0 && (
            <div className="loading-text">No scores yet — be the first!</div>
          )}
        </ol>
      </div>
    </div>
  )
}
