import { getFakeNews } from "./news/data.test";

export const getHomePage = () => {
  return {
    metadata: {},
    heroSection: [
      {
        title: "We’re built for the era of earned",
        media: {
          mimetype: "image",
          url: "https://res.cloudinary.com/dpuygkgve/image/upload/v1746230310/Edge-81_vghfyo.jpg",
        },
      },
      {
        title: "Delivering value in a volatile world ",
        media: {
          mimetype: "image",
          url: "https://webershandwick.com/_next/image?url=https%3A%2F%2Fcms.webershandwick.com%2Fwp-content%2Fuploads%2F2025%2F01%2Fresize_csuite_cover.jpg&w=1920&q=75",
        },
      },
      {
        title: "Delivering value in a volatile world ",
        media: {
          mimetype: "image",
          url: "https://webershandwick.com/_next/image?url=https%3A%2F%2Fcms.webershandwick.com%2Fwp-content%2Fuploads%2F2025%2F04%2Fgoingup_sitehero.jpg&w=1920&q=75",
        },
      },
    ],
    aboutUsSection: {
      title: "WHERE VISION MEETS STRUCTURE",
      description:
        "We create architectural masterpieces that blend creativity, functionality, and purpose. From concept to construction",
    },
    quoteSection: {
      content: `
      Welcome to today’s Hill & Knowlton.

The original strategic communications consultancy, we were born a public relations pacesetter.

Nearly a century later, Hill & Knowlton is built for purpose...

Bringing together new combinations of people and intelligence.

Addressing today’s grand challenges.

Expanding our clients’ possibilities and success.

We are the global strategic communications leader for transformation, helping clients communicate to lead.
      `   },
    newsSection: {
      title: "Highlighted news",
      posts: getFakeNews(),
    },
    testimonialSection: {
      title: "Testimonials",
      posts: [
        {
          _id: "3",
          content:
            "CC Plus has been an invaluable partner to Art D’Égypte, enabling us to reach a wider audience and communicate our vision professionally. Narrative Summit by CC Plus is a testament to bringing influential people together. CC Plus is a key player and disruptor in the Egyptian PR and communications industry.",
          jobTitle: "Founder of Art D’Égypte",
          author: "Nadine Abdelghaffar",
          poster: {
            url: "https://cc-plus.com/wp-content/uploads/2020/07/Nadine.jpg",
          },
        },
        {
          _id: "2",
          content:
            "Ericsson has been supported by CC Plus team in areas of media outreach for long time now. Their impact on our drive to increase market awareness and media exposure has been overwhelmingly significant and reflects their strength at what they do. CC Plus has the full endorsement of Ericsson.",
          jobTitle:
            "Head of Public Relations, Middle East and East Africa, Ericsson",
          author: "Randa El Sawi",
          poster: {
            url: "https://pbs.twimg.com/profile_images/682151965313347584/BqvzzaGq_400x400.jpg",
          },
        },
        {
          _id: "1",
          content:
            "CC Plus is a definite recommendation for any corporate looking for a full public relations and communication firm that is agile, connected and results-driven. Their team has so far done an outstanding job in helping initiate and disperse NRP and NRP related entities’ messages and have helped efficiently in crisis management.",
          jobTitle: "NRP Managing Director",
          author: "Hala Hegazi",
          poster: {
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxi-FtxTqBf370zmwRZwhDTeo0QVRMOq2Etw&s",
          },
        },

        {
          _id: "4",
          content:
            "I worked with CC Plus in 2012 during my presidential campaign. They led several processes from planning to reporting. I enthusiastically endorse their high-quality skills in capturing my core message. Working with them was a campaign highlight.",
          jobTitle:
            "Former Presidential Candidate 2012 and Head of The Constitution Committee 2014",
          author: "H.E. Amr Moussa",
          poster: {
            url: "https://cc-plus.com/wp-content/uploads/2019/12/Amr-Mousa.png",
          },
        },
      ],
    },
    getInTouchSection: {
      title: "Get In Touch",
      description: `We’d love to hear from you  every great story starts with a simple hello.
Reach out and let’s create something meaningful together at the global Narrative .`,
      poster: {
        url: "https://narrativesummit.com/wp-content/uploads/2023/08/dji_fly_20230423_174802_65_1682264964438_photo-opt.jpg",
      },
    },
  };
};
