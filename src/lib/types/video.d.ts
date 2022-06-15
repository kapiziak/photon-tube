type VideoCollection = Video[];

type VideoID = number;

type VideoAttributes = {
    youTubeVideoId: string;
    title: string;
    description: string;
    fullUrl: string;
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    publishedDate: Date;
    author: IStrapiResponseSchema<Author>;
};

type Video = { id: VideoID } & { attributes: VideoAttributes };

type VideoComment = {
    user: string;
    text: string;
    createdAt: number;
};
