import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Papa from "papaparse"

export default function Dashboard() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ category: "", status: "" })

  // 🔹 fetch reports
  async function load() {
    setLoading(true)

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) console.error(error)
    setReports(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  // 🔹 safe image url (FIXES CORB)
  function getImage(path) {
    if (!path) return null
    return supabase.storage.from("photos").getPublicUrl(path).data.publicUrl
  }

  // 🔹 resolve
  async function resolve(id) {
    await supabase.from("reports")
      .update({ status: "resolved" })
      .eq("id", id)
    load()
  }

  // 🔹 delete
  async function remove(id) {
    if (!confirm("Delete this report?")) return
    await supabase.from("reports").delete().eq("id", id)
    load()
  }

  // 🔹 export CSV
  function exportCSV() {
    const csv = Papa.unparse(reports)
    const blob = new Blob([csv])
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "reports.csv"
    a.click()
  }

  // 🔹 filters
  const visible = reports.filter(r => {
    if (filter.category && r.category !== filter.category) return false
    if (filter.status && r.status !== filter.status) return false
    return true
  })

  // 🔹 stats
  const total = reports.length
  const pending = reports.filter(r => r.status === "pending").length
  const resolved = reports.filter(r => r.status === "resolved").length

  return (
    <div className="container" style={{ paddingTop: 40 }}>

      <h2 style={{ marginBottom: 30 }}>Admin Dashboard</h2>

      {/* ===== STATS ===== */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 20,
        marginBottom: 30
      }}>
        <Stat title="Total" value={total} />
        <Stat title="Pending" value={pending} />
        <Stat title="Resolved" value={resolved} />
      </div>

      {/* ===== FILTERS ===== */}
      <div className="card" style={{ marginBottom: 25 }}>
        <div style={{ display: "flex", gap: 15 }}>

          <select onChange={e => setFilter({ ...filter, category: e.target.value })}>
            <option value="">All Categories</option>
            {[...new Set(reports.map(r => r.category))].map(c =>
              <option key={c}>{c}</option>
            )}
          </select>

          <select onChange={e => setFilter({ ...filter, status: e.target.value })}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>

          <button className="btn primary" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
      </div>

      {/* ===== REPORTS LIST ===== */}
      {loading && <p>Loading...</p>}

      {visible.map(r => (
        <div key={r.id} className="card report-card">

          <div style={{ flex: 1 }}>
            <h3>{r.category}</h3>
            <p style={{ opacity: 0.7 }}>{r.description}</p>
            <small>{r.location}</small>
          </div>

          {r.photo_url && (
            <img
              src={getImage(r.photo_url)}
              className="preview"
              alt=""
            />
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="btn"
              onClick={() => resolve(r.id)}
              style={{ background: "#16a34a" }}
            >
              Resolve
            </button>

            <button
              className="btn"
              onClick={() => remove(r.id)}
              style={{ background: "#dc2626" }}
            >
              Delete
            </button>
          </div>

        </div>
      ))}

    </div>
  )
}


// ===== small stat card component =====
function Stat({ title, value }) {
  return (
    <div className="card"
      style={{
        textAlign: "center",
        fontSize: 18,
        fontWeight: 700
      }}>
      {title}
      <div style={{ fontSize: 32, marginTop: 10 }}>{value}</div>
    </div>
  )
}
