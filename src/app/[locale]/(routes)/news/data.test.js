import { notFound } from "next/navigation";

const categories = [
  {
    _id: "1",
    slug: "interior-design",
    title: "Interior Design",
  },
  {
    _id: "2",
    slug: "ior-deign",
    title: "ior Deign",
  },
  {
    _id: "4",
    slug: "design",
    title: "Design",
  },
  {
    _id: "5",
    slug: "interior",
    title: "Interior",
  },
];

export const getpage = () => {
  return {
    title: "Latest News",
    categories,
  };
};

export const getFakeNews = () => {
    const news = [
      {
        _id: `news-1`,
        slug: `theodore-armchair`,
        title: `Theodore Armchair`,
        poster: {
          url: "https://images.pexels.com/photos/7661068/pexels-photo-7661068.jpeg",
        },
        description:
          "Taking cues from mid-century designs at Soho House...",
        category: categories?.[0],
        createdAt: new Date("2025-05-29T10:00:00Z"),
      },
      {
        _id: `news-2`,
        slug: `mid-century-sofa`,
        title: `Mid-Century Sofa`,
        poster: {
          url: "https://images.pexels.com/photos/7222096/pexels-photo-7222096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        description: "Comfortable and vintage-inspired.",
        category: categories?.[1],
        createdAt: new Date("2025-05-30T12:00:00Z"),
      },
      {
        _id: `news-3`,
        slug: `modern-table-lamp`,
        title: `Modern Table Lamp`,
        poster: {
          url: "https://images.pexels.com/photos/7203727/pexels-photo-7203727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        description: "Sleek and minimalist lamp design.",
        category: categories?.[2],
        createdAt: new Date("2025-04-28T14:00:00Z"),
      },
      {
        _id: `news-4`,
        slug: `modern-table-lamp`,
        title: `Modern Table Lamp`,
        poster: {
          url: "https://images.pexels.com/photos/8373809/pexels-photo-8373809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        description: "Sleek and minimalist lamp design.",
        category: categories?.[2],
        createdAt: new Date("2025-04-28T14:00:00Z"),
      },
      {
        _id: `news-5`,
        slug: `modern-table-lamp`,
        title: `Modern Table Lamp`,
        poster: {
          url: "https://images.pexels.com/photos/7278886/pexels-photo-7278886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        description: "Sleek and minimalist lamp design.",
        category: categories?.[2],
        createdAt: new Date("2025-04-28T14:00:00Z"),
      },
      // add more news...
    ];
    return news;
  };
  

export const getFakeOneNews = (slug) => {
  const news = getFakeNews();
  const result = news.find((val) => val?.slug === slug);
  return result ? result : notFound();
};
