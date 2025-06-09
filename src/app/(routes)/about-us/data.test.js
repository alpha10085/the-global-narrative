export const getAboutUSPage = () => {
  return {
    metadata: {
      title: "About Us - The Global Narrative",
      description:
        "Purposeful storytelling and strategic communications across borders.",
    },
    hero: {
      title: "Crafting Narratives That Resonate Globally",
      description: `The Global Narrative is a strategic communications and public relations agency based in Cairo and Riyadh, helping brands, public figures, and institutions craft powerful, purpose-driven stories. We specialize in CEO profiling, strategic partnerships, and reputation management. With deep regional insight and global perspective, we create messaging that builds influence and long-term trust across borders.`,
      poster: {
        url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1746303984/Edge-374_lgoqzj.jpg",
      },
    },
    whoUsSectionSection: {
      title: "who us?",
      members: [
        {
          _id: "1",
          name: "Lamia Kamel",
          jobTitle: "Co-founder of The Global Narrative",
          description:
            "Founder of CC Plus and the Narrative PR Summit, Lamia brings vast experience in strategic partnerships and public promotion.",
          image: {
            url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1746310288/14-819x1024_kxu7hj.png",
          },
        },
        {
          _id: "6",
          name: "Hania Moussa",
          jobTitle: "Co-founder of The Global Narrative",
          description:
            "Co-founder dedicated to high-level PR tailored for global leaders and mission-driven initiatives.",
          image: {
            url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1746347562/1744720113467_ntt3i5.jpg",
          },
        },
      ],
    },
  };
};

