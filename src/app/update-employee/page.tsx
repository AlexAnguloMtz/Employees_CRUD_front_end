import { useRouter } from 'next/navigation';

type SearchParams = {
  id: number
}

function UpdateEmployee({ searchParams }: {
  searchParams: SearchParams
}): JSX.Element {

  return (
    <div>
      <h1>Product Page</h1>
      <p>id: {searchParams.id}</p>
    </div>
  );
};

export default UpdateEmployee;