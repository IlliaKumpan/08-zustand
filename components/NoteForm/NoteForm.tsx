'use client';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';

// Типізація даних нотатки замість any
interface NoteData {
  title: string;
  content: string;
  tag: string;
}

// Функція запиту
const createNoteRequest = async (newNote: NoteData): Promise<NoteData> => {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNote),
  });
  if (!response.ok) throw new Error('Failed to create note');
  return response.json();
};

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNoteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft(); 
      router.push('/notes'); 
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value }); 
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        name="title"
        className={css.input}
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        className={css.textarea}
        value={draft.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
      <select 
        name="tag" 
        className={css.select} 
        value={draft.tag} 
        onChange={handleChange}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <div className={css.actions}>
        <button type="button" onClick={() => router.back()} className={css.cancelBtn}>
          Cancel
        </button>
        <button type="submit" disabled={mutation.isPending} className={css.submitBtn}>
          {mutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}