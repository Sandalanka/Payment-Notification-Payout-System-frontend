import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select an Excel file first.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("token"); 
      if (!token) {
        Swal.fire("Error", "You are not authorized. Please login.", "error");
        return;
      }
       await axios.post("http://127.0.0.1:8000/api/v1/user/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
       Swal.fire(
        "Upload Successful!",
        "File uploaded successfully and processing started.",
        "success"
      );
      setFile(null);
      setUploadMessage("");
     
    } catch (error: any) {
        Swal.fire(
            "Upload Failed",
            error.response?.data?.message || "Some Error occurs",
            "error"
        );
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Upload Payment  Excel File
          </Typography>
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleUpload}
          >
            Upload
          </Button>
          {uploadMessage && (
            <Typography sx={{ mt: 2 }} color="text.secondary">
              {uploadMessage}
            </Typography>
          )}
        </Box>
    </Container>
  );
};

export default Home;
