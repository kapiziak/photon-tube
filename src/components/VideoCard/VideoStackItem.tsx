import { Box, Grid, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import VideoViewsLabel from "./VideoViewsLabel";

interface IVideoStackItem {
    id: number;
    title: string;
    views: number;
    like: number;
    dislike: number;
    thumbnailUrl: string;
    topToBottom?: boolean;
    publishedDate: Date;
}

const VideoStackItem: FC<IVideoStackItem> = (props) => {
    return (
        <Link href={`/video/${props.id}`}>
            <a>
                <Grid container spacing={1}>
                    <Grid item xs={5} sm={3} md={6}>
                        <Box style={{ position: "relative", height: 120 }}>
                            <Image
                                src={props.thumbnailUrl}
                                alt={props.title}
                                layout="fill"
                                objectFit="contain"
                                style={{ aspectRatio: "16/9" }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={7} sm={9} md={6}>
                        <Typography variant="body2" title={props.title}>
                            {props.title.slice(0, 60)}
                            {props.title.length > 60 ? <>...</> : null}
                        </Typography>
                        <Typography variant="caption" component="div">
                            <VideoViewsLabel views={+props.views} />
                        </Typography>
                        <Typography variant="caption" component="div">
                            {moment(props.publishedDate).fromNow()}
                        </Typography>
                    </Grid>
                </Grid>
            </a>
        </Link>
    );
};

export default VideoStackItem;
