import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from '@/components/CreateNote/CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create New Note | NoteHub',
  description: 'Draft and save a new note to your personal collection.',
  openGraph: {
    title: 'Create New Note | NoteHub',
    description: 'Draft and save a new note to your personal collection.',
    url: 'https://notehub.com/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      }
    ],
  },
};

export default function CreateNote() {
  const handleCreateAction = async (formData: FormData) => {
    'use server';
    const title = formData.get('title');
    const content = formData.get('content');
    const tag = formData.get('tag');
    console.log('Saving note:', { title, content, tag });
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm action={handleCreateAction} />
      </div>
    </main>
  );
}