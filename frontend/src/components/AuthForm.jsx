'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthForm({ type = 'login' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return alert('Fill in all fields!')

    if (type === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return alert(error.message)
      await router.push('/')
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) return alert(error.message)
      alert('Check your email for the confirmation link.')
      // Don't push yet — user needs to confirm first
    }
  }

  const handleOAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) alert(error.message)
  }

  const handleForgotPassword = async () => {
    if (!email) return alert('Enter your email first!')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    })
    if (error) alert(error.message)
    else alert('Check your email for the password reset link.')
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">{type === 'login' ? 'Sign In' : 'Sign Up'}</h1>

      <button onClick={handleOAuth} className="w-full mb-4 py-2 border rounded">
        Continue with Google
      </button>

      <div className="text-center mb-4">Or use email</div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button className="bg-black text-white p-2 rounded" type="submit">
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      {type === 'login' && (
        <>
          <button onClick={handleForgotPassword} className="mt-4 text-sm text-blue-600 underline">
            Forgot password?
          </button>
          <div className="mt-4 text-sm">
            Not registered? <a href="/signup" className="text-blue-600 underline">Create account</a>
          </div>
        </>
      )}
    </div>
  )
}
