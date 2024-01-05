import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { mainListItems, secondaryListItems } from "./listItems";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Copyright from "./Copyright";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import { userState } from "../state/atoms/UserState";
import { useState, useEffect } from "react";
import Upload from "./Upload";

// import { useRecoilValue } from "recoil";
// import { userPodcastNameSelector } from "../state/selectors/UserSelector";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard({ currentUser }) {
  console.log(currentUser);
  const navigate = useNavigate();
  const [drawer, setDrawer] = React.useState(false);
  const [openLogOut, setOpenLogOut] = React.useState(false);
  // const [user, setUser] = useRecoilState(currentUser);
  const [userData, setUserData] = useRecoilState(userState);
  const [showUpload, setShowUpload] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const handleUploadClick = () => {
    setShowUpload(!showUpload);
    setActiveButton(showUpload ? null : "Upload");
  };

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };
  const handleOpenLogOut = () => setOpenLogOut(true);
  const handleCloseLogOut = () => setOpenLogOut(false);
  // const podcastName = useRecoilValue(userPodcastNameSelector);

  const handleUserData = async () => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      try {
        // await setDoc(docRef, userData);
        const docData = await getDoc(docRef);
        console.log(docData.data().podcastName);
        setUserData(docData.data());
      } catch (error) {
        console.error("Error setting or getting document:", error);
      }
    } else {
      console.log("No Current User");
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  const logOut = function (e) {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        const notify = () =>
          toast.info("The user signed out", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        notify();
        navigate("/");
      })
      .catch((err) => {
        console.log("LOGOUT ERROR: ", err.message);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid indigo",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <Modal
          open={openLogOut}
          onClose={handleCloseLogOut}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h1"
              sx={{ mb: 2 }}
            >
              Are you sure you want to Log Out?
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Button variant="outlined" onClick={logOut}>
                LOGOUT
              </Button>
              <Button variant="outlined" onClick={handleCloseLogOut}>
                CANCEL
              </Button>
            </Box>
          </Box>
        </Modal>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <AppBar position="absolute" open={drawer}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(drawer && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              PodScribe
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Welcome, {currentUser ? userData.podcastName : "Guest"}!
            </Typography>
            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ marginRight: 4 }}>
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Log Out">
              <IconButton
                onClick={handleOpenLogOut}
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={drawer}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems(handleUploadClick, activeButton)}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DrawerHeader />
          {showUpload && <Upload />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
