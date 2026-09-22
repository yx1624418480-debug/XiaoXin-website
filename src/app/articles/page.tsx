import type { Metadata } from 'next';
import { ArticlesClient } from './articles-client';

export const metadata: Metadata = {
  title: '文章',
  description: '小星同学TX 的 AI 科普图文笔记，把复杂的 AI 讲成大白话。',
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
