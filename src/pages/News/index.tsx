import React from "react";
import Story from "../../components/Story";

import styles from "./news.module.scss";

const mockStories = [
  {
    by: "andric",
    descendants: 21,
    id: 38769850,
    kids: [
      38772324, 38772270, 38772792, 38772554, 38772191, 38772221, 38772788,
      38772168, 38769909, 38769851, 38772532, 38772520, 38772285,
    ],
    score: 999999,
    time: 1703578905,
    title:
      "Black Triangles (2014) Black Triangles (2014) Black Triangles (2014) Black Triangles (2014) Black Triangles (2014)",
    type: "story",
    url: "https://rampantgames.com/blog/?p=7745",
  },
  {
    by: "momonga",
    descendants: 29,
    id: 38769700,
    kids: [
      38772315, 38773062, 38773327, 38773450, 38772659, 38772707, 38773305,
      38773347, 38773139, 38773126, 38769964, 38772572, 38772733, 38772239,
      38770240, 38772433, 38773268,
    ],
    score: 46,
    time: 1703577205,
    title: "Lab Notebooks (2020)",
    type: "story",
    url: "https://sambleckley.com/writing/lab-notebooks.html",
  },
];

const News: React.FC<any> = () => {
  return (
    <div>
      {mockStories.map((story, i) => {
        return <Story key={i} index={i + 1} story={story} />;
      })}
    </div>
  );
};

export default News;
