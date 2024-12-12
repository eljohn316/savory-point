import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  const recipe = {
    id: '78ddf59b-a002-40c1-81f8-285594f66a9d',
    imageUrl:
      'https://res.cloudinary.com/dswk4rtna/image/upload/v1733902147/savory-point/the-perfect-basic-burger-recipe.webp',
    title: 'The Perfect Basic Burger Recipe',
    description:
      'This hamburger patty recipe uses ground beef and an easy bread crumb mixture. Nothing beats a simple hamburger on a warm summer evening! Enjoy on ciabatta, Kaiser, or potato rolls topped with your favorite condiments.',
    servings: 4,
    prepTimeHours: 0,
    prepTimeMins: 5,
    cookingTimeHours: 0,
    cookingTimeMins: 20,
    slug: 'the-perfect-basic-burger-recipe',
    uploadedOn: '2024-12-11T07:38:13.770Z',
    updatedOn: '2024-12-11T07:38:13.770Z',
    uploaderId: '5i2ebd3sebxbjuaa',
    sourceId: null,
    ingredients: [
      { id: 1839, ingredient: '4 large egg' },
      { id: 1840, ingredient: '2 teaspoons salt' },
      { id: 1841, ingredient: '2 teaspoons ground black pepper' },
      { id: 1842, ingredient: '4 pounds ground beef' },
      { id: 1843, ingredient: '2 cups fine dry bread crumbs' }
    ],
    instructions: [
      {
        step: 1,
        instruction:
          'Preheat an outdoor grill for high heat and lightly oil grate.'
      },
      {
        step: 2,
        instruction: 'Whisk egg, salt, and pepper together in a medium bowl.'
      },
      {
        step: 3,
        instruction:
          'Add ground beef and bread crumbs; mix with your hands or a fork until well blended.'
      },
      { step: 4, instruction: 'Form into four 3/4-inch-thick patties.' },
      {
        step: 5,
        instruction:
          'Place patties on the preheated grill. Cover and cook 6 to 8 minutes per side, or to desired doneness. An instant-read thermometer inserted into the center should read at least 160 degrees F (70 degrees C).'
      },
      { step: 6, instruction: 'Serve hot and enjoy!' }
    ],
    uploader: {
      firstName: 'Khaled',
      lastName: 'Gray',
      defaultImage:
        'https://ui-avatars.com/api/?name=Khaled+Gray&background=random',
      image: null
    },
    source: null
  };

  return (
    <div className="md:flex md:gap-x-16 lg:gap-x-24">
      <div className="md:flex-auto">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="mt-3 flex items-center">
          <Skeleton className="size-8 flex-none rounded-full" />
          <div className="ml-3 flex-auto">
            <Skeleton className="h-4 w-full max-w-44" />
          </div>
        </div>

        <div className="mt-8 space-y-10 lg:space-y-12">
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>

          <div className="space-y-4 md:hidden">
            <div className="rounded-md border border-emerald-700 p-1">
              <Skeleton className="h-60 rounded-md lg:h-72" />
            </div>
            <div className="rounded-md border border-emerald-700 bg-emerald-50 px-6 py-2">
              <dl className="divide-y divide-gray-200 *:py-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-full max-w-20" />
                  <Skeleton className="ml-auto h-5 w-full max-w-24" />
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-emerald-700">Ingredients</h3>
            <div className="space-y-4">
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
              <Skeleton className="h-5 w-full md:w-2/3" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-emerald-700">Instructions</h3>
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden flex-none md:block md:w-full md:max-w-80 lg:max-w-96">
        <div className="rounded-md border border-emerald-700 p-2">
          <Skeleton className="h-60 rounded-md lg:h-72" />
        </div>
        <div className="mt-8 rounded-md border border-emerald-700 bg-emerald-50 px-6 py-2">
          <dl className="divide-y divide-gray-200 *:py-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-full max-w-20" />
              <Skeleton className="ml-auto h-5 w-full max-w-24" />
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
