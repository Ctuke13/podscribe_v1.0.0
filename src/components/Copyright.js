import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// Define a Copyright component for displaying copyright information.
export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PodScrib
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
