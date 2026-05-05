'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { NoteList } from '@/components/NoteList/NoteList';
import Link from 'next/link';
import css from './NotesClient.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { tag, page, search: debouncedSearch }],
    queryFn: () => fetchNotes({ tag, page, search: debouncedSearch }),
  });

  if (isError) return <p>Сталася помилка при завантаженні нотаток.</p>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <Link href="/notes/action/create" className={css.createBtn}>
          Create note +
        </Link>
      </div>

      {isLoading ? (
        <p>Завантаження...</p>
      ) : (
        <NoteList notes={data?.notes || []} />
      )}

      {data && data.totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={data.totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
}