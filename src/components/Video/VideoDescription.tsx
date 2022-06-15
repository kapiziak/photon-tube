import { Box } from "@mui/system";
import React, { FC, useState } from "react";
import parse from "html-react-parser";
import { Typography } from "@mui/material";

interface IVideoDescription {
    description: string;
}

const VideoDescription: FC<IVideoDescription> = (props) => {
    const [collapsed, setCollapsed] = useState<boolean>(
        props.description.length > 260 ? true : false
    );

    const handleCollapseClick = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Box>
            <Box
                maxHeight={collapsed ? "90px" : "auto"}
                overflow="hidden"
                style={{ position: "relative" }}
            >
                {parse(props.description)}
                {collapsed ? (
                    <Box
                        style={{
                            position: "absolute",
                            bottom: 0,
                            height: "50px",
                            width: "100%",
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 100%)",
                        }}
                    ></Box>
                ) : null}
            </Box>
            {props.description.length > 260 ? (
                <Box
                    style={{
                        width: "100%",
                        textAlign: "center",
                        cursor: "pointer",
                    }}
                    onClick={handleCollapseClick}
                >
                    <Typography variant="overline">
                        {collapsed ? <>Rozwiń</> : <>Zwiń</>}
                    </Typography>
                </Box>
            ) : null}
        </Box>
    );
};

export default VideoDescription;
