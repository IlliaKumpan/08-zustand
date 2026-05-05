interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  return (
    <div>
      <h3>Preview for Note ID: {id}</h3>
    </div>
  );
}