import { notFound } from "next/navigation";

const categories = [
  {
    _id: "4",
    slug: "2021-episodes",
    title: "2021 Episodes",
  },
  {
    _id: "5",
    slug: "2020-episodes",
    title: "2020 Episodes",
  },
];



export const getFakeMediaCenter = () => {
  const mediaCenter = [
    {
      _id: `mediaCenter-55`,
      title: `The Founder and Managing Director of Narattive Summit and CC Plus: The "Voice of Egypt" Summit aims to promote Egypt in the best possible way.`,
      link: "https://www.youtube.com/watch?v=Zw9cvcJEyls&ab_channel=%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9%D9%88%D8%A7%D9%84%D9%86%D8%A7%D8%B3",
    },
    {
      _id: `mediaCenter-55`,
      title: `Lamia Kamel and Hania Amr talk about the goals of the "Voice of Egypt" Summit and the behind-the-scenes preparations for it.`,
      link: "https://www.youtube.com/watch?v=EDLDs12XPI4&ab_channel=%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9%D9%88%D8%A7%D9%84%D9%86%D8%A7%D8%B3",
    },
    {
      _id: `mediaCenter-55`,
      title: `Lamia Kamel: I'm happy with the reactions from the foreign guests and with seeing them view Egypt in such a civilized and positive light.`,
      link: "https://www.youtube.com/watch?v=yVml2eWWNRw&ab_channel=%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9%D9%88%D8%A7%D9%84%D9%86%D8%A7%D8%B3",
    },
    // add more mediaCenter...
  ];
  return mediaCenter;
};


export const getpage = () => {
  return {
    title: "Media center",
    categories,
  };
};