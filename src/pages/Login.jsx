import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function login(e){
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({ email,password })
    if(error) return alert(error.message)

    window.location.href="/dashboard"
  }

  return (
    <div className="center">
      <form className="card" onSubmit={login}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button className="btn primary">Login</button>
      </form>
    </div>
  )
}
