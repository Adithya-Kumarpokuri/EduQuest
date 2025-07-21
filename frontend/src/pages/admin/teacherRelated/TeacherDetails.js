import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Divider,
  Box,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/MenuBook';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddIcon from '@mui/icons-material/Add';

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector(
    (state) => state.teacher
  );

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
  }, [dispatch, teacherID]);

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(
      `/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
            <PersonIcon sx={{ color: 'white', fontSize: 40 }} />
          }
          title={
            <Typography
              variant="h5"
              sx={{ color: 'white', fontWeight: 'bold' }}
            >
              Teacher Details
            </Typography>
          }
          sx={{
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            color: 'white',
            p: 3,
          }}
        />

        <CardContent sx={{ backgroundColor: '#f9f9f9' }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <PersonIcon color="primary" />
              <Typography variant="body1" fontWeight="bold">
                {teacherDetails?.name}
              </Typography>
            </Stack>
            <Divider />

            <Stack direction="row" spacing={2} alignItems="center">
              <ClassIcon color="primary" />
              <Typography variant="body1">
                Class: <strong>{teacherDetails?.teachSclass?.sclassName}</strong>
              </Typography>
            </Stack>
            <Divider />

            {isSubjectNamePresent ? (
              <>
                <Stack direction="row" spacing={2} alignItems="center">
                  <SubjectIcon color="primary" />
                  <Typography variant="body1">
                    Subject: <strong>{teacherDetails?.teachSubject?.subName}</strong>
                  </Typography>
                </Stack>
                <Divider />

                <Stack direction="row" spacing={2} alignItems="center">
                  <EventNoteIcon color="primary" />
                  <Typography variant="body1">
                    Sessions: <strong>{teacherDetails?.teachSubject?.sessions}</strong>
                  </Typography>
                </Stack>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddSubject}
                >
                  Add Subject
                </Button>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TeacherDetails;
