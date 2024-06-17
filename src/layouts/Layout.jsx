import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
const Layout = () => {
  return (
    <Box backgroundColor="black" sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Outlet />
    </Box>
  );
}

export default Layout
