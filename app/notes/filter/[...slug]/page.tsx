import { Metadata } from 'next';
import NotesClient from '@/components/NotesClient/NotesClient';

type Props = {
  params: Promise<{ slug: string[] }>; // Типізація згідно з вимогами Next.js 15
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug[slug.length - 1];
  const title = `Notes Filter: ${filter} | NoteHub`;
  const description = `Viewing notes for category: ${filter}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub-phi.vercel.app/notes/filter/${slug.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  return <NotesClient filter={slug} />;
}