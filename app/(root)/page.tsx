import Link from 'next/link';

export default function Home() {
  return (
    <div>
      Home Page <br />
      <Link href={'/create-recipe'}>Create recipe</Link>
    </div>
  );
}
