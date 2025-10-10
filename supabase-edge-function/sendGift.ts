// Example: supabase-edge-function/sendGift.ts
import { serve } from 'std/server' // adapt to your platform
import fetch from 'node-fetch'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_KEY') // service role
const SENDGRID_KEY = Deno.env.get('SENDGRID_KEY') // or Resend

async function getTopUnrewarded() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/scores?rewarded=eq.false&order=correct_words.desc&wpm.desc&limit=1`, {
    headers: {
      apikey: SUPABASE_SERVICE_KEY!,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY!}`,
    },
  })
  return await res.json()
}

async function markRewarded(id: string) {
  await fetch(`${SUPABASE_URL}/rest/v1/scores?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_SERVICE_KEY!,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY!}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rewarded: true }),
  })
}

async function sendEmail(to: string, name: string) {
  // minimal SendGrid example
  await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to, name }], subject: 'You won the Baskin Day TypeRacer $50 gift card!' }],
      from: { email: 'events@baskin.edu', name: 'Baskin Day' },
      content: [{ type: 'text/plain', value: `Congrats ${name}! You were top scorer. Reply to claim your $50 gift card.` }],
    }),
  })
}

serve(async (req) => {
  // simple example: triggered manually after event
  const top = await getTopUnrewarded()
  if (!top || top.length === 0) return new Response('No winners found', { status: 200 })
  const winner = top[0]
  if (!winner.email) {
    return new Response('Winner has no email', { status: 400 })
  }
  await sendEmail(winner.email, winner.display_name ?? 'Winner')
  await markRewarded(winner.id)
  return new Response('Email sent and marked rewarded', { status: 200 })
})
