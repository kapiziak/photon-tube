import { Box, Input, Stack } from "@mui/material";
import React, { FC, FormEvent, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addNewComment } from "../../store/slices/commentsSlice";
import AuthorAvatar from "../Author/AuthorAvatar";

interface INewComment {
    imageSrc: string | null;
    name: string | null;
    vid: number;
}

const NewComment: FC<INewComment> = (props) => {
    const [newCommentText, setNewCommentText] = useState<string>("");

    const dispatch = useAppDispatch();

    const handleNewComment = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNewCommentText("");
        dispatch(
            addNewComment({
                vid: props.vid,
                comment: {
                    user: props.name ?? "",
                    text: newCommentText,
                    createdAt: new Date().getTime(),
                },
            })
        );
    };

    return (
        <Stack direction="row" spacing={3}>
            <Box>
                <AuthorAvatar imageSrc={props.imageSrc} name={props.name} />
            </Box>
            <Box
                data-type="new-comment"
                component="form"
                width="100%"
                display="flex"
                onSubmit={handleNewComment}
            >
                <Input
                    value={newCommentText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewCommentText(e.target.value)
                    }
                    placeholder="Napisz komentarz..."
                    fullWidth
                />
            </Box>
        </Stack>
    );
};

export default NewComment;
