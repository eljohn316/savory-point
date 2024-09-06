import { db } from '@/lib/db';
import { InstructionsList } from './instructions-list';

interface PageProps {
  params: { recipeId: string };
}

export default async function Page({ params }: PageProps) {
  const instructions = await db.instruction.findMany({
    orderBy: { id: 'asc' },
    where: { recipeId: params.recipeId }
  });

  return <InstructionsList instructions={instructions} />;
}
