import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #14171c 0%, #1b1f26 55%, #14171c 100%)',
        }}
      >
        <svg width={260} height={260} viewBox="0 0 32 32" fill="none">
          <polyline
            points="8,9 14,16 8,23"
            stroke="#ff6a1a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          />
          <polyline
            points="14,9 20,16 14,23"
            stroke="#ff6a1a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.65"
          />
          <polyline
            points="20,9 26,16 20,23"
            stroke="#ff6a1a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#f1f2f4',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#9aa2ad',
              marginTop: 14,
              display: 'flex',
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
