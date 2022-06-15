type UserID = string;
type UserCollection = {
    [id: UserID]: User;
};
type User = {
    id: UserID;
    nickname: string;
    avatar: string;
};
