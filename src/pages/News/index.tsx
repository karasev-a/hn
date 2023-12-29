import React, { useEffect, useState } from "react";
import Story, { IStory } from "@/components/Story";
import { getStoriesIds, topStoriesUrl, getStories } from "@/services/api";

const STORIES_PER_PAGE = 5;

const News: React.FC<any> = () => {
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchStoryIds = async () => {
    const storiesId = await getStoriesIds(topStoriesUrl);

    setStoryIds(storiesId);
  };

  const fetchMoreStories = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    const start = (page - 1) * STORIES_PER_PAGE;
    const end = start + STORIES_PER_PAGE;
    const storiesToFetch = storyIds.slice(start, end);

    const fetchedStories = await getStories(storiesToFetch);
    setStories((prevStories) => [...prevStories, ...fetchedStories]);
    setPage((prevPage) => prevPage + 1);

    if (storyIds.length && end > storyIds.length) {
      setHasMore(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchStoryIds();
  }, []);

  useEffect(() => {
    storyIds.length && fetchMoreStories();
  }, [storyIds]);

  return (
    <div>
      {stories.map((story, i) => (
        <Story key={story.id} index={i + 1} story={story} />
      ))}
      {hasMore && (
        <button onClick={fetchMoreStories} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default News;
