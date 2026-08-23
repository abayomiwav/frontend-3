import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#14171c',
          borderRadius: 18,
        }}
      >
        <svg width={110} height={110} viewBox="0 0 32 32" fill="none">
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
      </div>
    ),
    { ...size },
  );
}
