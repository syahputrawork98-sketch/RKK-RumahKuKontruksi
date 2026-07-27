import PageState from '../components/ui/PageState';

export default function UnavailablePage({ title, description }) {
  return (
    <PageState 
      label="Sedang disiapkan"
      title={title}
      description={description}
    />
  );
}
