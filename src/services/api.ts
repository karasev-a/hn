import { IStory } from "@/components/Story";
import axios from "axios";

export const baseUrl = "https://hacker-news.firebaseio.com/v0/";
export const topStories = "topstories";
export const newStories = "newstories";
export const itemUrl = "item/";

export const getStoriesIds = async (path: string) => {
  try {
    const res = await axios.get(`${baseUrl}/${path}.json`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getStory = async (storyId: number) => {
  try {
    const res = await axios.get(`${baseUrl + itemUrl + storyId}.json`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getStories = async (ids: number[]): Promise<IStory[]> => {
  try {
    const promises = ids.map(async (id) => {
      const res = await getStory(id);
      return res;
    });
    const stories = await Promise.all(promises);
    return stories as IStory[];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getYesterdayStories = async () => {
  let date = new Date();
  let targetDate = new Date(
    date.setDate(date.getDate() - 2)
  ).toLocaleDateString("en-US");

  const stories = [];

  const storiesIds = await getStoriesIds("topstories");
  storiesIds.sort().reverse();

  console.log("newestStoriesId - ", storiesIds);

  let left = 0;
  let right = storiesIds.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let story = await getStory(storiesIds[mid]);
    let storyDate = new Date(story.time * 1000);
    let formattedDate = storyDate.toLocaleDateString("en-US");

    if (formattedDate === targetDate) {
      // If the middle item matches the target date, find all matching items
      let current = mid;

      while (current >= 0 && formattedDate === targetDate) {
        stories.push(story);
        current--;
        story = await getStory(storiesIds[current]);
        storyDate = new Date(story.time * 1000);
        formattedDate = storyDate.toLocaleDateString("en-US");
      }
      current = mid + 1;
      story = await getStory(storiesIds[current]);
      storyDate = new Date(story.time * 1000);
      formattedDate = storyDate.toLocaleDateString("en-US");

      while (current < storiesIds.length && formattedDate === targetDate) {
        stories.push(story);
        current++;
        story = await getStory(storiesIds[current]);
        storyDate = new Date(story.time * 1000);
        formattedDate = storyDate.toLocaleDateString("en-US");
      }
      break;
    } else if (formattedDate < targetDate) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return stories;
};
