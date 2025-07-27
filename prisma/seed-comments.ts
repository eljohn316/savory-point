import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

const comments = [
  {
    content:
      'OMG, this recipe changed my LIFE! I’ve made it 47 times this month. Even my picky toddler DEVOURED it. 10/10, will name my next child after you.',
    userId: '4Pq86o1mqiSculixQG57pMHAyVAa99uV',
  },
  {
    content:
      'I wept tears of joy when I took my first bite. The flavors danced on my tongue like a symphony. Absolute perfection!',
    userId: '6chaCjNFkaTA0I90EzBtucM8isg0u7im',
  },
  {
    content:
      'This was delicious! I made a few tweaks—used almond flour, swapped chicken for tofu, and omitted salt. Still turned out great!',
    userId: 'FAiWgOwY8lUet0anR4f2EuhgQb6xADyE',
  },
  { content: 'Yum! So good! Will make again!', userId: 'IxpFHRGnv6UtBBzV1PxbFm5mdoJqP9H8' },
  {
    content:
      'The recipe was okay. Flavors were bland, texture was off, and I burned it. But 5 stars because it’s probably my fault.',
    userId: 'a5eOcbzQ6FBggqnEeZDUNVE2xlV6GGsX',
  },
  {
    content:
      'Loved this! Didn’t have eggs, so I used mayonnaise. Ran out of sugar, so I used ketchup. Still amazing!',
    userId: 'dEE4nZzDqktfvx5s13cfLGXECFGxalem',
  },
  {
    content:
      'I would fight a bear for this recipe. I’ve dreamt about it three nights in a row. Send help (and more ingredients).',
    userId: 'qlJ7q8MuHmfHCW2J57GkUOPML32AKWtK',
  },
];

async function main() {
  try {
    for (const comment of comments) {
      (await prisma.comment.create({
        data: {
          content: comment.content,
          recipeId: 'cmdgrp4w4000biya4nbeb80qp',
          userId: comment.userId,
        },
      }),
        await new Promise((resolve) => setTimeout(resolve, 2000)));
      console.log('Recipe successfully added');
    }

    console.log('Comments successfully seeded');
  } catch (error) {
    console.log(error);
    console.log('Unable to seed comments table');
  }
}

main();
