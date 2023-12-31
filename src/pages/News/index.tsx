import React, { useEffect, useState } from "react";
import Story, { IStory } from "@/components/Story";
import Button from "@/components/Button";

import {
  getStoriesIds,
  getStories,
  getYesterdayStories,
  newStories,
  topStories,
} from "@/services/api";

import styles from "./news.module.scss";

const STORIES_PER_PAGE = 5;

const News: React.FC<any> = () => {
  const options = {
    Top: topStories,
    Newest: newStories,
    Past: "date",
  };

  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [stories, setStories] = useState<IStory[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>(options.Top);

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

  const fetchYesterdayStories = async () => {
    setIsLoading(true);
    const stories = await getYesterdayStories();
    setStories(stories);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStoryIds(selectedOption);
  }, []);

  useEffect(() => {
    setStories([]);
    setPage(1);
    if (selectedOption === topStories || selectedOption === newStories) {
      storyIds.length && fetchStoryIds(selectedOption);
    } else {
      fetchYesterdayStories();
    }
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
              disabled={isLoading}
              isSelected={selectedOption == options[optionKey]}
              handleClick={() => setSelectedOption(options[optionKey])}
            />
          );
        })}
      </div>
      {stories.map((story, i) => (
        <Story key={story.id} index={i + 1} story={story} />
      ))}
      {hasMore && selectedOption !== options.Past && (
        <Button
          name={isLoading ? "Loading..." : "Load More"}
          type="primary"
          disabled={isLoading}
          handleClick={fetchMoreStories}
        />
      )}

      {selectedOption === options.Past && isLoading && (
        <Button name={"Loading..."} type="primary" disabled={isLoading} />
      )}
    </div>
  );
};

export default News;
