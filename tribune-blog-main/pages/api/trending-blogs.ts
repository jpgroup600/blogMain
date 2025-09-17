import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { limit = 10, category } = req.query;

  try {
    let url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blogs?sort=-trendingScore&limit=${limit}`;
    
    if (category) {
      url += `&where[category][equals]=${category}`;
    }

    const response = await axios.get(url);
    const blogs = response.data?.docs || [];

    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Error fetching trending blogs:', error);
    res.status(500).json({ message: 'Error fetching trending blogs' });
  }
}
