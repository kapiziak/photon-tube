import {
    Box,
    Container,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthorInformation from "../../src/components/Author/AuthorInformation";
import NewComment from "../../src/components/Comments/NewComment";
import VideoComment from "../../src/components/Comments/VideoComment";
import VideoDescription from "../../src/components/Video/VideoDescription";
import VideoLikeBox from "../../src/components/Video/VideoLikeBox";
import VideoStackItem from "../../src/components/VideoCard/VideoStackItem";
import VideoViewsLabel from "../../src/components/VideoCard/VideoViewsLabel";
import Api from "../../src/helpers/Api";
import { ApiVideoThumbnailImg } from "../../src/helpers/ApiConfig";
import { logErr } from "../../src/helpers/Logger";
import { useAppSelector } from "../../src/store/hooks";
import { selectVideoComments } from "../../src/store/slices/commentsSlice";
import {
    selectUserAvatar,
    selectUserName,
} from "../../src/store/slices/userSlice";

function VideoPage() {
    const [video, setVideo] = useState<Video | null>(null);
    const [recommendedVideos, setRecommendedVideos] = useState<Video[] | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);

    const currentUserName = useAppSelector(selectUserName);
    const currentUserAvatar = useAppSelector(selectUserAvatar);

    const router = useRouter();
    const { id } = router.query;

    const videoComments = useAppSelector(selectVideoComments(id));

    useEffect(() => {
        if (!router.isReady) return;
        setLoading(true);
        const fetchVideo = async (vid: number) => {
            let res;
            try {
                res = await Api.fetchVideo(vid);
            } catch (e) {
                logErr(e);
                router.push("/404");
                return;
            }
            if (!res.data) {
                router.push("/404");
                return;
            }
            setVideo(res.data);
            setLoading(false);
        };
        const fetchRecommendedVideos = async (vid: number) => {
            let res;
            try {
                res = await Api.fetchVideosAndShuffle(vid, 10);
            } catch (e) {
                logErr(e);
                return;
            }

            setRecommendedVideos(res);
        };
        if (!id || typeof id !== "string") {
            router.push("/404");
            return;
        }
        fetchVideo(+id);
        fetchRecommendedVideos(+id);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady, id]);

    return (
        <>
            <Head>
                {video && !loading ? (
                    <title>{video.attributes.title}</title>
                ) : (
                    <title>Ładowanie...</title>
                )}
            </Head>
            <Container>
                <Grid container mt={1} spacing={5}>
                    <Grid item xs={12} md={8}>
                        {loading ? (
                            <Skeleton height="400px" />
                        ) : video ? (
                            <>
                                <iframe
                                    width="100%"
                                    src={`https://www.youtube-nocookie.com/embed/${video.attributes.youTubeVideoId}`}
                                    title={video.attributes.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    style={{
                                        aspectRatio: "16 / 9",
                                        maxWidth: "100%",
                                        border: "unset",
                                    }}
                                ></iframe>
                                <Grid container mt={2}>
                                    <Grid item xs={12} sm={7}>
                                        <Typography variant="h6" component="h1">
                                            {video.attributes.title}
                                        </Typography>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="caption">
                                                <VideoViewsLabel
                                                    views={
                                                        +video.attributes
                                                            .viewCount
                                                    }
                                                />
                                            </Typography>
                                            <Typography variant="caption">
                                                {moment(
                                                    video.attributes
                                                        .publishedDate
                                                ).format("d MMMM YYYY")}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={5}
                                        mt={1}
                                        display="flex"
                                        justifyContent={{
                                            md: "center",
                                        }}
                                    >
                                        <VideoLikeBox
                                            likes={video.attributes.likeCount}
                                            dislikes={
                                                video.attributes.dislikeCount
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Box>
                                    <VideoDescription
                                        description={
                                            video.attributes.description
                                        }
                                    />
                                </Box>
                                <Box my={3}>
                                    <AuthorInformation
                                        imageSrc={
                                            video.attributes.author.data
                                                ? video.attributes.author.data
                                                      .attributes.avatar.data
                                                    ? video.attributes.author
                                                          .data.attributes
                                                          .avatar.data
                                                          .attributes.url
                                                    : null
                                                : null
                                        }
                                        name={
                                            video.attributes.author.data
                                                ? video.attributes.author.data
                                                      .attributes.username
                                                : null
                                        }
                                        totalSubscriptions={
                                            video.attributes.author.data
                                                ? video.attributes.author.data
                                                      .attributes
                                                      .numberOfSubscribers
                                                : null
                                        }
                                    />
                                </Box>
                                {id ? (
                                    <Box mb={3}>
                                        <NewComment
                                            vid={+id}
                                            name={currentUserName}
                                            imageSrc={currentUserAvatar}
                                        />
                                    </Box>
                                ) : null}
                                {videoComments ? (
                                    <Box>
                                        {videoComments.map((comment, key) => (
                                            <VideoComment
                                                key={key}
                                                authorName={comment.user}
                                                authorImageSrc=""
                                                text={comment.text}
                                                createdAt={comment.createdAt}
                                            />
                                        ))}
                                    </Box>
                                ) : null}
                            </>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            {recommendedVideos
                                ? recommendedVideos.map((video, key) => (
                                      <VideoStackItem
                                          key={key}
                                          id={video.id}
                                          title={video.attributes.title}
                                          thumbnailUrl={ApiVideoThumbnailImg.replace(
                                              "%ID",
                                              video.attributes.youTubeVideoId
                                          )}
                                          views={video.attributes.viewCount}
                                          like={video.attributes.likeCount}
                                          dislike={
                                              video.attributes.dislikeCount
                                          }
                                          publishedDate={
                                              video.attributes.publishedDate
                                          }
                                      />
                                  ))
                                : Array.from(Array(3 * 4)).map((_, key) => (
                                      <Skeleton
                                          key={key}
                                          variant="rectangular"
                                          width="100%"
                                          height={200}
                                      />
                                  ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default VideoPage;
