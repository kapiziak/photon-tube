import { Box, Grid, Pagination, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import VideoCard from "../src/components/VideoCard/VideoCard";
import Api from "../src/helpers/Api";
import { ApiVideoThumbnailImg } from "../src/helpers/ApiConfig";
import { logErr } from "../src/helpers/Logger";
import { scrollToTop } from "../src/helpers/Utils";

const VideoList: NextPage = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [pageCount, setPageCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchMode, setSearchMode] = useState<string | null>(null);
    const [paginationVisibility, setPaginationVisibility] =
        useState<boolean>(true);

    const router = useRouter();
    const { s } = router.query;

    const fetchVideos = async (pageNo: number, query?: string) => {
        setLoading(true);
        let res;
        try {
            if (query) res = await Api.searchVideos(pageNo, query);
            else res = await Api.fetchVideos(pageNo);
        } catch (e) {
            logErr(e);
            return;
        }
        setVideos([...res.data]);
        // api from videos should always have meta
        setPageCount(res.meta!.pagination.pageCount);
        setPaginationVisibility(true);
        setLoading(false);
    };

    useEffect(() => {
        if (s) return;
        fetchVideos(1);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setPaginationVisibility(false);

        if (router.isReady && !s && searchMode !== null) {
            fetchVideos(1);
            setSearchMode(null);
            return;
        }
        if (typeof s !== "string") return;
        setSearchMode(s);
        setLoading(true);
        fetchVideos(1, s);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [s]);

    const onPageChange = (_: ChangeEvent<unknown>, pageNo: number) => {
        setVideos([]);
        scrollToTop();
        if (searchMode) {
            if (typeof s !== "string") fetchVideos(pageNo);
            else fetchVideos(pageNo, s);
            return;
        }
        fetchVideos(pageNo);
    };

    return (
        <>
            <Head>
                <title>Strona główna</title>
            </Head>
            <Container>
                {searchMode ? <h1>Wyniki wyszukiwania: {searchMode}</h1> : null}
                {(!loading && videos && videos.length) === 0 ? (
                    <Typography variant="h6">Brak wyników</Typography>
                ) : null}
                {loading ? (
                    <Grid container spacing={2}>
                        {Array.from(Array(3 * 4)).map((_, key) => (
                            <Grid item sm={3} key={key}>
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={200}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        {videos
                            ? videos.map((video, key) => (
                                  <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={3}
                                      key={key}
                                      width="100%"
                                  >
                                      <VideoCard
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
                                          authorImageSrc={
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
                                          authorName={
                                              video.attributes.author.data
                                                  ? video.attributes.author.data
                                                        .attributes.username
                                                  : null
                                          }
                                          publishedDate={
                                              video.attributes.publishedDate
                                          }
                                      />
                                  </Grid>
                              ))
                            : null}
                    </Grid>
                )}

                <Box my={5} display="flex" justifyContent="center">
                    {paginationVisibility ? (
                        <Pagination
                            count={pageCount ?? 0}
                            color="secondary"
                            onChange={onPageChange}
                            defaultValue={1}
                        />
                    ) : (
                        <Skeleton />
                    )}
                </Box>
            </Container>
        </>
    );
};

export default VideoList;
