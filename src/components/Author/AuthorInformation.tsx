import { Box, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import AuthorAvatar from "./AuthorAvatar";

interface IAuthorInformation {
    imageSrc: string | null;
    name: string | null;
    totalSubscriptions: number | null;
}

const AuthorInformation: FC<IAuthorInformation> = (props) => {
    return (
        <Stack direction="row" spacing={3} alignItems="center">
            <Box>
                <AuthorAvatar imageSrc={props.imageSrc} name={props.name} />
            </Box>
            <Box>
                <Typography variant="h6">
                    {props.name ?? "Anonimowy Photon"}
                </Typography>
                {props.totalSubscriptions ? (
                    <Typography variant="body2">
                        {props.totalSubscriptions} subskrybujących
                    </Typography>
                ) : null}
            </Box>
        </Stack>
    );
};

export default AuthorInformation;
