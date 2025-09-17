import { useEffect, useRef } from 'react';

interface UseViewTrackerProps {
  blogId: string;
  enabled?: boolean;
}

export const useViewTracker = ({ blogId, enabled = true }: UseViewTrackerProps) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!enabled || !blogId || hasTracked.current) return;

    const trackView = async () => {
      try {
        const response = await fetch('/api/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ blogId }),
        });
        
        if (response.ok) {
          hasTracked.current = true;
        }
      } catch (error) {
        console.error('Failed to track view:', error);
      }
    };

    // Track view after a short delay to ensure user actually viewed the content
    const timer = setTimeout(trackView, 2000);

    return () => clearTimeout(timer);
  }, [blogId, enabled]);
};
