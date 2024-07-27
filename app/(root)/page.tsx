import { db } from '@/lib/db';
import Link from 'next/link';

export default async function Home() {
  const recipes = await db.recipe.findMany({
    select: {
      id: true,
      title: true
    }
  });
  return (
    <div>
      Home Page <br />
      <Link href={'/create-recipe'}>Create recipe</Link>
      <br />
      {recipes.map((recipe) => (
        <div key={recipe.id}>{recipe.title}</div>
      ))}
    </div>
  );
}
