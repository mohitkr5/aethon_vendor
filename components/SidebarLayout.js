import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../utils/theme";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Collapse, Typography } from "@mui/material";
import Head from "next/head";

import ListSubheader from "@mui/material/ListSubheader";
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import {
  lowerSidebarData,
  sidebarElements,
  upperSidebarData,
} from "../data/sidebarLayoutData";
import { Divider } from "@mui/material";
import Logo from "./Logo";

const drawerWidth = "23vw";

export default function SidebarLayout({ children, pageTitle }) {
  const {
    isAuthenticated,
    loading: authLoading,
    user,
  } = useSelector((state) => state.auth);
  const router = useRouter();
  const path = router.pathname;

  const [open, setOpen] = useState();

  const handleClick = (index) => {
    if (index === open) {
      setOpen();
    } else {
      setOpen(index);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated) return;
    if (!authLoading && !user) router.push("/login");
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    const index = sidebarElements.findIndex((el) => {
      const paths = el.options.map((el) => el.redirect);
      return paths.includes(path);
    });
    setOpen(index);
  }, []);

  return (
    <>
      {authLoading ? (
        <Loading text={"loading"} />
      ) : (
        <>
          <Head>
            <title>Aethon Vendor Dashboard</title>
            <meta name="description" content="Aethon Vendor Application" />
            {/* <meta name="keywords" content={keywords} /> */}
          </Head>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                display: "flex",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <CssBaseline />
              <Navbar />
              <Drawer
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    border: "none",
                  },
                }}
              >
                {/* <Toolbar /> */}
                <Box
                  height={"17vh"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Logo />
                </Box>
                <Box
                  sx={{
                    overflow: "auto",
                    height: "100%",
                    borderRight: "1px solid grey",
                  }}
                >
                  <List>
                    {sidebarElements.map((el, index) => (
                      <Fragment key={index}>
                        <ListItemButton onClick={() => handleClick(index)}>
                          <ListItemIcon>{el.icon}</ListItemIcon>
                          <ListItemText primary={el.name} />
                          {open === index ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                          in={open === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          {el.options.map((option, optionIndex) => {
                            return (
                              <List
                                key={optionIndex}
                                component="div"
                                disablePadding
                                onClick={() => router.push(option.redirect)}
                                sx={
                                  path === option.redirect
                                    ? { backgroundColor: "gold !important" }
                                    : {}
                                }
                              >
                                <ListItemButton sx={{ pl: 4 }}>
                                  <ListItemIcon>{option.icon}</ListItemIcon>
                                  <ListItemText primary={option.title} />
                                </ListItemButton>
                              </List>
                            );
                          })}
                        </Collapse>
                      </Fragment>
                    ))}
                    {/* {upperSidebarData.map((item) => (
                      <ListItem key={item.id}>
                        <ListItemButton
                          onClick={() => router.push(item.redirect)}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            sx={{ fontSize: "16px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}{" "}
                    <Divider />
                    {lowerSidebarData.map((item) => (  <ListItem key={item.id}>
                      <ListItemButton
                        onClick={() => router.push(item.redirect)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    </ListItem>
                    ))} */}
                  </List>
                </Box>
              </Drawer>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant={"h4"} sx={{ marginBottom: "1rem" }}>
                  {pageTitle}
                </Typography>
                {children}
              </Box>
            </Box>
          </ThemeProvider>
        </>
      )}
    </>
  );
}
