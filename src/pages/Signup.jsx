import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Signup() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  async function signup(e){
    e.preventDefault()

    const { error } = await supabase.auth.signUp({ email,password })
    if(error) return alert(error.message)

    alert("Account created. Login now.")
    window.location.href="/login"
  }

  return (
    <div className="center">
      <form className="card" onSubmit={signup}>
        <h2>Sign Up</h2>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button className="btn primary">Create</button>
      </form>
    </div>
  )
}
