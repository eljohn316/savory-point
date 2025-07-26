import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

const comments = [
  // 'This turned out amazing! The flavors were perfect, and my whole family loved it. Will definitely make it again!',
  // 'Incredible recipe! So simple yet so delicious. I added a little extra spice, and it was perfect.',
  // 'I’ve tried many versions of this, but yours is by far the best. The texture and taste were just right!',
  'Really great. Anyone should try this!',
];

async function main() {
  try {
    const commentsPromises = comments.map((comment) =>
      prisma.comment.create({
        data: {
          content: comment,
          recipeId: 'cmdgrp4w4000biya4nbeb80qp',
          userId: 'a5eOcbzQ6FBggqnEeZDUNVE2xlV6GGsX',
        },
      }),
    );

    await Promise.all(commentsPromises);
    console.log('Comments successfully seeded');
  } catch (error) {
    console.log(error);
    console.log('Unable to seed comments table');
  }
}

main();
