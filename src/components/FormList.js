import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  Link,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('http://localhost:5000/form');
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center">
        Form Submissions
      </Typography>
      <Grid container spacing={4}>
        {forms.map((form, index) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined" sx={{ transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {form.fullName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Email:</strong> {form.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Contact Number:</strong> {form.contactNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Description:</strong> {form.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Date of Incident:</strong> {form.incidentDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Dash Cam:</strong> {form.dashCam}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>City:</strong> {form.city}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>State:</strong> {form.state}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Country:</strong> {form.country}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Terms Accepted:</strong> {form.termsAccepted ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Files:</strong>
                </Typography>
                <List>
                  {form.files.map((file, fileIndex) => (
                    <ListItem key={fileIndex}>
                      <Link href={`http://localhost:5000/${file}`} target="_blank" rel="noopener noreferrer">
                        File {fileIndex + 1}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FormList;
