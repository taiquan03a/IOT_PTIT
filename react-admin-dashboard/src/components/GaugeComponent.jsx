import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Slider } from '@mui/material';
import StatBox from './StatBox';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const GaugeComponent = ({ baseColor, value, icon }) => {
    if (value > 100) {
        value = value / 41;
    }
    const getColorBasedOnValue = (value, baseColor) => {
        console.log(value)
        const intensity = Math.max(0, 255 - Math.floor((value / 100) * 255));

        switch (baseColor) {
            case 'red':
                return `rgb(${intensity}, 0, 0)`;
            case 'yellow':
                return `rgb(${intensity}, ${intensity}, 0)`;
            case 'blue':
                return `rgb(0, 0, ${intensity})`;
            case 'green':
            default:
                return `rgb(0, ${intensity}, 0)`;
        }
    };

    return (
        <Box position="relative" display="inline-flex" marginRight="5px">
            <CircularProgress
                variant="determinate"
                value={value}
                size={80}
                thickness={5}
                sx={{
                    color: getColorBasedOnValue(value, baseColor), // Sử dụng màu dựa trên giá trị
                    transform: 'rotate(0deg)',
                }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* <WbSunnyIcon
                    sx={{ color: getColorBasedOnValue(value, baseColor), fontSize: "30px", marginBottom: '13px' }}
                /> */}
                <Box sx={{ marginBottom: '13px' }}>
                    {icon}
                </Box>

            </Box>
        </Box>

    );
};

export default GaugeComponent;
