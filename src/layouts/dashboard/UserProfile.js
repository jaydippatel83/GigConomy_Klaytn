import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Container,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { border, borderRadius } from "@mui/system";
import "./Profile.css";
import Page from "src/components/Page";
import { ProfileView } from "src/components/userprofile/ProfileView";
import { ProfileDetails } from "src/components/userprofile/ProfileDetails";


// ----------------------------------------------------------------------

const Input = styled("input")({
  display: "none",
});

export default function UserProfile() {
  // const [email, setEmail] = useState('');

  const [uploadfile, setuploadFile] = useState("");

  // Handles file upload event and updates state
  // function handleUpload(event) {
  //   setFile(event.target.files[0]);

  //   // Add code here to upload file to server
  //   // ...
  // }
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      //   .min(2, "Too Short!")
      //   .max(50, "Too Long!")
      .required("Username required"),
    bio: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Bio is required"),
    // email: Yup.string()
    //   .email("Email must be a valid email address")
    //   .required("Email is required"),
    skills: Yup.string().required("Skill is required"),
    file: Yup.string().required("Upload file is required"),

  });

  const formik = useFormik({
    initialValues: {
      name: "",
      //   email: "",
      bio: "",
      skills: "",
      file: ""
    },
    validationSchema: RegisterSchema,
    // onSubmit: () => {
    //   alert(e.target);

    // },
  });
  // function fileupload(e) {
  //   setFile(e.target.files[0]);
  //   console.log(setFile,'setfile');
  //   if(setFile === null){
  //     alert('please fill the field')
  //   }

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Page title="User Profile | GigConomy"> 
      <Box
        component="main"
        sx={{
          flexGrow: 1, 
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            User Profile
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={4}
              xs={12}
            >
                <ProfileView />
            </Grid>
            <Grid
              item
              lg={8}
              md={8}
              xs={12}
            >
              <ProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>   
    </Page>
  );
}