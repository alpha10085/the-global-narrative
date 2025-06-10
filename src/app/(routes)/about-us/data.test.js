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
    ourValues: {
      title: "Capabilities",
      cards: [
        {
          _id: "vr0v",
          title: "Clarity",
          description:
            "We communicate simply and clearly. We avoid overcomplication and focus on what really needs to be said.",
        },
        {
          _id: "vr2v",
          title: "Trust",
          description: `We build strong, lasting relationships by working with honesty and consistency. Our clients know we are discreet, reliable, and grounded in real-world experience.`,
        },
        {
          _id: "vr1v",
          title: "Adaptability",
          description: `Each client is different. We tailor our work to fit individual needs, local contexts, and changing circumstances`,
        },
        {
          _id: "vr3v",
          title: "Depth",
          description: `
We go beyond surface-level messaging. Our work is rooted in research, insight, and a deep understanding of the issues our clients care about.
`,
        },
      ],
    },
    aboutUs: {
      title: "What we do",
      description: `The Global Narrative is a strategic communications firm with a mission to shape impactful stories across borders, With offices in Cairo and Riyadh, we work with global public figures, executive leaders, and mission-driven organizations to craft narratives that build trust, influence opinion, and inspire change.

Blending insight with creativity, we offer services in executive branding, nation branding, strategic partnerships, and crisis communication, Our integrated approach spans media relations, public events, and long-term positioning strategies—ensuring that every message is aligned, authentic, and built to last in today’s fast-paced media landscape.`,
    },
    quoteSection: {
      title: "Our Vision",
      description: `We aim to become the leading PR firm in the region for individuals and projects that require more than a generic PR solution. We believe in long-term partnerships, thoughtful planning, and the value of speaking with precision.`,
    },
  };
};
