import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50%       { opacity: 0.08; transform: scale(1.08); }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nf-float   { animation: float 5s ease-in-out infinite; }
        .nf-spin    { animation: spin-slow 18s linear infinite; transform-origin: center; }
        .nf-spin-r  { animation: spin-reverse 26s linear infinite; transform-origin: center; }
        .nf-ring    { animation: pulse-ring 4s ease-in-out infinite; transform-origin: center; }
        .nf-content { animation: fade-up 0.6s cubic-bezier(0.22,0.61,0.36,1) both; }
        .nf-content-2 { animation: fade-up 0.6s 0.12s cubic-bezier(0.22,0.61,0.36,1) both; }
        .nf-content-3 { animation: fade-up 0.6s 0.22s cubic-bezier(0.22,0.61,0.36,1) both; }
        .nf-home-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 28px;
          background: var(--cirvio-hunter);
          color: #fff; border-radius: var(--radius-sm);
          text-decoration: none; font-size: 15px; font-weight: 500;
          transition: background 150ms, transform 150ms;
        }
        .nf-home-btn:hover { background: var(--cirvio-sage); transform: translateY(-1px); }
        .nf-back-link {
          color: var(--fg-3); font-size: 14px; text-decoration: none;
          transition: color 120ms;
        }
        .nf-back-link:hover { color: var(--fg-2); }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        gap: 0,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontSize: 20, fontWeight: 600, color: 'var(--cirvio-sage)',
          textDecoration: 'none', letterSpacing: '-0.02em',
          marginBottom: 56,
          display: 'block',
        }}>
          Cirvio
        </Link>

        {/* Animated illustration */}
        <div className="nf-float" style={{ marginBottom: 40 }}>
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Pulse rings */}
            <circle className="nf-ring" cx="110" cy="110" r="100" stroke="#4A795D" strokeWidth="1" fill="none" strokeDasharray="4 6" />

            {/* Outer track ring */}
            <circle className="nf-spin" cx="110" cy="110" r="88"
              stroke="var(--cirvio-mint-300)" strokeWidth="1.5" fill="none"
              strokeDasharray="8 5" />

            {/* Inner track ring */}
            <circle className="nf-spin-r" cx="110" cy="110" r="68"
              stroke="var(--cirvio-mint-100)" strokeWidth="1" fill="none"
              strokeDasharray="3 8" />

            {/* Main compass body */}
            <circle cx="110" cy="110" r="52" fill="white" stroke="var(--cirvio-hunter)" strokeWidth="2" style={{ filter: 'drop-shadow(0 8px 24px rgba(23,66,43,0.12))' }} />
            <circle cx="110" cy="110" r="48" fill="none" stroke="var(--cirvio-mint-100)" strokeWidth="1" />

            {/* Cardinal markers */}
            {[0, 90, 180, 270].map((deg, i) => {
              const rad = (deg - 90) * Math.PI / 180;
              const x1 = 110 + 40 * Math.cos(rad);
              const y1 = 110 + 40 * Math.sin(rad);
              const x2 = 110 + 44 * Math.cos(rad);
              const y2 = 110 + 44 * Math.sin(rad);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--cirvio-sage)" strokeWidth="2" strokeLinecap="round" />;
            })}
            {[45, 135, 225, 315].map((deg, i) => {
              const rad = (deg - 90) * Math.PI / 180;
              const x1 = 110 + 41 * Math.cos(rad);
              const y1 = 110 + 41 * Math.sin(rad);
              const x2 = 110 + 44 * Math.cos(rad);
              const y2 = 110 + 44 * Math.sin(rad);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--cirvio-mint-300)" strokeWidth="1" strokeLinecap="round" />;
            })}

            {/* Compass needle — north (sage/hunter) */}
            <polygon
              points="110,72 106,110 110,108 114,110"
              fill="var(--cirvio-hunter)"
            />
            {/* Compass needle — south (mint) */}
            <polygon
              points="110,148 106,110 110,112 114,110"
              fill="var(--cirvio-mint)"
            />

            {/* Center jewel */}
            <circle cx="110" cy="110" r="5" fill="white" stroke="var(--cirvio-hunter)" strokeWidth="2" />
            <circle cx="110" cy="110" r="2.5" fill="var(--cirvio-hunter)" />

            {/* 404 text at top */}
            <text
              x="110" y="38"
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="var(--cirvio-sage)"
              letterSpacing="0.08em"
            >
              404
            </text>

            {/* Floating dots */}
            <circle cx="34" cy="68" r="4" fill="var(--cirvio-mint-300)" opacity="0.7" />
            <circle cx="186" cy="152" r="3" fill="var(--cirvio-mint)" opacity="0.5" />
            <circle cx="42" cy="158" r="2.5" fill="var(--cirvio-sage)" opacity="0.4" />
            <circle cx="178" cy="62" r="5" fill="var(--cirvio-mint-100)" stroke="var(--cirvio-mint-300)" strokeWidth="1" opacity="0.8" />
          </svg>
        </div>

        {/* Text content */}
        <div className="nf-content" style={{ marginBottom: 8 }}>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: 'var(--fg-1)',
            margin: 0,
          }}>
            Lost in the wilderness
          </h1>
        </div>

        <div className="nf-content-2" style={{ marginBottom: 36 }}>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: 'var(--fg-2)',
            maxWidth: 360,
            margin: '12px auto 0',
            lineHeight: 1.6,
          }}>
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="nf-content-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Link href="/" className="nf-home-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M6 15v-5h4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </Link>
          <Link href="/dashboard" className="nf-back-link">
            Go to dashboard →
          </Link>
        </div>
      </div>
    </>
  );
}
