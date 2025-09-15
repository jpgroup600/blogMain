import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { blogId } = req.body;

  if (!blogId) {
    return res.status(400).json({ message: 'Blog ID is required' });
  }

  try {
    // Get current blog data
    const blogResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs/${blogId}`
    );

    const currentBlog = blogResponse.data;
    const currentViewCount = currentBlog.viewCount || 0;

    // Calculate new trending score (views + recency factor)
    const now = new Date();
    const createdAt = new Date(currentBlog.createdAt);
    const daysSinceCreation = Math.max(1, (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    
    // Trending score: viewCount / daysSinceCreation (higher score = more trending)
    const newTrendingScore = Math.round((currentViewCount + 1) / daysSinceCreation * 100) / 100;

    // Prepare update data
    const updateData = {
      viewCount: currentViewCount + 1,
      trendingScore: newTrendingScore,
      lastViewedAt: now.toISOString(),
    };

    // Update blog with new view count and trending score
    await axios.patch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs/${blogId}`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    res.status(200).json({ 
      success: true, 
      viewCount: currentViewCount + 1,
      trendingScore: newTrendingScore
    });
  } catch (error) {
    console.error('Error tracking view:', error);
    res.status(500).json({ 
      message: 'Error tracking view', 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
