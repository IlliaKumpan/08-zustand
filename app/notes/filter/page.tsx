import NotesClient from '@/components/NotesClient/NotesClient';

export default function DefaultFilterPage() {
  return <NotesClient filter={['all']} />;
}