import { db } from '@/lib/db';
import console from 'console';

export default async function Home() {
  const recipes = await db.recipe.findMany({
    select: {
      id: true,
      title: true
    }
  });

  console.log(recipes);

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 mt-20">
      <div className="text-center">
        <h3 className="font-bold text-lg text-emerald-700">Todo</h3>
        <p className="text-base text-gray-700">Home page UI next</p>
        <div className="mt-5">{JSON.stringify(recipes, null, 2)}</div>
      </div>
    </div>
  );
}
