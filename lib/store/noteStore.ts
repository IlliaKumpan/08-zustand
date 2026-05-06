import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: typeof initialDraft;
  setDraft: (updatedNote: typeof initialDraft) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (updatedNote) => set((state) => ({ 
        draft: { ...state.draft, ...updatedNote } 
      })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
    }
  )
);