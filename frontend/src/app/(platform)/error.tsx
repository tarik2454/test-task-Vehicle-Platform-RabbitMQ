'use client';

type TErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: TErrorPageProps) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        background:
          'radial-gradient(circle at top, rgba(239, 68, 68, 0.12), transparent 30%), #f8fafc',
      }}
    >
      <section
        style={{
          width: 'min(520px, 100%)',
          padding: '28px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(148, 163, 184, 0.22)',
          boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
        }}
      >
        <p
          style={{
            margin: '0 0 12px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#dc2626',
          }}
        >
          Application Error
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: '2rem',
            color: '#0f172a',
          }}
        >
          Что-то пошло не так
        </h1>
        <p
          style={{
            margin: '14px 0 0',
            lineHeight: 1.7,
            color: '#475569',
          }}
        >
          {error.message || 'Не удалось отрисовать страницу.'}
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: '20px',
            minHeight: '44px',
            padding: '0 18px',
            border: 0,
            borderRadius: '999px',
            background: '#2563eb',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Попробовать снова
        </button>
      </section>
    </main>
  );
}
