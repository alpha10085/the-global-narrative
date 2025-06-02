import { notFound } from "next/navigation";

const categories = [
  {
    _id: "1",
    slug: "public",
    title: "Public",
  },
  {
    _id: "2",
    slug: "communication",
    title: "Communication",
  },
  {
    _id: "3",
    slug: "sustainability",
    title: "Sustainability",
  },
  {
    _id: "4",
    slug: "business",
    title: "Business",
  },
  {
    _id: "5",
    slug: "event",
    title: "Event",
  },
];

export const getpage = () => {
  return {
    title: "New insights and analysis, from where we stand.",
    subTitle: "Perspectives",
    categories,
  };
};

export const getFakeNews = () => {
  const news = [
    {
      _id: "news-1",
      slug: "the-global-narrative-lamia-kamel-and-hania-amr-moussa-launch-a-bold-vision-for-regional-storytelling",
      title:
        "The Global Narrative: Lamia Kamel and Hania Amr Moussa Launch a Bold Vision for Regional Storytelling",
      poster: {
        url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1748824343/Edge-46_qgesrz.jpg",
      },
      content: `
      Born out of the Narrative Summit, ‘Global Narrative’ is a new venture spanning Cairo and Riyadh (and soon the world!) that places purpose-driven PR at the heart of cultural revival and regional storytelling.

At the close of the 2025 Narrative Summit, as the final applause echoed through the auditorium, a new story began—one not told from a podium but designed to shape policies and perceptions.

Global Narrative is a bold new venture by leading communications firm CC Plus and co-founded by Lamia Kamel and Hania Amr Moussa, dedicated to reshaping how Egypt—and the wider region—tells its story on the global stage. With offices in both Cairo and Riyadh, the platform moves beyond conventional PR to something far more ambitious: strategic nation branding, cultural diplomacy, and personal positioning for regional leaders operating on the world stage.

But this isn’t PR for PR’s sake.

“We’ve learned that storytelling, when rooted in purpose, becomes one of the most powerful tools for transformation,” says Lamia Kamel, Managing Director of CC Plus and founder of the Narrative Summit. “Global Narrative is a natural extension of everything we’ve built—from our regional growth to our commitment to Egypt’s cultural and global relevance.”

Under the banner ‘PR with Purpose’, the new company is set to offer tailored communication strategies, executive branding for changemakers, and strategic visibility campaigns for public and private sector entities. Its goal? To amplify Egypt’s voice, not just as a tourist destination or emerging market, but as a cultural, intellectual, and economic hub that belongs in the center of global conversations.

For co-founder Hania Moussa, the timing couldn’t be more urgent. “We need to move past surface-level narratives,” she explains. “It’s time to talk about what connects us as a region, from culture and tourism to innovation and development. Through Global Narrative, we’re not just telling stories, we’re shaping them, together.”

In many ways, Global Narrative carries forward the founding vision of the Narrative Summit itself, a platform that has, over the years, gathered Egypt’s top business minds, creatives, and policymakers to reimagine the country’s future. With this new venture, that vision gains operational teeth: a full-fledged firm tasked with exporting Egypt’s best-kept stories and ensuring they reach the audiences that matter.
      `,
      category: categories?.[0],
      date: new Date("2025-05-29T10:00:00Z"),
    },

    {
      _id: "news-1",
      slug: "the-global-narrative-a-bold-vision-for-regional-storytelling",
      title: "the Global Narrative: A Bold Vision for Regional Storytelling",
      poster: {
        url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1748824551/499498873_1202408518562769_7290105171184954584_n_nlyzpp.jpg",
      },
      content: `
      What comes after the applause? For Lamia Kamel and Hania Amr Moussa, it’s a bold new beginning. Introducing The Global Narrative—a strategic communications firm with heart, heritage, and a mission to redefine how Egypt and the region are seen on the world stage.

With offices in Cairo and Riyadh, the platform goes beyond traditional PR, diving into purposeful storytelling, executive positioning, and nation branding.

Built on the legacy of the Narrative Summit, this new chapter champions stories that matter—those rooted in culture, innovation, diplomacy, and impact.

It’s not just about crafting messages—it’s about curating identity. And for Egypt, that story is only just beginning
      `,
      category: categories?.[0],
      date: new Date("2025-05-29T10:00:00Z"),
    },

    {
      _id: "news-1",
      slug: "cc-plus-launches-the-global-narrative-to-elevate-egypts-voice-on-the-world-stage",
      title:
        "CC Plus Launches 'The Global Narrative' to Elevate Egypt's Voice on the World Stage",
      poster: {
        url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1748824933/490698474_18504949264001879_6268020584375392203_n_lhorie.jpg",
      },
      content: `
  NEW CHAPTER, SAME MISSION: THE FOUNDERS OF NARRATIVE SUMMIT LAUNCH ‘THE GLOBAL NARRATIVE’ TO REDEFINE HOW EGYPT TELLS ITS STORY.

At the close of the 2025 Narrative Summit, as the final applause echoed through the auditorium, a new story began - one designed to shape policies and perceptions.

The Global Narrative is a bold new platform co-founded by communications leaders Lamia Kamel and Hania Amr Moussa. With offices in Cairo and Riyadh, it moves beyond conventional PR into strategic nation branding, cultural diplomacy, and personal positioning for regional leaders.

But this isn’t PR for PR’s sake.

“We’ve learned that storytelling, when rooted in purpose, becomes one of the most powerful tools for transformation,” says Kamel. “The Global Narrative is a natural extension of everything we’ve built, from regional growth to our commitment to Egypt’s cultural and global relevance.”

Under the banner ‘PR with Purpose’, the company offers tailored communications, executive branding, and strategic visibility for changemakers and institutions. Its goal? To amplify Egypt’s voice, not just as a destination or market, but as a cultural and intellectual hub.

“We need to move past surface-level narratives,” adds Moussa. “It’s time to focus on what connects us—from culture and tourism to innovation and development.”

The Global Narrative carries forward the Narrative Summit’s founding vision, now as a full-fledged firm built to export Egypt’s most compelling stories to the audiences that matter.
      `,
      category: categories?.[0],
      date: new Date("2025-05-29T10:00:00Z"),
    },
  ];

  return news;
};

export const getFakeOneNews = (slug) => {
  const news = getFakeNews();
  const result = news.find((val) => val?.slug === slug);
  return result ? result : notFound();
};
