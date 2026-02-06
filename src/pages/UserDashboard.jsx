import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function UserDashboard() {
  const [reports,setReports] = useState([])

  useEffect(()=>{
    load()
  },[])

  async function load(){
    const { data:{ user } } = await supabase.auth.getUser()

    const { data } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", user.id)

    setReports(data || [])
  }

  return (
    <div className="container">
      <h2>My Reports</h2>

      {reports.map(r=>(
        <div key={r.id} className="card">
          <b>{r.category}</b>
          <p>{r.description}</p>
          <small>{r.status}</small>
        </div>
      ))}
    </div>
  )
}
