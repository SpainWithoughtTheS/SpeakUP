import React, { useEffect, useRef, useState } from "react";

/**
 * Hero: big headline + art card with signature overlay.
 * - parallax of art on scroll
 * - gentle image wiggle on hover
 * - scroll prompt that hints "scroll to explore"
 */
export default function Hero() {
  const artRef = useRef(null);
  const [tilt, setTilt] = useState({x:0,y:0});
  const [offsetY, setOffsetY] = useState(0);

  // small mouse tilt effect
  useEffect(() => {
    const el = artRef.current;
    if (!el) return;
    function move(e) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) / rect.width;
      const y = (e.clientY - rect.top - rect.height/2) / rect.height;
      setTilt({x: x * 8, y: y * 8});
    }
    function reset(){ setTilt({x:0,y:0}); }
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  // page scroll parallax — shifts art vertically opposite to scroll
  useEffect(() => {
    function onScroll(){
      const sc = window.scrollY || window.pageYOffset;
      // small easing
      setOffsetY(sc * -0.08);
    }
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" aria-label="Intro hero">
      <div className="container hero-inner">
        <div className="hero-left">
          <h1 className="headline reveal" style={{transitionDelay:"0.05s"}}>
            Help fix your school — fast, anonymous, meaningful.
          </h1>

          <p className="subtitle reveal" style={{transitionDelay:"0.12s"}}>
            Submit quick reports, attach photos, and watch administrators resolve issues.
            SpeakUp helps your voice be heard and makes school life better — one report at a time.
          </p>

          <div className="cta-row">
            <button className="btn" onClick={()=>window.location.href="/submit"}>Report an issue</button>
            <button className="cta-ghost" onClick={()=>window.scrollTo({top:700, behavior:"smooth"})}>How it works</button>
            <div style={{fontSize:12, color:"rgba(255,255,255,0.65)", marginLeft:8}}>Anonymous by default</div>
          </div>
        </div>

        <div className="hero-art" style={{transform:`translateY(${offsetY}px)`}} aria-hidden>
          <div className="art-card" ref={artRef} style={{
            transform:`rotate(${tilt.x*0.08}deg) translateY(${tilt.y*0.02}px)`,
            transition:"transform 0.12s linear"
          }}>
            <img src="/placeholder-school.jpg" alt="school art" onError={(e)=>{ e.target.src='https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3d18a1a3d1c4f1a3f94' }} />

            {/* signature overlay — SVG stroke for that loud signature look */}
            <div className="signature" aria-hidden>
              <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="sg" x1="0" x2="1">
                    <stop offset="0" stopColor="#caff5b" />
                    <stop offset="1" stopColor="#7cffb6" />
                  </linearGradient>
                </defs>
                <path d="M30 300 C 170 50, 420 400, 650 200 C 820 90, 980 140, 980 140" stroke="url(#sg)" strokeWidth="30" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.98"/>
                <path d="M120 320 C 240 220, 410 260, 560 180" stroke="url(#sg)" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.95"/>
              </svg>
            </div>
          </div>

          <div className="art-caption">Evidence helps — photos make reports actionable.</div>
        </div>
      </div>
    </section>
  );
}
