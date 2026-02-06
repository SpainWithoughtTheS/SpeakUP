import { useState } from "react"
import { supabase } from "../lib/supabase"

const ADMIN_KEY = "739482910384756"

export default function AdminLogin() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [key,setKey]=useState("")

  async function login(e){
    e.preventDefault()

    if(key !== ADMIN_KEY) return alert("Invalid admin key")

    const { error } = await supabase.auth.signInWithPassword({ email,password })
    if(error) return alert(error.message)

    window.location.href="/admin"
  }

  return (
    <div className="center">
      <form className="card" onSubmit={login}>
        <h2>Admin Login</h2>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <input placeholder="Admin key" onChange={e=>setKey(e.target.value)} />
        <button className="btn primary">Login</button>
      </form>
    </div>
  )
}
