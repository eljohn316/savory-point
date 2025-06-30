import Image from 'next/image';
import Link from 'next/link';

type RecipeCardProps = {
  recipe: {
    image: string;
    name: string;
    uploader: { id: string; image: string; name: string };
    slug: string;
  };
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="group relative">
      <Image
        src={recipe.image}
        alt={recipe.name}
        height={668}
        width={700}
        className="h-52 rounded-md object-cover sm:h-48"
      />
      <h3 className="mt-4 text-lg font-medium text-gray-700 group-hover:underline lg:text-xl">
        {recipe.name}
      </h3>
      <div className="mt-2 flex items-center gap-x-2">
        <Image
          src={recipe.uploader.image}
          alt={recipe.uploader.name}
          height={40}
          width={40}
          className="size-6 rounded-full"
        />
        <p className="text-base text-gray-600 sm:text-sm">
          {recipe.uploader.name}
        </p>
      </div>
      <Link href={`/recipes/${recipe.slug}`} className="absolute inset-0">
        <span className="sr-only">Go to recipe</span>
      </Link>
    </div>
  );
}
