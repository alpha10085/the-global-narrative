const metadata = {
  name: "metadata",
  type: "object",
  label: "SEO",
  fields: [
    {
      name: "title",
      type: "text",
      label: "title",
    },
    {
      name: "description",
      type: "textarea",
      label: "description",
    },
    {
      name: "images",
      type: "media",
      allowedTypes: ["image"],
      single: false,
      required: true,
      label: "images",
      placeholder: "Select images",
    },
  ],
};
export default metadata
