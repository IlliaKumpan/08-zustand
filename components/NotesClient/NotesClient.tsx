'use client';

import Link from 'next/link';
import { NoteList } from '@/components/NoteList/NoteList';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import css from './NotesClient.module.css';

interface NotesClientProps {
  filter?: string[];
}

export default function NotesClient({ filter }: NotesClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { filter }],
    queryFn: () => fetchNotes({ tag: filter?.[filter.length - 1] }),
  });

  return (
    <section className={css.section}>
      <div className={css.container}>
        <header className={css.header}>
          <h1 className={css.title}>My Notes</h1>
          <Link href="/notes/action/create" className={css.createBtn}>
            Create note +
          </Link>
        </header>

        {isError && <p>Error loading notes.</p>}
        
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <NoteList notes={data?.notes || []} filter={filter} />
        )}
      </div>
    </section>
  );
}