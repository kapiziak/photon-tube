import { Avatar } from "@mui/material";
import React, { FC } from "react";
import { ApiStaticUrl } from "../../helpers/ApiConfig";

interface IAvatar {
    imageSrc: string | null;
    name: string | null;
}

const AuthorAvatar: FC<IAvatar> = (props) => {
    return <Avatar src={props.imageSrc ? `${ApiStaticUrl}${props.imageSrc}` : ``} alt={props.name ?? ``} />;
};

export default AuthorAvatar;
