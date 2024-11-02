import React from 'react';
import { Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';

const LightCard = ({ data }) => {
    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 10, bottom: 20, left: 30 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                enableGridX={false}
                enableGridY={false}
                lineWidth={3}
                pointSize={0}
                useMesh={true}
                colors={['#6870FA']}
                curve="monotoneX"
                enableArea={false}
                areaOpacity={0.2}
                theme={{
                    axis: {
                        ticks: {
                            line: {
                                stroke: '#ccc',
                            },
                            text: {
                                fill: '#aaa',
                            },
                        },
                    },
                }}
            />
        </Box>
    );
};

export default LightCard;
