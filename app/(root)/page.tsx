import { db } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const recipes = await db.recipe.findMany({
    select: {
      id: true,
      imageUrl: true,
      title: true
    }
  });

  return (
    <div>
      Home Page <br />
      <Link href={'/create-recipe'}>Create recipe</Link>
      <br />
      <div className="max-w-4xl mx-auto mt-12 space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex items-center gap-x-3">
            <div className="shrink-0">
              {recipe.imageUrl ? (
                <Image
                  src={recipe.imageUrl}
                  alt=""
                  className="object-cover"
                  width={300}
                  height={200}
                />
              ) : (
                <div className="size-28 bg-gray-300 rounded-md" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-2xl text-gray-700">
                {recipe.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
