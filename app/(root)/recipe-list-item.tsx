import Image from 'next/image';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getCldImageUrl } from 'next-cloudinary';

type Recipe = {
  id: string;
  title: string;
  about: string;
  slug: string;
  uploadedOn: Date;
  image: {
    url: string;
    publicId: string;
  } | null;
};

interface RecipeItemProps {
  recipe: Recipe;
  className?: string;
}

export async function RecipeListItem({ recipe, className }: RecipeItemProps) {
  const dataUrl = await generateDataUrl(recipe.image!.publicId);

  return (
    <article className={cn(className, 'md:flex md:gap-x-6 md:items-center')}>
      <div className="h-44 md:w-48 md:shrink-0 relative">
        <Image
          src={recipe.image!.url}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-auto object-cover rounded-md"
        />
        {/* <CldImage
          src={recipe.image!.url}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-auto object-cover rounded-md"
          placeholder="blur"
          blurDataURL={dataUrl}
        /> */}
      </div>
      <div className="mt-4 md:mt-0 md:flex-1">
        <time
          dateTime={formatDate(recipe.uploadedOn)}
          className="text-xs text-gray-500">
          {formatDate(recipe.uploadedOn)}
        </time>
        <div className="mt-2">
          <h3 className="font-bold text-gray-900 text-xl leading-6 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="mt-1 text-sm">
            <span className="text-gray-500">by</span>{' '}
            <span className="text-emerald-700 font-medium">James Taylor</span>
          </p>
        </div>
        <div className="mt-4">
          <p className="text-base text-gray-700 line-clamp-3">{recipe.about}</p>
        </div>
      </div>
    </article>
  );
}

function formatDate(date: Date) {
  return format(date, 'MMM dd uuuu');
}

async function generateDataUrl(publicId: string) {
  const imageUrl = getCldImageUrl({
    src: publicId,
    width: 100
  });

  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');

  return `data:${response.type};base64,${base64}`;
}
