import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | NoteHub',
  description: 'Sorry, the page you are looking for does not exist on NoteHub.',
  openGraph: {
    title: 'Page Not Found | NoteHub',
    description: 'Sorry, the page you are looking for does not exist on NoteHub.',
    url: 'https://notehub.com/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Not Found</h1>
      <p>The page you requested could not be found.</p>
      <Link href="/">Go back home</Link>
    </main>
  );
}