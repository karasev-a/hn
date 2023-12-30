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
