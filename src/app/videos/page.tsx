import type { Metadata } from 'next';
import { VideosClient } from './videos-client';

export const metadata: Metadata = {
  title: '视频',
  description: '小星同学TX 的视频合集 —— 美食博主时期的做饭日常与生活记录。',
};

export default function VideosPage() {
  return <VideosClient />;
}
