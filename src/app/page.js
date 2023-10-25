'use client';

import CalendarComponent from './components/CalendarComponent';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between h-full bg-main text-primary'>
      <CalendarComponent />
    </main>
  );
}
