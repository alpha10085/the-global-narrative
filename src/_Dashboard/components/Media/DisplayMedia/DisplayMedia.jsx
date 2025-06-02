import Img from "@/components/shared/img/Img";
import VideoPlayer from "./VideoPlayback/VideoPlayback";
import MSViewer from "./MSViewer/MSViewer";
import FileDisplay from "./TextDisplay/TextDisplay";
import { memo } from "react";
 import Pdf from "./Pdf/Pdf";
const options = {
    image: Img,
    video: VideoPlayer,
    office: MSViewer,
    text: FileDisplay,
     pdf: Pdf
};
const DisplayMedia = ({
    url = "",
    alt = "",
    withEffect = true,
    className = "",
    mainClassName = "",
    errorImg = "",
    children,
    AsyncLoading = false,
    onClick = () => { },
    theme = "light",
    maxRetryCount = 3,
    delayLoad = 0,
    type = '',
    poster = '',
    controls = false,
    autoPlay = false,
    loop = true,
    muted = true,
    urlForMobil = null,
    thumbnail = '',
    file
}) => {
    const Component = options?.[type]
    const props = {
        url,
        alt,
        withEffect,
        className,
        mainClassName,
        errorImg,
        children,
        AsyncLoading,
        onClick,
        theme:theme?.name,
        themeConfig:theme,
        maxRetryCount,
        delayLoad,
        poster,
        controls,
        autoPlay,
        loop,
        muted,
        thumbnail,
        urlForMobil,
        file,
    };


    return Component ? <Component {...props} /> : null;
};

export default memo(DisplayMedia, (prev, next) => {
    const keys = [
        "url", "alt", "withEffect", "className", "mainClassName",
        "AsyncLoading", "theme", "maxRetryCount", "delayLoad",
        "poster", "controls", "autoPlay", "loop", "muted",
        "thumbnail", "urlForMobil"
    ];
    return keys?.every(key => Object.is(prev[key], next[key]));
});
