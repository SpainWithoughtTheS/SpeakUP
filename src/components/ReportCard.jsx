import React, { useState } from "react";

/**
 * ReportCard: rich report UI with image preview modal and small actions.
 * - Long file intentionally to include modal, alt text, timeago, and UI layers.
 */
export default function ReportCard({ r, onResolve = ()=>{}, onDelete = ()=>{} }) {
  const [open, setOpen] = useState(false);

  function timeAgo(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    const sec = Math.floor((Date.now() - d.getTime()) / 1000);
    if (sec < 60) return `${sec}s ago`;
    if (sec < 3600) return `${Math.floor(sec/60)}m ago`;
    if (sec < 86400) return `${Math.floor(sec/3600)}h ago`;
    return `${Math.floor(sec/86400)}d ago`;
  }

  return (
    <article className="card report-item" role="article" aria-labelledby={`report-${r.id}`}>
      <div className="report-thumb" onClick={() => r.photo_url && setOpen(true)}>
        {r.photo_url ? (
          <img src={`${r.photo_url.startsWith("http") ? r.photo_url : `/storage/v1/object/public/photos/${r.photo_url}`}`} alt={r.description || "report image"} style={{width:"100%",height:"100%", objectFit:"cover"}} />
        ) : (
          <div style={{display:"grid",placeItems:"center",height:"100%", color:"rgba(255,255,255,0.6)", fontSize:13}}>No photo</div>
        )}
      </div>

      <div style={{flex:1}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
          <div>
            <div id={`report-${r.id}`} style={{fontWeight:800}}>{r.category || "General"}</div>
            <div className="small" style={{marginTop:6}}>{r.description}</div>
          </div>

          <div style={{textAlign:"right"}}>
            <div className={`pill ${r.status === "resolved" ? "p-resolved" : "p-pending"}`}>
              {r.status || "pending"}
            </div>
            <div className="small" style={{marginTop:8}}>{timeAgo(r.created_at)}</div>
          </div>
        </div>

        <div style={{display:"flex", gap:8, marginTop:12}}>
          <button className="cta-ghost" onClick={() => onResolve(r.id)}>Resolve</button>
          <button className="cta-ghost" onClick={() => onDelete(r.id)} style={{borderColor:"rgba(255,80,80,0.15)", color:"rgba(255,120,120,0.9)"}}>Delete</button>
        </div>
      </div>

      {/* image modal */}
      {open && (
        <div className="modal" role="dialog" onClick={() => setOpen(false)}>
          <img src={`${r.photo_url.startsWith("http") ? r.photo_url : `/storage/v1/object/public/photos/${r.photo_url}`}`} alt="preview" />
        </div>
      )}
    </article>
  );
}
