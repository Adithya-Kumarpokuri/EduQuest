import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Stack,
  Box,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Card
        sx={{
          width: 500,
          borderRadius: 3,
          boxShadow: 5,
          overflow: 'hidden',
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 60,
                height: 60,
                fontSize: 30,
              }}
            >
            <PersonIcon fontSize="large" />
            </Avatar>
          }
          title={
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
              {currentUser.name}
            </Typography>
          }
          sx={{
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            color: 'white',
            p: 3,
          }}
        />

        <CardContent
          sx={{
            backgroundColor: '#f9f9f9',
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <EmailIcon color="primary" />
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                {currentUser.email}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} alignItems="center">
              <SchoolIcon color="primary" />
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                {currentUser.schoolName}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminProfile;

