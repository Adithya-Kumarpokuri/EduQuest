import React from 'react';
import styled from 'styled-components';
import { Paper, Typography, Avatar, Box, Divider, Grid, Container } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const sclassName = currentUser?.sclassName;
  const studentSchool = currentUser?.school;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <StyledPaper elevation={3}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <StyledAvatar>
            {currentUser?.name?.charAt(0)?.toUpperCase()}
          </StyledAvatar>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, color: '#333' }}>
            {currentUser?.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#777' }}>
            Student Profile
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Label>Roll Number</Label>
            <Value>{currentUser?.rollNum}</Value>
          </Grid>
          <Grid item xs={12}>
            <Label>Class</Label>
            <Value>{sclassName?.sclassName}</Value>
          </Grid>
          <Grid item xs={12}>
            <Label>School</Label>
            <Value>{studentSchool?.schoolName}</Value>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default StudentProfile;

// Styled Components
const StyledPaper = styled(Paper)`
  background: #ffffff;
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
`;

const StyledAvatar = styled(Avatar)`
  width: 90px !important;
  height: 90px !important;
  background-color: #009688 !important; /* A soft teal instead of bright blue */
  font-size: 40px !important;
`;

const Label = styled(Typography).attrs(() => ({
  variant: 'subtitle2'
}))`
  color: #777;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled(Typography).attrs(() => ({
  variant: 'h6'
}))`
  color: #333;
  font-weight: 500;
`;
