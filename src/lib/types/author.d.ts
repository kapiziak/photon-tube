type AuthorAttributes = {
    username: string;
    numberOfSubscribers: number;
    avatar: IStrapiResponseSchema<Avatar>;
};

type Author = {
    id: number;
} & { attributes: AuthorAttributes };
