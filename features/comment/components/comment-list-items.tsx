'use client';

import { Textarea } from '@/components/ui/textarea';
import { CommentListItem } from './comment-list-item';
import { Button } from '@/components/ui/button';

export type Comment = {
  id: string;
  user: { id: string; name: string };
  createdAt: Date;
  content: string;
  replyCount: number;
};

const COMMENTS: Comment[] = [
  {
    id: 'cmt_001',
    user: { id: 'usr_123', name: 'Maria Gonzalez' },
    createdAt: new Date('2024-05-15T10:30:00Z'),
    content:
      'This turned out amazing! The flavors were perfect, and my whole family loved it. Will definitely make it again!',
    replyCount: 3,
  },
  {
    id: 'cmt_002',
    user: { id: 'usr_456', name: 'David Kim' },
    createdAt: new Date('2024-05-16T14:45:00Z'),
    content:
      'Incredible recipe! So simple yet so delicious. I added a little extra spice, and it was perfect.',
    replyCount: 1,
  },
  {
    id: 'cmt_003',
    user: { id: 'usr_789', name: 'Sophie Carter' },
    createdAt: new Date('2024-05-17T09:20:00Z'),
    content:
      'I’ve tried many versions of this, but yours is by far the best. The texture and taste were just right!',
    replyCount: 0,
  },
  {
    id: 'cmt_004',
    user: { id: 'usr_101', name: 'James Wilson' },
    createdAt: new Date('2024-05-18T19:15:00Z'),
    content:
      'Fantastic recipe! Followed it exactly, and it came out perfect. Even my picky kids asked for seconds.',
    replyCount: 2,
  },
];

export function CommentListItems() {
  return (
    <div className="mt-28">
      <div className="space-y-4">
        <Textarea placeholder="Write a comment..." />
        <Button>Post comment</Button>
      </div>
      <div className="mt-16 space-y-8" id="recipe-comments">
        <p className="text-xl font-bold text-gray-700">Comments ({COMMENTS.length})</p>
        <div className="divide-y divide-gray-200">
          {COMMENTS.map((comment) => (
            <CommentListItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
