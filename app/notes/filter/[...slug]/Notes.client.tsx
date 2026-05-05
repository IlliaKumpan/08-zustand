'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { NoteList } from '@/components/NoteList/NoteList';
import { Modal } from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (isError) return <p className="">Сталася помилка при завантаженні нотаток.</p>;

  return (
    <div className="">
      <div className="flex items-center justify-between px-4 mb-4">
        <SearchBox value={search} onChange={handleSearchChange} />
        <button 
          onClick={() => setIsModalOpen(true)} 
          className=""
        >
          Create Note
        </button>
      </div>

      {isLoading ? (
        <p className="">Завантаження...</p>
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

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}