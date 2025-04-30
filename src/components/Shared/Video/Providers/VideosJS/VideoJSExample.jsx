"use client"
import React from 'react';
import { Player, ControlBar, PlayToggle, VolumeMenuButton } from 'video-react';
import 'video-react/dist/video-react.css'; // Import video-react CSS

const VideoJSExample = ({
  src,
  poster,
  autoplay = false,
  muted = false,
  loop = false,
  fluid = true,
  controls = true
}) => {
  return (
    <div>
      <h2>Customizable Video.js Example</h2>
      <Player
        playsInline
        poster={poster} // Video poster image
        src={src} // Video source URL
        autoPlay={autoplay} // Autoplay video
        muted={muted} // Mute video
        loop={loop} // Loop video
        fluid={fluid} // Make player responsive
      >
        {controls && (
          <ControlBar autoHide={false}>
            <PlayToggle />
            <VolumeMenuButton vertical />
          </ControlBar>
        )}
      </Player>
    </div>
  );
};

export default VideoJSExample;
