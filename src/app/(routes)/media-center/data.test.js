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

export const getpage = () => {
  return {
    title: "Media center",
    categories,
  };
};

export const getFakeMediaCenter = () => {
  const mediaCenter = [
    {
      _id: `mediaCenter-55`,
      title: `Narrative Talks, Reshaping Norms, Art: Egypt's Story`,
      link: "https://www.youtube.com/watch?v=fckDHkpNQr0",
      category: categories?.[1],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-44`,
      title: `Egypt’s Digitalization: Unlocking Possibilities | Narrative Talks, Reshaping Norms`,
      link: "https://www.youtube.com/watch?v=G98ZDzmPlhU",
      category: categories?.[1],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-33`,
      title: `Narrative Summit Reshaping Norms`,
      link: "https://www.youtube.com/watch?v=pwl7InnaxWU",
      category: categories?.[1],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-1`,
      title: `Karim Shehata, S3 On Narrative Talks: Reshaping Norms`,
      link: "https://www.youtube.com/watch?v=qk75RnKVRaM",
      category: categories?.[0],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },


    {
      _id: `mediaCenter-2`,
      title: `Tamer Bagato, On S4, Narrative Talks: Reshaping Norms`,
      link: "https://www.youtube.com/watch?v=OwW6YwMnqJQ",
      category: categories?.[0],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-3`,
      title: `Nabila Makram - E2S3 on Narrative Talks:Reshaping Norms`,
      link: "https://www.youtube.com/watch?v=ToW_J1k40tU",
      category: categories?.[0],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-4`,
      title: `Sarah Gallo, S2 on Narrative talks: Reshaping Norms`,
      link: "https://www.youtube.com/watch?v=BbL2pVWk8iE",
      category: categories?.[0],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-5`,
      title: `Nadine Abdel Gaffar, on S4 of Narrative Talks: Reshaping Norms`,
      link: "https://www.youtube.com/watch?v=q7Tzd3JH1Ko",
      category: categories?.[0],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    // add more mediaCenter...
  ];
  return mediaCenter;
};
