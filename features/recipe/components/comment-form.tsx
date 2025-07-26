'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function CommentForm() {
  async function comment(formData: FormData) {
    const content = formData.get('content') as string;
    console.log(content);
  }

  return (
    <form action={comment} className="space-y-4">
      <Textarea name="content" rows={4} placeholder="Write a comment..." required />
      <Button type="submit">Post comment</Button>
    </form>
  );
}
