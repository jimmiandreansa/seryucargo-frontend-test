/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const UserScore = ({ score }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: `conic-gradient(#4caf50 ${score * 3.6}deg, #ccc 0deg)`,
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          width: 28,
          height: 28,
          backgroundColor: "#000",
        }}
      >
        <Typography variant="body2" component="span">
          {Math.round(score)}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        component="div"
        sx={{
          position: "absolute",
          top: "50%",
          left: 44,
          transform: "translateY(-50%)",
          fontSize: "0.6rem",
          color: "#fff",
        }}
      >
        User Score
      </Typography>
    </Box>
  );
};

export default UserScore;
