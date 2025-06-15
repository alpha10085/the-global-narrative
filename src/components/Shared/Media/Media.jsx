const { default: Img } = require("../img/Img");
const { default: VideoPlayer } = require("../Video/Video");

const Media = (props = {}) => {
  const { mimetype = "image" } = props;
  if (mimetype === "image") return <Img disableSkeleton {...props} />;
  if (mimetype === "video") return <VideoPlayer disableSkeleton {...props} />;
  return null;
};

export default Media;
