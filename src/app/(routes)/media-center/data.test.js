import { notFound } from "next/navigation";

const categories = [
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
    title: "Media center",
    categories,
  };
};

export const getFakeMediaCenter = () => {
  const mediaCenter = [
    {
      _id: `mediaCenter-1`,
      title: `Theodore Armchair`,
      poster: {
        url: "https://images.pexels.com/photos/7661068/pexels-photo-7661068.jpeg",
      },
      video: {
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      description: "Taking cues from mid-century designs at Soho House...",
      category: categories?.[0],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-2`,
      title: `Theodore Armchair`,
      poster: {
        url: "https://images.pexels.com/photos/7661068/pexels-photo-7661068.jpeg",
      },
      video: {
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      description: "Taking cues from mid-century designs at Soho House...",
      category: categories?.[1],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-3`,
      title: `Theodore Armchair`,
      poster: {
        url: "https://images.pexels.com/photos/7661068/pexels-photo-7661068.jpeg",
      },
      video: {
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      description: "Taking cues from mid-century designs at Soho House...",
      category: categories?.[0],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-4`,
      title: `Theodore Armchair`,
      poster: {
        url: "https://images.pexels.com/photos/7661068/pexels-photo-7661068.jpeg",
      },
      video: {
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      description: "Taking cues from mid-century designs at Soho House...",
      category: categories?.[1],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: `mediaCenter-5`,
      title: `Theodore Armchair`,
      poster: {
        url: "https://images.pexels.com/photos/7661068/pexels-photo-7661068.jpeg",
      },
      video: {
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      description: "Taking cues from mid-century designs at Soho House...",
      category: categories?.[0],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    // add more mediaCenter...
  ];
  return mediaCenter;
};
