const brandDomains = [
    "https://cc-plus.com/wp-content/uploads/2022/09/Logonetflix.png",
    "https://cc-plus.com/wp-content/uploads/2022/09/800px-ABB_logo.svg_.png",


    "https://cc-plus.com/wp-content/uploads/2023/11/BMS.png",
    "https://cc-plus.com/wp-content/uploads/2020/06/nestle-waters-vector-logo.png",

     "https://cc-plus.com/wp-content/uploads/2020/06/Mercedes-Benz-logo-2011-1920x1080-1.png",
     "https://cc-plus.com/wp-content/uploads/2022/03/UNICEF-Logo.wine_.png",


     "https://cc-plus.com/wp-content/uploads/2020/06/XIV4bumEXQgv6KXd4FMfel37i6MMtwSOMABAY-LOGO-CMYKANDPANTONE_001.jpg",

     "https://cc-plus.com/wp-content/uploads/2020/06/Toyota-logo-1989-2560x1440-1.png",

     "https://cc-plus.com/wp-content/uploads/2020/06/download-6.png",

     "https://cc-plus.com/wp-content/uploads/2020/11/logo.png",

     "https://cc-plus.com/wp-content/uploads/2023/01/12MlbeTlJBxMvdhlFZPD.jpg",

     "https://cc-plus.com/wp-content/uploads/2020/06/CIB_Logo.png",

     "https://cc-plus.com/wp-content/uploads/2020/06/vodafone-png-welcome-to-the-australian-arm-of-the-world-s-leading-mobile-telecommunications-company-head-in-store-to-find-your-talk-and-d.png",

     "https://cc-plus.com/wp-content/uploads/2020/06/MVLogo-Yellow.png",


     "https://cc-plus.com/wp-content/uploads/2020/06/untitled.png",

     "https://cc-plus.com/wp-content/uploads/2020/06/must-logo-web-min.gif",

     "https://cc-plus.com/wp-content/uploads/2020/06/AUC-AE-Logo-2line-2color-BO-rgb-v-tightcrop2.jpg",

     "https://cc-plus.com/wp-content/uploads/2020/06/1487073630_logo_400160_.png",
  ];
  
  export const customers = brandDomains?.map((domain, i) => ({
    title: domain.split(".")[0].toUpperCase(),
    link: `${domain}`,
    logo: {
      url: `${domain}`,
    },
  }));
  