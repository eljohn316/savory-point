export const RECIPES = [
  {
    id: 'rec_001',
    image: '/spaghetti-bolognese.jpg',
    name: 'Spaghetti Bolognese',
    summary:
      'A classic Italian dish made with rich, meaty tomato sauce served over tender spaghetti. This comforting meal combines ground beef, onions, garlic, and herbs for a flavorful experience. Perfect for family dinners or cozy nights in.',
    preparation: {
      total: 60,
      preparation: 15,
      cooking: 45,
    },
    ingredients: [
      { id: 1, ingredient: '200g spaghetti' },
      { id: 2, ingredient: '400g ground beef' },
      { id: 3, ingredient: '1 onion, finely chopped' },
      { id: 4, ingredient: '2 garlic cloves, minced' },
      { id: 5, ingredient: '400g canned tomatoes' },
      { id: 6, ingredient: '2 tbsp tomato paste' },
      { id: 7, ingredient: '1 tsp dried oregano' },
      { id: 8, ingredient: 'Salt and pepper to taste' },
      { id: 9, ingredient: '2 tbsp olive oil' },
    ],
    instructions: [
      {
        id: 1,
        step: 1,
        instruction: 'Heat olive oil in a large pan over medium heat.',
      },
      {
        id: 2,
        step: 2,
        instruction: 'Add onion and garlic, cook until softened.',
      },
      {
        id: 3,
        step: 3,
        instruction: 'Add ground beef and cook until browned.',
      },
      {
        id: 4,
        step: 4,
        instruction: 'Stir in tomato paste, canned tomatoes, and oregano.',
      },
      {
        id: 5,
        step: 5,
        instruction: 'Simmer for 30 minutes, stirring occasionally.',
      },
      {
        id: 6,
        step: 6,
        instruction: 'Cook spaghetti according to package instructions.',
      },
      { id: 7, step: 7, instruction: 'Serve sauce over cooked spaghetti.' },
    ],
    nutrition: [
      { id: 1, name: 'Calories', value: '650 kcal' },
      { id: 2, name: 'Protein', value: '35g' },
      { id: 3, name: 'Carbohydrates', value: '70g' },
      { id: 4, name: 'Fat', value: '20g' },
    ],
    uploader: {
      id: 'usr_101',
      image: 'https://api.dicebear.com/9.x/initials/svg?seed=Anna%20Rossi',
      name: 'Anna Rossi',
    },
    slug: 'spaghetti-bolognese',
  },
  {
    id: 'rec_002',
    image: '/chicken-curry.jpg',
    name: 'Chicken Curry',
    summary:
      "A hearty and aromatic dish featuring tender chicken pieces simmered in a spiced curry sauce. Infused with garlic, ginger, and a blend of Indian spices, it's best served with rice or naan. Great for a warm, flavorful meal any day of the week.",
    preparation: {
      total: 50,
      preparation: 20,
      cooking: 30,
    },
    ingredients: [
      { id: 1, ingredient: '500g chicken breast, cubed' },
      { id: 2, ingredient: '1 onion, chopped' },
      { id: 3, ingredient: '2 tbsp curry powder' },
      { id: 4, ingredient: '400ml coconut milk' },
      { id: 5, ingredient: '2 tbsp vegetable oil' },
      { id: 6, ingredient: '1 tsp ginger, grated' },
      { id: 7, ingredient: '2 garlic cloves, minced' },
      { id: 8, ingredient: 'Salt to taste' },
    ],
    instructions: [
      {
        id: 1,
        step: 1,
        instruction: 'Heat oil in a pan and sauté onion until golden.',
      },
      {
        id: 2,
        step: 2,
        instruction: 'Add garlic and ginger, cook for 1 minute.',
      },
      {
        id: 3,
        step: 3,
        instruction: 'Stir in curry powder and cook for 30 seconds.',
      },
      { id: 4, step: 4, instruction: 'Add chicken and cook until sealed.' },
      {
        id: 5,
        step: 5,
        instruction: 'Pour in coconut milk and simmer for 20 minutes.',
      },
      { id: 6, step: 6, instruction: 'Season with salt and serve with rice.' },
    ],
    nutrition: [
      { id: 1, name: 'Calories', value: '450 kcal' },
      { id: 2, name: 'Protein', value: '30g' },
      { id: 3, name: 'Carbohydrates', value: '15g' },
      { id: 4, name: 'Fat', value: '25g' },
    ],
    uploader: {
      id: 'usr_102',
      image: 'https://api.dicebear.com/9.x/initials/svg?seed=Rahul%20Sharma',
      name: 'Rahul Sharma',
    },
    slug: 'chicken-curry',
  },
  {
    id: 'rec_003',
    image: '/vegetable-stir-fry.jpg',
    name: 'Vegetable Stir Fry',
    summary:
      'A quick and healthy dish packed with colorful vegetables sautéed in a savory soy-based sauce. It’s a great way to enjoy a variety of veggies with minimal prep. Perfect for weeknight meals or a light lunch.',
    preparation: {
      total: 25,
      preparation: 10,
      cooking: 15,
    },
    ingredients: [
      { id: 1, ingredient: '1 bell pepper, sliced' },
      { id: 2, ingredient: '1 zucchini, sliced' },
      { id: 3, ingredient: '1 carrot, sliced' },
      { id: 4, ingredient: '100g broccoli florets' },
      { id: 5, ingredient: '2 tbsp soy sauce' },
      { id: 6, ingredient: '1 tbsp sesame oil' },
      { id: 7, ingredient: '1 tsp garlic, minced' },
    ],
    instructions: [
      {
        id: 1,
        step: 1,
        instruction: 'Heat sesame oil in a wok over high heat.',
      },
      { id: 2, step: 2, instruction: 'Add garlic and stir for 30 seconds.' },
      {
        id: 3,
        step: 3,
        instruction: 'Add all vegetables and stir-fry for 10 minutes.',
      },
      { id: 4, step: 4, instruction: 'Pour in soy sauce and toss to coat.' },
      { id: 5, step: 5, instruction: 'Serve hot with rice or noodles.' },
    ],
    nutrition: [
      { id: 1, name: 'Calories', value: '200 kcal' },
      { id: 2, name: 'Protein', value: '5g' },
      { id: 3, name: 'Carbohydrates', value: '20g' },
      { id: 4, name: 'Fat', value: '10g' },
    ],
    uploader: {
      id: 'usr_103',
      image: 'https://api.dicebear.com/9.x/initials/svg?seed=Li%20Wei',
      name: 'Li Wei',
    },
    slug: 'vegetable-stir-fry',
  },
  {
    id: 'rec_004',
    image: '/fluffy-pancakes.jpg',
    name: 'Fluffy Pancakes',
    summary:
      'Light, airy pancakes that are perfect for breakfast or brunch. These golden rounds are easy to make and taste delicious with maple syrup, butter, or your favorite fruits. A crowd-pleaser for all ages.',
    preparation: {
      total: 30,
      preparation: 10,
      cooking: 20,
    },
    ingredients: [
      { id: 1, ingredient: '1 cup all-purpose flour' },
      { id: 2, ingredient: '1 tbsp sugar' },
      { id: 3, ingredient: '1 tsp baking powder' },
      { id: 4, ingredient: '1 egg' },
      { id: 5, ingredient: '3/4 cup milk' },
      { id: 6, ingredient: '2 tbsp melted butter' },
      { id: 7, ingredient: 'Pinch of salt' },
    ],
    instructions: [
      {
        id: 1,
        step: 1,
        instruction: 'Mix flour, sugar, baking powder, and salt in a bowl.',
      },
      {
        id: 2,
        step: 2,
        instruction: 'Whisk egg, milk, and melted butter in another bowl.',
      },
      {
        id: 3,
        step: 3,
        instruction: 'Combine wet and dry ingredients, stir until smooth.',
      },
      { id: 4, step: 4, instruction: 'Heat a non-stick pan over medium heat.' },
      {
        id: 5,
        step: 5,
        instruction:
          'Pour batter to form pancakes and cook until bubbles form.',
      },
      { id: 6, step: 6, instruction: 'Flip and cook until golden brown.' },
    ],
    nutrition: [
      { id: 1, name: 'Calories', value: '300 kcal' },
      { id: 2, name: 'Protein', value: '8g' },
      { id: 3, name: 'Carbohydrates', value: '40g' },
      { id: 4, name: 'Fat', value: '12g' },
    ],
    uploader: {
      id: 'usr_104',
      image: 'https://api.dicebear.com/9.x/initials/svg?seed=Emma%20Johnson',
      name: 'Emma Johnson',
    },
    slug: 'fluffy-pancakes',
  },
  {
    id: 'rec_005',
    image: '/caesar-salad.jpg',
    name: 'Caesar Salad',
    summary:
      'A crisp and creamy salad made with romaine lettuce, crunchy croutons, and a tangy Caesar dressing. Topped with grated Parmesan and optionally grilled chicken, it’s a refreshing side or a light main course.',
    preparation: {
      total: 20,
      preparation: 15,
      cooking: 5,
    },
    ingredients: [
      { id: 1, ingredient: '1 romaine lettuce, chopped' },
      { id: 2, ingredient: '1/4 cup Caesar dressing' },
      { id: 3, ingredient: '1/2 cup croutons' },
      { id: 4, ingredient: '1/4 cup Parmesan cheese, grated' },
      { id: 5, ingredient: '1 garlic clove, minced' },
      { id: 6, ingredient: '1 tbsp lemon juice' },
    ],
    instructions: [
      {
        id: 1,
        step: 1,
        instruction: 'Toss lettuce with Caesar dressing in a large bowl.',
      },
      { id: 2, step: 2, instruction: 'Add garlic and lemon juice, mix well.' },
      { id: 3, step: 3, instruction: 'Top with croutons and Parmesan cheese.' },
      { id: 4, step: 4, instruction: 'Serve immediately.' },
    ],
    nutrition: [
      { id: 1, name: 'Calories', value: '250 kcal' },
      { id: 2, name: 'Protein', value: '6g' },
      { id: 3, name: 'Carbohydrates', value: '15g' },
      { id: 4, name: 'Fat', value: '18g' },
    ],
    uploader: {
      id: 'usr_105',
      image: 'https://api.dicebear.com/9.x/initials/svg?seed=Sophie%20Martin',
      name: 'Sophie Martin',
    },
    slug: 'caesar-salad',
  },
  {
    id: 'rec_006',
    image: '/beef-tacos.jpg',
    name: 'Beef Tacos',
    summary:
      'Savory ground beef seasoned with spices and served in crispy or soft taco shells. Topped with fresh veggies, cheese, and your favorite salsa, these tacos are a fun and flavorful meal. Great for taco nights or casual gatherings.',
    preparation: {
      total: 35,
      preparation: 15,
      cooking: 20,
    },
    ingredients: [
      { id: 1, ingredient: '300g ground beef' },
      { id: 2, ingredient: '8 soft tortillas' },
      { id: 3, ingredient: '1 tsp chili powder' },
      { id: 4, ingredient: '1/2 cup diced tomatoes' },
      { id: 5, ingredient: '1/2 cup shredded lettuce' },
      { id: 6, ingredient: '1/4 cup shredded cheese' },
      { id: 7, ingredient: '1 tbsp olive oil' },
    ],
    instructions: [
      {
        id: 1,
        step: 1,
        instruction: 'Heat oil in a pan and cook beef with chili powder.',
      },
      { id: 2, step: 2, instruction: 'Warm tortillas in a separate pan.' },
      {
        id: 3,
        step: 3,
        instruction: 'Assemble tacos with beef, tomatoes, lettuce, and cheese.',
      },
      { id: 4, step: 4, instruction: 'Serve immediately.' },
    ],
    nutrition: [
      { id: 1, name: 'Calories', value: '400 kcal' },
      { id: 2, name: 'Protein', value: '20g' },
      { id: 3, name: 'Carbohydrates', value: '30g' },
      { id: 4, name: 'Fat', value: '22g' },
    ],
    uploader: {
      id: 'usr_106',
      image: 'https://api.dicebear.com/9.x/initials/svg?seed=Carlos%20Lopez',
      name: 'Carlos Lopez',
    },
    slug: 'beef-tacos',
  },
];

export async function getAllRecipes() {
  return RECIPES;
}

export async function getRecipeBySlug(slug: string) {
  return RECIPES.find((r) => r.slug === slug);
}
