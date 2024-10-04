interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <div className="">Update recipe page {params.id}</div>;
}
