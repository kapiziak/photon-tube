import { IconButton, InputBase, Paper } from "@mui/material";
import React, { FC, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

const Search: FC = () => {
    const [searchText, setSearchText] = useState<string>("");

    const router = useRouter();

    const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(
            {
                pathname: "/",
                query: {
                    s: searchText,
                },
            },
            undefined,
            { shallow: false }
        );
        return;
    };

    return (
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: {
                    xs: "auto",
                    md: 400,
                },
            }}
            onSubmit={onSearchSubmit}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Wyszukaj film"
                inputProps={{ "aria-label": "wyszukaj film" }}
                value={searchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchText(e.target.value)
                }
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default Search;
