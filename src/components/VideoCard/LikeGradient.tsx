import React, { FC } from "react";

interface ILikeGradient {
    like: number;
    dislike: number;
}

const LikeGradient: FC<ILikeGradient> = (props) => {
    const calculatedPercentOfLikes =
        +props.like === 0
            ? 100
            : (+props.like / (+props.like + +props.dislike)) * 100;

    return (
        <div
            style={{
                height: "8px",
                width: "100%",
                background: `linear-gradient(90deg, #f8ab2b 0%, #f8ab2b ${
                    calculatedPercentOfLikes - 5
                }%, red ${calculatedPercentOfLikes + 10}%, red 100%)`,
            }}
        ></div>
    );
};

export default LikeGradient;
