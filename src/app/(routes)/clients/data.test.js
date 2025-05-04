const brandDomains = [
    "https://cc-plus.com/wp-content/uploads/2019/12/clients-57-photo.png",
    "https://cc-plus.com/wp-content/uploads/2019/12/clients-60-photo.jpg",
    "https://cc-plus.com/wp-content/uploads/2019/12/clients-40-photo.png",
    "ttps://cc-plus.com/wp-content/uploads/2019/12/clients-37-photo.jpg",
  ];
  
  export const customers = brandDomains?.map((domain, i) => ({
    title: domain.split(".")[0].toUpperCase(),
    link: `${domain}`,
    logo: {
      url: `${domain}`,
    },
  }));
  