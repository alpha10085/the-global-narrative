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
    title: "Latest News",
    categories,
  };
};

export const getFakeNews = () => {
  const news = [
    {
      _id: "news-1",
      slug: "narrative-pr-summit-2025-red-sea",
      title:
        "Narrative PR Summit 2025 Launches in Red Sea Under Leadership of Mohamed Mansour",
      poster: {
        url: "https://static.zawya.com/view/acePublic/alias/contentid/2db68e52-590a-4a33-bd14-d418575f0d04/0/2025-6.webp?f=3%3A2&q=0.75&w=828",
      },
      description:
        "The 9th Narrative PR Summit will take place in April 2025 in the Red Sea, focusing on tourism, investment, and sports, with the backing of the private sector and Egyptian ministries. Chaired by Mohamed Mansour, the summit introduces the Storytellers Awards for young content creators.",
      content: [
        {
          title: "A Vision for Egypt’s Future",
          description:
            "The 2025 edition of the Narrative PR Summit sets a strategic vision around tourism, investment, and sports, aiming to showcase Egypt’s strengths and attract international investment.",
        },
        {
          title: "A Board of Global Influencers",
          description:
            "Led by Mohamed Mansour, the summit's board includes prominent figures such as Dr. Khaled El-Enany, Sir Ben Elliot, Azza Fahmy, Yousra, and others, reinforcing the summit's global outreach and influence.",
        },
        {
          title: "Empowering Young Storytellers",
          description:
            "Lamia Kamel announced the launch of the Storytellers Awards to celebrate young social media creators who present a modern and vibrant image of Egypt across platforms like podcasts and reels.",
        },
        {
          title: "Toward a Year-Round Initiative",
          description:
            "The summit aims to become a permanent platform promoting economic collaboration, private sector growth, and global partnerships through structured, ongoing initiatives beyond the annual event.",
        },
      ],
      category: categories?.[0],
      createdAt: new Date("2025-05-29T10:00:00Z"),
    },
    {
      _id: "news-2",
      slug: "egypt-joins-global-alliance-pr-2025",
      title:
        "Egypt Launches First National PR Association and Joins Global Alliance at Narrative Summit 2025",
      poster: {
        url: "https://static.zawya.com/view/acePublic/alias/contentid/e3d56b39-1527-4ace-a588-89c79b4c5687/0/img-20250415-wa0001-jpg.webp?f=3%3A2&q=0.75&w=828",
      },
      description:
        "During the closing of Narrative Summit 2025 in Somabay, Egypt officially launched its first national PR association and joined the Global Alliance for Public Relations, becoming the first North African country to do so.",
      content: [
        {
          title: "Egypt’s PR Sector Reaches a Milestone",
          description:
            "Egypt launched its first national PR association, uniting top PR agencies and marking a historic step for the industry in North Africa.",
        },
        {
          title: "Joining the Global Alliance",
          description:
            "The association officially joined the Global Alliance, with leaders from the international federation present at the summit to mark the occasion.",
        },
        {
          title: "A Platform for Growth and Training",
          description:
            "The new body aims to raise awareness, empower young PR talent through training programs, and promote Egypt’s global image through unified storytelling.",
        },
        {
          title: "Narrative Summit 2025 Closes with Impact",
          description:
            "Held under the theme 'Egypt Reset', the summit hosted global speakers and officials, reinforcing the country's strategic vision in communications and development.",
        },
      ],
      category: categories?.[0],
      createdAt: new Date("2025-05-30T10:00:00Z"),
    },
    {
      _id: "news-3",
      slug: "next-in-summit-saudi-arabia-cultural-vision",
      title:
        "NEXT IN Summit 2025 Highlights Saudi Arabia's Bold Cultural Vision",
      poster: {
        url: "https://static.zawya.com/view/acePublic/alias/contentid/abf1ae87-a9d6-4f2d-b675-4c2a1e10bbda/0/creativenations-jpg.webp?f=3%3A2&q=0.75&w=828",
      },
      description:
        "Held in Madrid, the NEXT IN Summit 2025 brought together global cultural leaders, with a spotlight on Saudi Arabia's transformative cultural initiatives led by emerging institutions, immersive spaces, and youth-focused programming.",
      content: [
        {
          title: "Saudi Arabia Showcases Cultural Momentum",
          description:
            "Key figures from Saudi Arabia, including Arwa Al Ali, Noura Al-Maashouq, Hamad Alhomiedan, and Sean Gaffaney, shared the Kingdom’s strategic vision for future-facing cultural institutions at the global summit.",
        },
        {
          title: "Creative Platforms and Blank Canvases",
          description:
            "Speakers emphasized the opportunity to build institutions from scratch, fostering experimentation, collaboration, and community-focused programming across spaces like SAMOCA and AlUla.",
        },
        {
          title: "Museums as Tools for Dialogue and Imagination",
          description:
            "From the Islamic Arts Biennale to Ilmi’s STEAM-focused programs, Saudi institutions are redefining engagement through innovation, inclusion, and reimagined civic spaces.",
        },
        {
          title: "Global Insights and a Roadmap for Innovation",
          description:
            "Alongside Saudi voices, global experts discussed the role of museums in expanding digital access and sustainability. ACCIONA unveiled 'The Ultimate Museum Book', promoting best practices aligned with Vision 2030.",
        },
      ],
      category: categories?.[0],
      createdAt: new Date("2025-05-01T10:00:00Z"),
    },
    {
      _id: "news-4",
      slug: "richmind-launches-oystra-zaha-hadid-al-marjan",
      title:
        "Richmind Launches ZHA-Designed Oystra Project on Al Marjan Island",
      poster: {
        url: "https://static.zawya.com/view/acePublic/alias/contentid/f487852c-0902-4041-90a7-15256af1bc89/0/almarjan1-jpg.webp?f=3%3A2&q=0.75&w=828",
      },
      description:
        "Richmind enters the UAE with 'Oystra', a bold architectural statement by Zaha Hadid Architects on Al Marjan Island, blending cutting-edge design, luxury lifestyle, and cultural engagement in Ras Al Khaimah.",
      content: [
        {
          title: "Richmind's UAE Debut with ZHA",
          description:
            "Richmind unveiled its luxury project 'Oystra', designed by Zaha Hadid Architects, as its first entry into the UAE market during a grand launch event at Coca-Cola Arena Dubai.",
        },
        {
          title: "A Fusion of Vision and Design",
          description:
            "CEO Mohammad Rafiee described Oystra as a landmark of visionary living and a testament to Richmind's commitment to originality, design innovation, and global architectural excellence.",
        },
        {
          title: "Cultural and Creative Synergy",
          description:
            "The launch included a live performance by Craig David and celebrated local talent Edenojie, winner of the 'Sing Your Way To 30K' competition, showcasing Richmind’s dedication to artistic expression.",
        },
        {
          title: "Architectural Marvel with Lifestyle Amenities",
          description:
            "Oystra offers a mix of apartments, villas, and penthouses with Gulf views, featuring luxury amenities like a 360-degree infinity pool, wellness areas, beach club, and more, starting at AED 2.9M with handover in Q1 2029.",
        },
      ],
      category: categories?.[2],
      createdAt: new Date("2025-05-03T14:00:00Z"),
    },
    {
      _id: "news-5",
      slug: "narrative-summit-2025-egypt-private-sector-growth",
      title:
        "Private Sector’s Role in Egypt’s Economic Growth Spotlighted at Narrative Summit 2025",
      poster: {
        url: "https://static.zawya.com/view/acePublic/alias/contentid/afbb7820-82ff-434f-8156-5db343f3b02d/0/img-20250410-wa0061-jpg.webp?f=3%3A2&q=0.75&w=828",
      },
      description:
        "Held under multiple Egyptian ministries, the Narrative Summit 2025 emphasized the vital role of the private sector in driving long-term national prosperity, with insights from Anchorage Investments' Dr. Ahmed Moharram.",
      content: [
        {
          title: "Narrative Summit 2025 Opens with 'Egypt Reset' Theme",
          description:
            "The ninth edition of the summit kicked off in Somabay, Egypt, bringing together global leaders to explore economic transformation through investment, tourism, and sports under official ministerial patronage.",
        },
        {
          title: "Dr. Ahmed Moharram on Private Sector Empowerment",
          description:
            "Anchorage Investments' founder emphasized the strategic value of export-oriented industries, citing the USD 2.2B Anchor Benitoite Petrochemical Complex in Ain Sokhna as a growth catalyst.",
        },
        {
          title: "Addressing Enablers and Challenges",
          description:
            "Dr. Moharram discussed Egypt’s geographic advantages, policy needs, and the importance of regulatory simplification and decarbonization partnerships to attract private greenfield investment.",
        },
        {
          title: "A Sustainable Ecosystem for the Future",
          description:
            "He stressed the necessity of building a long-term business-friendly ecosystem to ensure generational value creation through thriving private enterprise and entrepreneurship.",
        },
        {
          title: "Narrative’s Broader Vision",
          description:
            "The summit, launched in 2016, aims to elevate Egypt’s international standing through collaboration and storytelling—this year introducing the 'Storytellers Awards' for young digital creatives.",
        },
      ],
      category: categories?.[4],
      createdAt: new Date("2025-05-04T14:00:00Z"),
    },

    {
      _id: "59596",
      slug: "5-Steps-to-Mastering-PR-Events-Learn-from-Our-Success-Stories",
      title: "5 Steps to Mastering PR Events: Learn from Our Success Stories",
      poster: {
        url: "https://cc-plus.com/wp-content/uploads/2023/02/50d18d43-29c9-4680-8525-5e0319d2d978.jpg",
      },
      description:
        "Discover how to elevate your public relations events with actionable steps inspired by our most successful case studies.",
      content: [
        {
          title: "Step 1: Set Clear Objectives",
          description:
            "Begin with a focused vision and KPIs to guide your PR event planning and execution.",
        },
        {
          title: "Step 2: Craft a Compelling Narrative",
          description:
            "Align messaging with brand values and audience interests to capture attention.",
        },
        {
          title: "Step 3: Choose the Right Venue and Timing",
          description:
            "Ensure your location and scheduling complement your goals and audience preferences.",
        },
        {
          title: "Step 4: Engage Through Storytelling",
          description:
            "Leverage visual, experiential, and digital elements to enhance storytelling.",
        },
        {
          title: "Step 5: Measure Impact and Iterate",
          description:
            "Use post-event metrics and feedback to optimize future campaigns.",
        },
      ],
      category: categories?.[4],
      createdAt: new Date("2023-08-02T00:00:00Z"),
    },
    {
      _id: "595960",
      slug: "pr-theater-two-sides-of-the-same-coin",
      title: "PR & Theater: Two Sides of The Same Coin",
      poster: {
        url: "https://cc-plus.com/wp-content/uploads/2023/03/adcb7d5c-3b55-4b03-b359-c6e228e858c9.jpg",
      },
      description:
        "Explore how the worlds of public relations and theater intersect to influence audience perception and storytelling.",
      content: [
        {
          title: "Shared Elements of Storytelling",
          description:
            "Both PR and theater rely on emotional arcs and audience engagement to deliver messages effectively.",
        },
        {
          title: "Role of Timing and Performance",
          description:
            "Strategic timing and delivery in PR mimic theatrical performance techniques to maximize impact.",
        },
      ],
      category: categories?.[0],
      createdAt: new Date("2023-08-02T00:00:00Z"),
    },
    {
      _id: "59526",
      slug: "cop27-breathes-new-life-into-sharm-el-sheikh-after-covid-19-paralysis",
      title:
        "COP27 Breathes New Life Into Sharm El Sheikh After Covid-19 Paralysis",
      poster: {
        url: "https://cc-plus.com/wp-content/uploads/2022/11/314894091_494549482705912_8007404359689407650_n-1.jpg",
      },
      description:
        "The global climate summit repositions Sharm El Sheikh as a hub of diplomacy, sustainability, and tourism post-pandemic.",
      content: [
        {
          title: "COP27's Economic Impact",
          description:
            "The summit generated momentum in hospitality, tourism, and infrastructure sectors in Sharm El Sheikh.",
        },
        {
          title: "Global Spotlight on Sustainability",
          description:
            "Egypt seized the moment to lead climate conversations and showcase its green transition strategy.",
        },
      ],
      category: categories?.[2],
      createdAt: new Date("2023-08-02T00:00:00Z"),
    },
  ];
  return news;
};

export const getFakeOneNews = (slug) => {
  const news = getFakeNews();
  const result = news.find((val) => val?.slug === slug);
  return result ? result : notFound();
};
