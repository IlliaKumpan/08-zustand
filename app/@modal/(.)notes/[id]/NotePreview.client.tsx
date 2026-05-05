'use client'; 

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/Modal/Modal';
import css from '@/components/NotePreview/NotePreview.module.css';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });

  if (isLoading) return <p className={css.loading}>Завантаження нотатки...</p>;
  if (isError || !note) return <p className={css.error}>Помилка завантаження.</p>;

  return (
    <Modal onClose={() => router.back()}>
      <article className={css.container}>
        <button 
          onClick={() => router.back()} 
          className={css.backBtn} 
        >
          Закрити
        </button>
        
        <header className={css.header}>
          <h2 className={css.headerTitle}>{note.title}</h2>
          <div className={css.item}>
            <span className={css.tag}>#{note.tag}</span>
          </div>
        </header>
        
        <div className={css.content}>
          <p className={css.itemText}>{note.content}</p>
        </div>

        <footer className={css.footer}>
          <div className={css.date}>ID: {note.id}</div>
          {note.createdAt && (
            <div className={css.itemDate}>
              Створено: {new Date(note.createdAt).toLocaleDateString()}
            </div>
          )}
        </footer>
      </article>
    </Modal>
  );
}