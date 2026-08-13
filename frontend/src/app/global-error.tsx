'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            minHeight: '100vh',
            gap: 16,
          }}
        >
          <h2>Something went wrong</h2>
          <p style={{ opacity: 0.7 }}>{error.message}</p>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  );
}
