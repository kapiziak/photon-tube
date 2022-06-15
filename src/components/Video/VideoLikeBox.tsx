import React, { FC } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Stack, Typography } from "@mui/material";

interface IVideoLikeBox {
    likes: number;
    dislikes: number;
}

const VideoLikeBox: FC<IVideoLikeBox> = (props) => {
    return (
        <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1}>
                <ThumbUpIcon />
                <Typography>{props.likes}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <ThumbDownIcon />
                <Typography>{props.dislikes}</Typography>
            </Stack>
        </Stack>
    );
};

export default VideoLikeBox;
