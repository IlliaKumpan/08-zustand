import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api'; 

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);
  const title = `${note?.title || 'Note Details'} | NoteHub`;
  const description = note?.content?.substring(0, 160) || 'Read more about this note.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/${params.id}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default function NoteDetailsPage({ params }: Props) {
}