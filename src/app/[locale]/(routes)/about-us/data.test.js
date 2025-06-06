export const getAboutUSPage = () => {
  return {
    metadata: {
      title: "About Us - The Global Narrative",
      description:
        "Purposeful storytelling and strategic communications across borders.",
    },
    hero: {
      title: "Individual talent collective purpose",
      description:
        "Backed by the leading earned-first network, we’re built to make change. To lead in making bold moves that elicit action.",
      poster: {
        url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1746303984/Edge-374_lgoqzj.jpg",
      },
    },
    ourValueSection: {
      title: "our core values",
      cards: [
        {
          title: "Clarity",
          description:
            "We craft clear and purposeful messages that resonate across borders and cultures.",
        },
        {
          title: "Trust",
          description:
            "Building long-term relationships through honesty, consistency, and discretion.",
        },
        {
          title: "Adaptability",
          description:
            "Tailoring our approach to fit each client’s unique needs and local context.",
        },
        {
          title: "Depth",
          description:
            "Grounding our work in research, insight, and meaningful storytelling.",
        },
      ],
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
