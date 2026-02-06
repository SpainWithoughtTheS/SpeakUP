import React from "react";
import Hero from "../components/Hero";
import useOnScreen from "../hooks/useOnScreen";

function Feature({ title, text, idx }) {
  const [ref, on] = useOnScreen("-16%");
  return (
    <div ref={ref} className={`feature reveal ${on ? "on-screen" : ""}`} style={{transitionDelay:`${idx*80}ms`}}>
      <div className="kicker">{title}</div>
      <h4 style={{marginTop:8}}>{title}</h4>
      <p className="small" style={{marginTop:8}}>{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section container" id="how-it-works" aria-labelledby="how">
        <h3 id="how">How it works</h3>
        <div className="features-grid" style={{marginTop:18}}>
          <Feature idx={0} title="Report with photo" text="Attach a photo — photos make it decisive. Anonymous by default." />
          <Feature idx={1} title="Quick review" text="Admins triage incoming reports and mark status." />
          <Feature idx={2} title="Export & analyze" text="Export CSV, view charts, and measure improvements." />
        </div>
      </section>

      <section className="section container" aria-label="call to action">
        <div className="card">
          <h3>Ready to make school better?</h3>
          <p className="small">Open /submit and file your first report. Posts are anonymous unless you login.</p>
          <div style={{marginTop:12}}>
            <button className="btn" onClick={()=>window.location.href="/submit"}>Report now</button>
            <button className="cta-ghost" style={{marginLeft:10}} onClick={()=>window.location.href="/admin"}>View admin</button>
          </div>
        </div>
      </section>
    </>
  );
}
