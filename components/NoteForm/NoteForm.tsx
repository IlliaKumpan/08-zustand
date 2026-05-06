'use client';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';

interface NoteFormProps {
  action: (formData: FormData) => void;
}

export default function NoteForm({ action }: NoteFormProps) {
  const { draft, setDraft } = useNoteStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleCancel = () => {
    router.back();
  };
  return (
    <form action={action} className={css.form}>
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