import * as React from "react";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import micBg from "../images/mic_bg.jpg";
import GoogleButton from "react-google-button";
import { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { db } from "../firebase";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PodScribe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    podcastName: "",
    genre: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validationSchema = Yup.object({
    podcastName: Yup.string().required("Podcast Name is required"),
    genre: Yup.number().required("Genre is required"),
    fName: Yup.string().required("First Name is required"),
    lName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const { podcastName, genre, fName, lName, email, password, confirmPassword } =
    formData;

  const onChange = (evt) => {
    const { name, value } = evt.target;
    console.log(name, value, evt.target);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      //If validation passed, proceed with registration
      const auth = getAuth();
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      console.log(user);
      navigate("/home");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        //Handle Yup validation errors
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        console.log("Yup Validation Errors: ", validationErrors);
      } else {
        console.log("ERROR ONSUBMIT ", error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${micBg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar> */}
            <img src={logo} />
            {/* <Typography component="h1" variant="h5">
              Sign in
            </Typography> */}
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              {" "}
              <TextField
                margin="normal"
                required
                fullWidth
                id="podcastName"
                label="Podcast Name"
                name="podcastName"
                autoFocus
                value={podcastName}
                onChange={onChange}
              />
              <FormControl fullWidth>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre"
                  id="genre"
                  value={genre}
                  label="Genre"
                  name="genre"
                  onChange={onChange}
                >
                  <MenuItem value={1}>Arts</MenuItem>
                  <MenuItem value={2}>Business</MenuItem>
                  <MenuItem value={3}>Comedy</MenuItem>
                  <MenuItem value={4}>Crime</MenuItem>
                  <MenuItem value={5}>Educational</MenuItem>
                  <MenuItem value={6}>Entertainment</MenuItem>
                  <MenuItem value={7}>Fiction</MenuItem>
                  <MenuItem value={8}>Finance</MenuItem>
                  <MenuItem value={9}>Film & TV</MenuItem>
                  <MenuItem value={10}>Gaming</MenuItem>
                  <MenuItem value={11}>Health & Fitness</MenuItem>
                  <MenuItem value={12}>History</MenuItem>
                  <MenuItem value={13}>Journalism</MenuItem>
                  <MenuItem value={14}>Kids</MenuItem>
                  <MenuItem value={15}>Law</MenuItem>
                  <MenuItem value={16}>Music</MenuItem>
                  <MenuItem value={17}>News & Politics</MenuItem>
                  <MenuItem value={18}>Non-Fiction</MenuItem>
                  <MenuItem value={19}>Parenting</MenuItem>
                  <MenuItem value={20}>Philosophy</MenuItem>
                  <MenuItem value={21}>Pop Culture</MenuItem>
                  <MenuItem value={22}>Religion</MenuItem>
                  <MenuItem value={23}>Science</MenuItem>
                  <MenuItem value={24}>Self-Improvement</MenuItem>
                  <MenuItem value={25}>Society & Culture</MenuItem>
                  <MenuItem value={26}>Spirituality</MenuItem>
                  <MenuItem value={27}>Sports</MenuItem>
                  <MenuItem value={28}>Tech</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fName"
                label="First Name"
                name="fName"
                autoFocus
                value={fName}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lName"
                label="Last Name"
                name="lName"
                autoComplete="lName"
                autoFocus
                value={lName}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={onChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <GoogleButton
                onClick={() => {
                  console.log("Google Button Clicked!");
                }}
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              {/* <SignUpModal open={isSignUpModalOpen} handleClose={handleCloseSignUpModal} /> */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
