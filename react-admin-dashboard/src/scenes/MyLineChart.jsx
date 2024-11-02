import { ResponsiveLine } from '@nivo/line';
import { Box, CircularProgress } from "@mui/material";

function MyLineChart() {
    const data = [
        {
            id: "Series 1",
            data: [
                { x: "Point A", y: 10 },
                { x: "Point B", y: 20 },
                { x: "Point C", y: 30 },
            ],
        },
        {
            id: "Series 2",
            data: [
                { x: "Point A", y: 30 },
                { x: "Point B", y: 10 },
                { x: "Point C", y: 20 },
            ],
        },
    ];
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-flex',
                width: 100,
                height: 100,
            }}
        >
            <CircularProgress
                size={100}
                sx={{
                    color: '#00bcd4', // Màu của vòng tròn chính
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f5', // Màu nền phía trong
                    zIndex: -1,
                }}
            />
        </Box>

    );
}

export default MyLineChart;
