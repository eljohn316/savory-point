import { db } from '@/lib/db';
import { RecipeList } from '@/app/(root)/(home)/recipe-list';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getRecipes(search?: string) {
  try {
    const recipes = await db.recipe.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive'
        }
      },
      orderBy: { uploadedOn: 'desc' },
      select: {
        id: true,
        imageUrl: true,
        title: true,
        slug: true,
        about: true,
        uploader: {
          select: {
            image: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return recipes;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
}

export default async function Page({ searchParams }: PageProps) {
  const search = searchParams.search as string | undefined;

  const recipes = await getRecipes(search);

  return (
    <>
      {search && (
        <div className="mb-6">
          <p className="text-gray-700">
            Search results for{' '}
            <span className="text-gray-900 font-semibold">
              &ldquo;{search}&rdquo;
            </span>
          </p>
        </div>
      )}

      <RecipeList search={search} recipes={recipes} />
    </>
  );
}
