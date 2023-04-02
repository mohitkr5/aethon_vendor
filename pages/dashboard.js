import SidebarLayout from "@/components/SidebarLayout";
import { Box, Typography, styled, Button } from "@mui/material";


export default function Dashboard() {
  return <SidebarLayout pageTitle={"Dashboard"}>
    <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", border: "1px solid gray", height: "200px", borderRadius: "20px" }}>
      <Box>
        <LargeText>
          10
        </LargeText>
        <SmallText>
          Users
        </SmallText>
        <Button variant="contained">View Users</Button>
      </Box>
      <Box>
        <LargeText>
          10
        </LargeText>
        <SmallText>
          Products
        </SmallText>
      </Box>
      <Box>
        <LargeText>
          10
        </LargeText>
        <SmallText>
          Orders
        </SmallText>
      </Box>
    </Box>
  </SidebarLayout>
}


function LargeText({ children }) {
  return <Typography variant="h3">
    {children}
  </Typography>
}

function SmallText({ children }) {
  return <Typography variant="h5">
    {children}
  </Typography>
}