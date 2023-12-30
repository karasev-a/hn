import React, { useEffect, useState } from "react";
import Story, { IStory } from "@/components/Story";
import Button from "@/components/Button";

import {
  getStoriesIds,
  getStories,
  newStories,
  topStories,
} from "@/services/api";

import styles from "./news.module.scss";

const STORIES_PER_PAGE = 5;

const News: React.FC<any> = () => {
  const options = {
    Top: topStories,
    Newest: newStories,
    Past: Date.now().toString(),
  };

  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(options.Top);

  const fetchStoryIds = async (type: string) => {
    const storiesId = await getStoriesIds(type);

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
    fetchStoryIds(selectedOption);
  }, []);

  useEffect(() => {
    setStories([]);
    setPage(1);
    storyIds.length && fetchStoryIds(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    storyIds.length && fetchMoreStories();
  }, [storyIds]);

  return (
    <div className={styles.news}>
      <div className={styles.options}>
        {Object.keys(options).map((el) => {
          const optionKey = el as keyof typeof options;
          return (
            <Button
              key={el}
              name={el}
              type="text"
              value={options[optionKey]}
              isSelected={selectedOption == options[optionKey]}
              setSelectedOption={setSelectedOption}
              handleClick={() => setSelectedOption(options[optionKey])}
            />
          );
        })}
      </div>
      {stories.map((story, i) => (
        <Story key={story.id} index={i + 1} story={story} />
      ))}
      {hasMore && (
        <Button
          name={isLoading ? "Loading..." : "Load More"}
          type="primary"
          disabled={isLoading}
          handleClick={fetchMoreStories}
        />
      )}
    </div>
  );
};

export default News;
