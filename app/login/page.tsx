"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    
    try {
      setLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const result = await response.json();
      if (!result.success) {
        alert("Invalid credentials");
        return;
      }
      localStorage.setItem("admin", JSON.stringify(result.admin));
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

        .ib-page {
          min-height: 100vh;
          background: #0a0905;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .ib-card {
          width: 100%;
          max-width: 840px;
          display: flex;
          border-radius: 16px;
          overflow: hidden;
          border: 0.5px solid rgba(212, 180, 131, 0.12);
        }

        /* ── Left panel ── */
        .ib-left {
          flex: 1;
          background: #0d0c08;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 56px 36px;
          position: relative;
        }
        .ib-left::after {
          content: '';
          position: absolute;
          right: 0; top: 12%; bottom: 12%;
          width: 0.5px;
          background: rgba(212, 180, 131, 0.15);
        }

        .ib-brand-mark {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          border: 0.5px solid rgba(212, 180, 131, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
        }
        .ib-brand-mark svg {
          width: 28px;
          height: 28px;
          stroke: #d4b483;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ib-brand-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-style: italic;
          font-size: 34px;
          color: #d4b483;
          letter-spacing: 0.04em;
          line-height: 1.1;
          text-align: center;
          margin-bottom: 8px;
        }
        .ib-brand-sub {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(212, 180, 131, 0.45);
          text-align: center;
        }
        .ib-tagline {
          margin-top: 36px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-style: italic;
          font-size: 13.5px;
          color: rgba(212, 180, 131, 0.38);
          text-align: center;
          line-height: 1.75;
          max-width: 210px;
        }

        /* ── Right panel ── */
        .ib-right {
          flex: 1.3;
          background: #111009;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 56px 48px;
        }

        .ib-eyebrow {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(212, 180, 131, 0.45);
          margin-bottom: 10px;
        }
        .ib-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: 30px;
          color: #ede0c8;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        .ib-desc {
          font-size: 13px;
          color: rgba(237, 224, 200, 0.32);
          margin-bottom: 40px;
          line-height: 1.65;
        }

        .ib-field { margin-bottom: 22px; }
        .ib-label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(212, 180, 131, 0.5);
          margin-bottom: 9px;
        }
        .ib-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .ib-input-wrap svg {
          position: absolute;
          left: 14px;
          width: 16px;
          height: 16px;
          stroke: rgba(212, 180, 131, 0.3);
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          pointer-events: none;
        }
        .ib-input {
          width: 100%;
          background: rgba(212, 180, 131, 0.04);
          border: 0.5px solid rgba(212, 180, 131, 0.18);
          border-radius: 8px;
          padding: 13px 14px 13px 42px;
          font-size: 14px;
          color: #ede0c8;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          -webkit-appearance: none;
        }
        .ib-input::placeholder { color: rgba(237, 224, 200, 0.2); }
        .ib-input:focus { border-color: rgba(212, 180, 131, 0.5); }

        .ib-btn {
          width: 100%;
          margin-top: 6px;
          padding: 14px;
          background: #d4b483;
          border: none;
          border-radius: 8px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0a0905;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s;
        }
        .ib-btn:hover:not(:disabled) { opacity: 0.85; }
        .ib-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .ib-btn svg {
          width: 15px;
          height: 15px;
          stroke: #0a0905;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ib-divider {
          height: 0.5px;
          background: rgba(212, 180, 131, 0.1);
          margin: 32px 0;
        }
        .ib-footer {
          font-size: 12px;
          color: rgba(237, 224, 200, 0.2);
          text-align: center;
          line-height: 1.6;
        }
        .ib-footer span { color: rgba(212, 180, 131, 0.42); }

        /* ── Responsive: stack on small screens ── */
        @media (max-width: 600px) {
          .ib-card { flex-direction: column; }
          .ib-left::after { display: none; }
          .ib-left { padding: 40px 28px 32px; }
          .ib-right { padding: 36px 28px 44px; }
          .ib-tagline { display: none; }
        }
      `}</style>

      <div className="ib-page">
        <div className="ib-card">

          {/* ── Left: Brand panel ── */}
          <div className="ib-left">
            <div className="ib-brand-mark">
              {/* Scissors icon */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
              </svg>
            </div>

            <div className="ib-brand-name">
              Ibrahim<br />Designs
            </div>
            <div className="ib-brand-sub">Cape Town Atelier</div>

            <div className="ib-tagline">
              &ldquo;We weave stories of culture, character, and individual elegance into every seam.&rdquo;
            </div>
          </div>

          {/* ── Right: Login form ── */}
          <div className="ib-right">
            <div className="ib-eyebrow">Atelier Portal</div>
            <div className="ib-title">Welcome back</div>
            <div className="ib-desc">
              Sign in to manage your collections, orders, and clients.
            </div>

            <div className="ib-field">
              <label className="ib-label" htmlFor="ib-name">Full name</label>
              <div className="ib-input-wrap">
                {/* User icon */}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="ib-name"
                  className="ib-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="ib-field">
              <label className="ib-label" htmlFor="ib-phone">Phone number</label>
              <div className="ib-input-wrap">
                {/* Phone icon */}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z" />
                </svg>
                <input
                  id="ib-phone"
                  className="ib-input"
                  type="tel"
                  placeholder="+27 83 721 2432"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>

            <button
              className="ib-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  Enter the atelier
                  {/* Arrow right icon */}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            <div className="ib-divider" />

            <div className="ib-footer">
              For men, women &amp; children &nbsp;·&nbsp;
              <span>Green Market Square, Cape Town</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}