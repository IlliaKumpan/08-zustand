'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Щось пішло не так при фільтрації!</h2>
      <button onClick={() => reset()}>Спробувати знову</button>
    </div>
  );
}