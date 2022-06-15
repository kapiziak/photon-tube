import { Container, Grid, Typography } from "@mui/material";
import React, { FC } from "react";

import Link from "next/link";
import Search from "./Search";

const Header: FC = () => {
    return (
        <Container>
            <Grid container my={3}>
                <Grid item xs={12} sm={12} md={4} mt={1} mb={{ xs: 1, sm: 0 }}>
                    <Link href="/">
                        <a>
                            <Typography
                                variant="h4"
                                textAlign={{ xs: "center", md: "left" }}
                            >
                                PhotonTube
                            </Typography>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={12} md={8} mt={1}>
                    <Search />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Header;
