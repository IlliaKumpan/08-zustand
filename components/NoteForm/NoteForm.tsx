'use client';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';

export default function NoteForm({ action }: { action: (formData: FormData) => void }) {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (formData: FormData) => {
    await action(formData);
    clearDraft();
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
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
      </select>
      <div className={css.actions}>
        <button type="button" onClick={handleCancel} className={css.cancelBtn}>
          Cancel
        </button>
        <button type="submit" className={css.submitBtn}>
          Save
        </button>
      </div>
    </form>
  );
}