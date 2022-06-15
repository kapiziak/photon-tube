import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import React, { FC } from "react";
import LikeGradient from "./LikeGradient";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import Link from "next/link";
import VideoViewsLabel from "./VideoViewsLabel";
import AuthorAvatar from "../Author/AuthorAvatar";
import moment from "moment";

interface IVideoCard {
    id: number;
    title: string;
    views: number;
    like: number;
    dislike: number;
    thumbnailUrl: string;
    topToBottom?: boolean;
    authorImageSrc: string | null;
    authorName: string | null;
    publishedDate: Date;
}

const VideoCard: FC<IVideoCard> = (props) => {
    return (
        <Link href={`/video/${props.id}`}>
            <a>
                <Card sx={{ height: "100%" }}>
                    <CardActionArea
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.thumbnailUrl}
                            alt={props.title}
                        />
                        <CardContent>
                            <Stack direction="row" spacing={1}>
                                <Box>
                                    <AuthorAvatar
                                        imageSrc={props.authorImageSrc}
                                        name={props.authorName}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="body2" component="h3">
                                        {props.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        component="div"
                                    >
                                        <VideoViewsLabel views={+props.views} />
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        component="div"
                                    ></Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                        <CardActions
                            sx={{
                                width: "100%",
                                marginTop: "auto",
                                padding: "8px 0 0 0",
                            }}
                        >
                            <Grid container flexDirection="column">
                                <Grid
                                    item
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    mb={1}
                                    sx={{ opacity: 0.5 }}
                                >
                                    <Typography variant="caption">
                                        {moment(props.publishedDate).fromNow()}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    textAlign="center"
                                    display="flex"
                                    mb={1}
                                    sx={{ opacity: 0.5 }}
                                    justifyContent="center"
                                    alignItems="center"
                                    gap={1}
                                >
                                    {props.like}{" "}
                                    <ThumbsUpDownIcon fontSize="small" />{" "}
                                    {props.dislike}
                                </Grid>
                                <Grid item>
                                    <LikeGradient
                                        like={props.like}
                                        dislike={props.dislike}
                                    />
                                </Grid>
                            </Grid>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </a>
        </Link>
    );
};

export default VideoCard;
