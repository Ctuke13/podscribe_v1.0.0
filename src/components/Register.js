import * as React from "react";
import * as Yup from "yup";
import "../../src/App.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GoogleButton from "react-google-button";
import logo from "../images/logo.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { googleSignIn } from "./GoogleSignIn";
import { useAuth } from "../contexts/AuthContext";
import { useRecoilState } from "recoil";
import { userState } from "../state/atoms/UserState";
import Copyright from "./Copyright";

// Create a default material-ui theme.
const defaultTheme = createTheme();

// Define and export as default functional component named Register.
export default function Register({ toggleIsRegister }) {
  // console.log(currentUser.email ?? "no user")
  // Use the useNavigate hook to get a navigation function. Use the useAuth hook to access authentication-related functions and data from the AuthContext.
  const navigate = useNavigate();
  const { signUp } = useAuth();

  // Declare a state variable formData using useState to store form data for registration.
  const [formData, setFormData] = useState({
    podcastName: "",
    genre: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useRecoilState(userState);

  //Destructure the formData object to access individual form field values.
  const { podcastName, genre, fName, lName, email, password, confirmPassword } =
    formData;

  // Create a validation schema using Yup to define rules for each form field.
  const validationSchema = Yup.object({
    podcastName: Yup.string().required("Podcast Name is required"),
    genre: Yup.string().required("Genre is required"),
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

  // Define an onChange function to handle changes in form fields and update the formData state.
  const onChange = (evt) => {
    const { name, value } = evt.target;
    console.log(name, value, evt.target);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Define an onSubmit function to handle form submission. It includes validation using the Yup schema and registration logic.
  const onSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      //If validation passed, proceed with registration
      const userCred = await signUp(email, password);

      const userUid = userCred.user.uid;
      console.log(userUid);
      const userData = {
        podcastName: podcastName,
        genre: genre,
        fName: fName,
        lName: lName,
        email: email,
      };

      const docRef = doc(db, "users", userUid);
      await setDoc(docRef, userData);
      const docData = await getDoc(docRef);
      setUser(docData);
      console.log(`User Atom: ${user}`);
      console.log("User registration successful: ", userCred.user);
      navigate("/home");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        //Handle Yup validation errors
        console.log(error);
        console.log(error.inner);
        const validationErrors = {};
        error.inner.forEach((err) => {
          console.log(err);
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.log("ERROR ONSUBMIT ", errors);
      }
    }
  };
  console.log("Yup Validation Errors: ", errors);

  // Start rendering the component with the material-ui ThemeProvider and a Grid container.
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          justifyContent: "center",
        }}
      >
        {/*Apply CSS baseline styles to ensure consistent rendering across different browsers.*/}
        {/* <CssBaseline /> */}
        {/*Render a grid item for the background image, setting its dimensions and background image.*/}
        {/* <Grid
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
        /> */}
        {/*Create a grid item for the registration form with specified dimensions and elevation.*/}
        {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square> */}
        {/*Create a Box container for the form with styling properties.*/}
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/*Display the application logo.*/}
          <img src={logo} alt="logo" />
          {/*Create a form component, setting it0s onSubmit handler and margin-top.*/}
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
              sx={{
                mt: 1,
                width: "100%",
              }}
            />
            <div className="error-message">
              {errors && errors.podcastName && <p>{errors.podcastName}</p>}
            </div>
            <FormControl fullWidth sx={{ marginTop: 1 }}>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre"
                id="genre"
                value={genre}
                label="Genre"
                name="genre"
                onChange={onChange}
              >
                <MenuItem value={"Arts"}>Arts</MenuItem>
                <MenuItem value={"Business & Finance"}>
                  Business & Finance
                </MenuItem>
                <MenuItem value={"Comedy"}>Comedy</MenuItem>
                <MenuItem value={"Crime"}>Crime</MenuItem>
                <MenuItem value={"Educational"}>Educational</MenuItem>
                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"Fiction"}>Fiction</MenuItem>
                <MenuItem value={"Film & TV"}>Film & TV</MenuItem>
                <MenuItem value={"Gaming"}>Gaming</MenuItem>
                <MenuItem value={"Health & Fitness"}>Health & Fitness</MenuItem>
                <MenuItem value={"History"}>History</MenuItem>
                <MenuItem value={"Journalism"}>Journalism</MenuItem>
                <MenuItem value={"Kids"}>Kids</MenuItem>
                <MenuItem value={"Law"}>Law</MenuItem>
                <MenuItem value={"Music"}>Music</MenuItem>
                <MenuItem value={"News & Politics"}>News & Politics</MenuItem>
                <MenuItem value={"Non-Fiction"}>Non-Fiction</MenuItem>
                <MenuItem value={"Parenting"}>Parenting</MenuItem>
                <MenuItem value={"Philosophy"}>Philosophy</MenuItem>
                <MenuItem value={"Pop Culture"}>Pop Culture</MenuItem>
                <MenuItem value={"Religion"}>Religion</MenuItem>
                <MenuItem value={"Science"}>Science</MenuItem>
                <MenuItem value={"Self-Improvement"}>Self-Improvement</MenuItem>
                <MenuItem value={"Society & Culture"}>
                  Society & Culture
                </MenuItem>
                <MenuItem value={"Spirituality"}>Spirituality</MenuItem>
                <MenuItem value={"Sports"}>Sports</MenuItem>
                <MenuItem value={"Tech"}>Tech</MenuItem>
              </Select>
            </FormControl>
            <div className="error-message">
              {errors && errors.genre && <p>{errors.genre}</p>}
            </div>
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
              sx={{ marginTop: 3 }}
            />
            <div className="error-message">
              {errors && errors.fName && <p>{errors.fName}</p>}
            </div>
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
              sx={{ marginTop: 1 }}
            />
            <div className="error-message">
              {errors && errors.lName && <p>{errors.lName}</p>}
            </div>
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
              sx={{ marginTop: 2 }}
            />
            <div
              style={{
                fontSize: "12px",
                color: "red",
                fontStyle: "italic",
                marginTop: "-10px",
              }}
              className="error-message"
            >
              {errors && errors.email && <p>{errors.email}</p>}
            </div>
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
            <div
              style={{
                fontSize: "12px",
                color: "red",
                fontStyle: "italic",
                marginTop: "-10px",
              }}
              className="error-message"
            >
              {errors && errors.password && <p>{errors.password}</p>}
            </div>
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
              sx={{ marginTop: 1 }}
            />
            <div
              style={{
                fontSize: "12px",
                color: "red",
                fontStyle: "italic",
                marginTop: "-10px",
              }}
              className="error-message"
            >
              {errors && errors.confirmPassword && (
                <p>{errors.confirmPassword}</p>
              )}
            </div>
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
            <GoogleButton onClick={googleSignIn} />
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?{" "}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    toggleIsRegister(); // Call the toggleIsRegister function from props
                  }}
                >
                  Already have an account? Sign In"
                </Link>
              </Grid>
            </Grid>
            {/* <SignUpModal open={isSignUpModalOpen} handleClose={handleCloseSignUpModal} /> 
              <Copyright sx={{ mt: 5 }} /> */}
          </Box>
        </Box>

        {/* </Grid> */}
      </Grid>
      {/* <Copyright /> */}
    </ThemeProvider>
  );
}
