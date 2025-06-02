export const getpage = () => {
  return {
    title: "Our Services",
    description:
      "Strategic Public Relations solutions tailored to amplify your brand globally.",
    poster: {
      url: "https://res.cloudinary.com/dsed1slaz/image/upload/v1746294755/Edge-108_xthmz1.jpg",
    },
    services: [
      {
        _id: "1",
        title: "Media Relations",
        intro: "Crafting impactful narratives for the global media landscape.",
        description:
          "We build strong media relationships to ensure your brand gains positive exposure across all channels. From press releases to media training, we position you as a trusted industry leader.",
      },
      {
        _id: "2",
        title: "Crisis Management",
        intro:
          "Guiding your brand through turbulent times with clarity and control.",
        description:
          "Our rapid-response team helps protect your reputation with clear, strategic communication during crises. We minimize damage and restore trust with expert planning and execution.",
      },
      {
        _id: "3",
        title: "Digital PR & Social Media",
        intro:
          "Driving engagement and awareness through strategic digital storytelling.",
        description:
          "We combine PR expertise with social media tactics to elevate your brand online. From influencer partnerships to real-time engagement, we ensure your message connects and resonates.",
      },
      {
        _id: "4",
        title: "Strategic Partnerships",
        intro: "Building meaningful alliances to expand your impact.",
        description:
          "We facilitate strategic collaborations with governmental and industry partners, helping you grow influence and achieve long-term goals through tailored partnership strategies.",
      },
    ],
    contactSection: {
      title: "Get In Touch",
      description: `We’d love to hear from you. Every great story starts with a simple hello. Reach out and let’s create something meaningful together at The Global Narrative.`,
    },
    faqs: [
      {
        _id: "2",
        question: "What industries do you specialize in?",
        answer:
          "We work across tech, fashion, government, lifestyle, and more.",
      },
      {
        _id: "3",
        question: "Do you offer international PR coverage?",
        answer:
          "Yes, we operate globally with strong local expertise in each market.",
      },
      {
        _id: "5",
        question: "How do you measure campaign success?",
        answer:
          "Through KPIs like media reach, sentiment analysis, and engagement rates.",
      },
      {
        _id: "6",
        question: "Can you handle crisis situations?",
        answer:
          "Absolutely. We specialize in real-time crisis communication and reputation control.",
      },
    ],
  };
};
