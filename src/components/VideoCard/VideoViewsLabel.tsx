import React, { FC } from "react";

interface IVideoViewsLabel {
    views: number;
}

const VideoViewsLabel: FC<IVideoViewsLabel> = (props) => (
    <>{(+props.views).toLocaleString("pl")} wyświetleń</>
);

export default VideoViewsLabel;
