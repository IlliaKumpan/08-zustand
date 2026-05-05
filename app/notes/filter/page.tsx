import FilteredNotesPage from './[...slug]/page';

export default async function DefaultFilterPage() {
  return <FilteredNotesPage params={Promise.resolve({ slug: ['all'] })} />;
}