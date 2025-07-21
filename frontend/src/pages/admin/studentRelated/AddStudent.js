import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { status, currentUser, response, error } = useSelector((state) => state.user);
  const { sclassesList } = useSelector((state) => state.sclass);

  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [className, setClassName] = useState('');
  const [sclassName, setSclassName] = useState('');
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const adminID = currentUser._id;
  const role = 'Student';
  const attendance = [];

  useEffect(() => {
    if (situation === 'Class') {
      setSclassName(params.id);
    }
    dispatch(getAllSclasses(adminID, 'Sclass'));
  }, [dispatch, adminID, params.id, situation]);

  const changeHandler = (event) => {
    const selectedClass = sclassesList.find(
      (item) => item.sclassName === event.target.value
    );
    setClassName(selectedClass?.sclassName || '');
    setSclassName(selectedClass?._id || '');
  };

  const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!sclassName) {
      setMessage('Please select a classname');
      setShowPopup(true);
      return;
    }
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate(-1);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, response, dispatch, navigate, error]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={6} sx={{ padding: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Add Student
        </Typography>
        <form onSubmit={submitHandler}>
          <Stack spacing={3}>
            <TextField
              label="Student Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {situation === 'Student' && (
              <FormControl fullWidth required>
                <InputLabel>Select Class</InputLabel>
                <Select
                  value={className}
                  label="Select Class"
                  onChange={changeHandler}
                >
                  {sclassesList.map((item, index) => (
                    <MenuItem key={index} value={item.sclassName}>
                      {item.sclassName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Roll Number"
              type="number"
              fullWidth
              variant="outlined"
              value={rollNum}
              onChange={(e) => setRollNum(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loader}
            >
              {loader ? <CircularProgress size={24} color="inherit" /> : 'Add'}
            </Button>
          </Stack>
        </form>
      </Paper>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default AddStudent;
