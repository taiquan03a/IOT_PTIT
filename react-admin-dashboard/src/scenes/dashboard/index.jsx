import { Box, IconButton, Typography, useTheme, CircularProgress, Backdrop, Snackbar, Alert, TextField } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ModeFanOffIcon from '@mui/icons-material/ModeFanOff';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import './index.css';
import React, { useState, useEffect } from 'react';
import Fan from "../../img/fan-icon-png-2.jpg";
import Fan2 from "../../img/concourse.svg"

const Dashboard = () => {
  const lightData = [
    {
      id: 'light',
      data: [
        { x: '2023-08-10', y: 3000 },
        { x: '2023-08-11', y: 4500 },
        { x: '2023-08-12', y: 3200 },
        { x: '2023-08-13', y: 5000 },
        { x: '2023-08-14', y: 3500 },
        { x: '2023-08-15', y: 4500 },
        { x: '2023-08-16', y: 8400 },
      ],
    },
  ];
  const lightData2 = [
    {
      id: 'nhiet do',
      data: [
        { x: '2023-08-10', y: 5400 },
        { x: '2023-08-11', y: 4500 },
        { x: '2023-08-12', y: 3200 },
        { x: '2023-08-13', y: 5000 },
        { x: '2023-08-14', y: 3500 },
        { x: '2023-08-15', y: 4500 },
        { x: '2023-08-16', y: 3200 },
      ],
    },
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(() => {
    return JSON.parse(localStorage.getItem('isSpinning')) || false;
  });
  const [isOn, setIsOn] = useState(() => {
    return JSON.parse(localStorage.getItem('isOn')) || false;
  });
  const [isAc, setIsAc] = useState(() => {
    return JSON.parse(localStorage.getItem('isAc')) || false;
  });
  const [valueLight, setValueLight] = useState(0);
  const [valueTem, setValueTem] = useState(0);
  const [valueHum, setValueHum] = useState(0);
  const [valueRandom, setValueRandom] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDeviceChartData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/device/values', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const countRandom = await fetch('http://localhost:8080/api/device/count', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const re = await countRandom.json();
        setCount(re.count);

        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('data->', data);
        setValueLight(data.light);
        setValueRandom(data.random);
        if (data.random > 60) {
          setOpenSnackbar(true);
        } else {
          setOpenSnackbar(false);
        }
        setValueTem(data.temperature);
        setValueHum(data.humidity);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDeviceChartData();
    const intervalId = setInterval(fetchDeviceChartData, 2000);
    return () => clearInterval(intervalId);
  }, []);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const ledControl = async (action) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/device/control?${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.text();
      console.log("led->", result);
      return result;
    } catch (error) {
      console.error("Error toggling bulb state:", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const toggleSpin = async () => {
    if (isSpinning == true) {
      const action = 'action=offLed1';
      const check = await ledControl(action);
      if (check == "offLed1") setIsSpinning(false);
    } else {
      const action = 'action=onLed1';
      const check = await ledControl(action);
      if (check == "onLed1") setIsSpinning(true);
    }
  };
  const handleToggle = async () => {
    if (isOn == true) {
      const action = 'action=offLed3';
      const check = await ledControl(action);
      if (check == "offLed3") setIsOn(false);
    } else {
      const action = 'action=onLed3';
      const check = await ledControl(action);
      console.log("check", check);
      if (check == "onLed3") {
        setIsOn(true);
      }
    }
  };
  const handleAcUnit = async () => {
    if (isAc == true) {
      const action = 'action=offLed2';
      const check = await ledControl(action);
      if (check == 'offLed2') setIsAc(false);
    } else {
      const action = 'action=onLed2';
      const check = await ledControl(action);
      if (check == 'onLed2') setIsAc(true);
    }
  }
  useEffect(() => {
    localStorage.setItem('isSpinning', JSON.stringify(isSpinning));
  }, [isSpinning]);

  useEffect(() => {
    localStorage.setItem('isOn', JSON.stringify(isOn));
  }, [isOn]);

  useEffect(() => {
    localStorage.setItem('isAc', JSON.stringify(isAc));
  }, [isAc]);
  return (
    <Box m="20px">
      {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={500} // Tự động tắt sau 5 giây
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          <h2>
            Giá trị lớn hơn 60!!!
          </h2>
          <p>
            Số lần cảnh báo {count}
          </p>

        </Alert>
      </Snackbar> */}
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" />
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="40px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          //backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
          sx={{ background: 'linear-gradient(to right, white, #ffd434)', }}
        >
          <StatBox
            title="LUX"
            value={valueLight}
            subtitle="Ánh sáng"
            progress="0.75"
            increase="+14%"
            isUp="true"
            color="yellow"
            data={lightData}
            icon={
              <WbSunnyIcon
                sx={{ color: "yellow", fontSize: "30px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
          sx={{ background: 'linear-gradient(to right, #ffe6e6, #ff6363)' }}
        >
          <StatBox
            title="&#176; C"
            value={valueTem}
            subtitle="Nhiệt độ"
            progress="0.50"
            increase="-21%"
            isUp=""
            color="red"
            data={lightData2}
            icon={
              <DeviceThermostatIcon
                sx={{ color: "red", fontSize: "30px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
          sx={{ background: 'linear-gradient(to right, #D8EDFE, #7fc1fa)' }}
        >
          <StatBox
            title="%"
            value={valueHum}
            subtitle="Độ ẩm"
            progress="0.30"
            increase="+5%"
            isUp="true"
            color="blue"
            data={lightData}
            icon={
              <InvertColorsIcon
                sx={{ color: "blue", fontSize: "30px" }}
              />
            }
          />
        </Box>
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
          sx={{ background: 'linear-gradient(to right, #D8EDFE, #7fc1fa)' }}
        >
          <StatBox
            title="%"
            value={valueRandom}
            subtitle="Random"
            progress="0.30"
            increase="+5%"
            isUp="true"
            color="blue"
            data={lightData}
            icon={
              <InvertColorsIcon
                sx={{ color: "blue", fontSize: "30px" }}
              />
            }
          />
        </Box> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          borderRadius="10px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                fontSize="26px"
              >
                Biểu đồ
              </Typography>
            </Box>
            <Box>
              {/* <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton> */}
            </Box>
          </Box>
          <Box height="400px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius="10px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600" fontSize="26px">
              Điều khiển thiết bị
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box className="fan-toggle-container">
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
                className={isSpinning ? "rotating-fan" : ""}
              >
                {isSpinning ? (
                  <img src={Fan2} alt="img" style={{ width: 100, height: 100 }} className="fan-icon" />
                ) : (
                  <ModeFanOffIcon style={{ fontSize: 100 }} />
                )}
              </Typography>

            </Box>
            <label className="switch">
              <input type="checkbox" checked={isSpinning} onChange={toggleSpin} />
              <span className="slider"></span>
            </label>
          </Box >
          <Box display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="15px"
            borderBottom={`4px solid ${colors.primary[500]}`}
            className="bulb-toggle-container">
            <EmojiObjectsIcon className={`bulb-icon ${isOn ? "bulb-on" : "bulb-off"}`} style={{ fontSize: 100 }} />
            <label className="switch">
              <input type="checkbox" checked={isOn} onChange={handleToggle} />
              <span className="slider"></span>
            </label>
          </Box>
          <Box display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="15px">
            <AcUnitIcon
              style={{
                fontSize: 100,
                color: isAc ? 'blue' : '#ccc',
              }}
              className={isAc ? "rotating-fan" : ""}
            />
            <label className="switch">
              <input type="checkbox" checked={isAc} onChange={handleAcUnit} />
              <span className="slider"></span>
            </label>
          </Box>
        </Box>

        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
