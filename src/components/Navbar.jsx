import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Navbar() {
  const nav = useNavigate()

  async function logout(){
    await supabase.auth.signOut()
    nav("/")
    window.location.reload()
  }

  return (
    <header className="nav">
      <strong style={{fontSize:18}}>SpeakUp</strong>

      <Link to="/">Home</Link>
      <Link to="/submit">Submit</Link>
      <Link to="/admin">Dashboard</Link>

      <button className="btn" style={{marginLeft:"auto"}} onClick={logout}>
        Logout
      </button>
    </header>
  )
}
