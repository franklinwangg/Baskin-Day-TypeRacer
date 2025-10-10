import create from 'zustand'



type GameState = {
  words: string[]
  currentIndex: number
  typed: string
  correctCount: number
  totalSubmitted: number
  startTime: number | null
  elapsed: number
  running: boolean
  playerName: string
  playerEmail: string
  setPlayerInfo: (name: string, email: string) => void
  reset: () => void
  setWords: (w: string[]) => void
  setTyped: (t: string) => void
  submitToken: (isCorrect: boolean) => void
  start: () => void
  tick: (ms: number) => void
}

export const useGameStore = create<GameState>((set) => ({
  words: [],
  currentIndex: 0,
  typed: '',
  correctCount: 0,
  totalSubmitted: 0,
  startTime: null,
  elapsed: 0,
  running: false,
  playerName: '',
  playerEmail: '',
  setPlayerInfo: (name, email) => set({ playerName: name, playerEmail: email }),
  reset: () =>
    set({
      currentIndex: 0,
      typed: '',
      correctCount: 0,
      totalSubmitted: 0,
      startTime: null,
      elapsed: 0,
    }),
  setWords: (w) => set({ words: w }),
  setTyped: (t) => set({ typed: t }),
  submitToken: (isCorrect) =>
    set((s) => ({
      currentIndex: s.currentIndex + 1,
      typed: '',
      correctCount: isCorrect ? s.correctCount + 1 : s.correctCount,
      totalSubmitted: s.totalSubmitted + 1,
    })),
  start: () => set({ running: true, startTime: Date.now(), elapsed: 0 }),
  tick: (ms) => set((s) => ({ elapsed: (Date.now() - (s.startTime ?? Date.now())) })),
}))



// type GameState = {
//   words: string[]
//   currentIndex: number
//   typed: string
//   correctCount: number
//   totalSubmitted: number
//   startTime: number | null
//   elapsed: number
//   running: boolean
//   reset: () => void
//   setWords: (w: string[]) => void
//   setTyped: (t: string) => void
//   submitToken: (isCorrect: boolean) => void
//   start: () => void
//   tick: (ms: number) => void
// }

// export const useGameStore = create<GameState>((set) => ({
//   words: [],
//   currentIndex: 0,
//   typed: '',
//   correctCount: 0,
//   totalSubmitted: 0,
//   startTime: null,
//   elapsed: 0,
//   running: false,
//   reset: () =>
//     set({
//       currentIndex: 0,
//       typed: '',
//       correctCount: 0,
//       totalSubmitted: 0,
//       startTime: null,
//       elapsed: 0,
//       running: false,
//     }),
//   setWords: (w) => set({ words: w }),
//   setTyped: (t) => set({ typed: t }),
//   submitToken: (isCorrect) =>
//     set((s) => ({
//       currentIndex: s.currentIndex + 1,
//       typed: '',
//       correctCount: isCorrect ? s.correctCount + 1 : s.correctCount,
//       totalSubmitted: s.totalSubmitted + 1,
//     })),
//   start: () => set({ running: true, startTime: Date.now(), elapsed: 0 }),
//   tick: (ms) => set((s) => ({ elapsed: (Date.now() - (s.startTime ?? Date.now())) })),
// }))
