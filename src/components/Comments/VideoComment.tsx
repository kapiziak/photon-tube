import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { FC } from "react";
import AuthorAvatar from "../Author/AuthorAvatar";

interface IVideoComment {
    authorImageSrc: string;
    authorName: string;
    text: string;
    createdAt: number;
}

const VideoComment: FC<IVideoComment> = (props) => {
    return (
        <Stack direction="row" spacing={3} mb={2} data-type="comment">
            <Box>
                <AuthorAvatar
                    imageSrc={props.authorImageSrc}
                    name={props.authorName}
                />
            </Box>
            <Box>
                <Stack>
                    <Stack direction="row" spacing={1} display="flex">
                        <Typography variant="body2">
                            {props.authorName}
                        </Typography>
                        <Typography variant="caption">
                            {moment(props.createdAt).fromNow()}
                        </Typography>
                    </Stack>

                    <Typography variant="body2">{props.text}</Typography>
                </Stack>
            </Box>
        </Stack>
    );
};

export default VideoComment;
