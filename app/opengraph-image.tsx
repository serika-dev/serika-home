import { ImageResponse } from 'next/og';

export const alt = 'Serika — Open source software, built out of curiosity';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0f',
          backgroundImage:
            'radial-gradient(900px 600px at 12% -10%, rgba(139,92,246,0.20), transparent 60%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>
          <span style={{ color: '#ededf2' }}>serika</span>
          <span style={{ color: '#8b5cf6' }}>.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#ededf2',
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            Open software, built out of&nbsp;
            <span style={{ color: '#8b5cf6' }}>curiosity.</span>
          </div>
          <div style={{ color: '#8a8a99', fontSize: 30, marginTop: 30 }}>
            Open source software for a freer internet — create, learn, share.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', color: '#8a8a99', fontSize: 24 }}>
          <span>SerikaMoe</span>
          <span style={{ color: '#3a3a44' }}>·</span>
          <span>Serika Booru</span>
          <span style={{ color: '#3a3a44' }}>·</span>
          <span>Serika.chat</span>
          <span style={{ color: '#3a3a44' }}>·</span>
          <span>Serika Search</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
