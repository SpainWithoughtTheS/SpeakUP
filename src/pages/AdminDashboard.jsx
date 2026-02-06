import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminDashboard() {
  const [reports,setReports] = useState([])

  useEffect(()=>{
    load()

    const channel = supabase
      .channel("live")
      .on("postgres_changes",{event:"*",schema:"public",table:"reports"}, load)
      .subscribe()

    return ()=> supabase.removeChannel(channel)
  },[])

  async function load(){
    const { data } = await supabase.from("reports").select("*")
    setReports(data || [])
  }

  const chartData = Object.entries(
    reports.reduce((a,r)=>{
      a[r.category]=(a[r.category]||0)+1
      return a
    },{})
  ).map(([name,value])=>({name,value}))

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div className="card" style={{height:300}}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="value" fill="#7c5cff" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {reports.map(r=>(
        <div key={r.id} className="card">
          {r.category} — {r.status}
        </div>
      ))}
    </div>
  )
}
