import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LightCard from "./LightCard";
import GaugeComponent from "./GaugeComponent";

const StatBox = ({ title, subtitle, icon, progress, increase, isUp, data, value, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box width="100%" m="0 20px">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          {/* <Box width="65px" height="65px" display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#ccc"
            borderRadius="10px"
            marginRight="10px"
          >
            {icon}
          </Box> */}
          <GaugeComponent
            value={value}
            baseColor={color}
            icon={icon}
          />

          <Box>
            <Typography variant="h5"
              fontSize="26px"
              sx={{ color: "#6870FA" }}>
              {subtitle}
              {/* <Typography
                component="span"
                sx={{ color: isUp ? '#004d00' : 'red', marginLeft: '8px', fontSize: '14px' }}
              >
                {isUp ? (
                  <TrendingUpIcon sx={{ fontSize: '16px', verticalAlign: 'middle' }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: '16px', verticalAlign: 'middle' }} />
                )}
                {increase}
              </Typography> */}
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              fontSize="20px"
              sx={{ color: colors.grey[100] }}
            >
              {value} {title}
            </Typography>
          </Box>
        </Box>

        <Box
          width="100px" height="100px" display="flex"
          alignItems="center"
          justifyContent="center"
          marginRight="10px"
        >
          {/* <LightCard
            data={data}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
