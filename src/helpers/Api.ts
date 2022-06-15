import axios from "axios";
import { ApiEndpoints, ApiUrl } from "./ApiConfig";
import { shuffleArray } from "./Utils";

interface IFetchVideos {
    (pageNo: number): Promise<IStrapiResponseSchema<Video[]>>;
}

interface ISearchVideo {
    (pageNo: number, query: string): Promise<IStrapiResponseSchema<Video[]>>;
}

interface IFetchVideo {
    (vid: VideoID): Promise<IStrapiResponseSchema<Video>>;
}

interface IFetchVideosAndShuffle {
    (currentId: VideoID, size: number): Promise<Video[]>;
}

// interface IFetchUser {
//     (id: UserID): Promise<User>;
// }

export class Api {
    static readonly _headers = {};

    static _axiosFetchVideos = (
        pageNo: number,
        pageSize: number,
        ignoreVid?: VideoID,
        query?: string
    ) => {
        return axios
            .get<IStrapiResponseSchema<Video[]>>(ApiEndpoints.FETCH_VIDEOS, {
                baseURL: ApiUrl,
                headers: Api._headers,
                params: {
                    "populate[author][populate][0]": "avatar",
                    "pagination[page]": pageNo,
                    "pagination[pageSize]": pageSize,
                    "filters[id][$ne]": ignoreVid ?? undefined,
                    "_q": query ?? undefined,
                },
            })
            .then((res): IStrapiResponseSchema<Video[]> => res.data);
    };
    static fetchVideos: IFetchVideos = async (pageNo) => {
        return Api._axiosFetchVideos(pageNo, 10);
    };
    static searchVideos: ISearchVideo = async (pageNo, query) => {
        return Api._axiosFetchVideos(pageNo, 10, undefined, query);
    };
    static _axiosFetchVideo = (vid: VideoID) => {
        return axios
            .get<IStrapiResponseSchema<Video>>(
                ApiEndpoints.FETCH_VIDEO + "/" + vid,
                {
                    baseURL: ApiUrl,
                    headers: Api._headers,
                    params: {
                        "populate[author][populate][0]": "avatar",
                    }
                }
            )
            .then((res): IStrapiResponseSchema<Video> => res.data);
    };
    static fetchVideo: IFetchVideo = async (vid) => {
        return Api._axiosFetchVideo(vid);
    };
    static fetchVideosAndShuffle: IFetchVideosAndShuffle = async (
        currentId,
        size
    ) => {
        return shuffleArray(
            (await Api._axiosFetchVideos(1, 99, currentId)).data
        ).slice(0, size);
    };
    // static _axiosFetchUser = (id: UserID) => {
    //     return (
    //         {
    //             "000-000-001": {
    //                 id: "000-000-001",
    //                 nickname: "kzakrzewski.pl",
    //                 avatar: "https://xx.xx",
    //             },
    //             "000-000-002": {
    //                 id: "000-000-002",
    //                 nickname: "Xardas",
    //                 avatar: "https://xx.xx",
    //             },
    //         } as UserCollection
    //     )[id];
    // };
    // static fetchUser: IFetchUser = async (id) => {
    //     return Api._axiosFetchUser(id);
    // };
}

export default Api;
