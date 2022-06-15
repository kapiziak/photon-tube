type AvatarAttributes = {
    url: string;
};

type Avatar = {
    id: number;
} & { attributes: AvatarAttributes };
