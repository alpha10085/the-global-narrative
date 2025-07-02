import React, { memo } from "react";
import Img from "../img/Img";
import VideoPlayer from "../Video/Video";

const Media = ({ mimetype = "image", ...props }) => {
  if (mimetype === "image") return <Img disableSkeleton {...props} />;
  if (mimetype === "video") return <VideoPlayer
  autoPlay={false}
  disableSkeleton {...props} />;
  return null;
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.mimetype === nextProps.mimetype &&
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
  );
};

Media.displayName = "Media";

export default memo(Media, areEqual);
