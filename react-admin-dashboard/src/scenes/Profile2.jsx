import React from 'react';
import { Box, Avatar, Typography, Paper, Grid, Link as MuiLink, IconButton } from '@mui/material';
import { Email, Phone, Lock, Person } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import ProfileImage from '../img/user.jpg'
import GitHubIcon from '@mui/icons-material/GitHub';
import PostmanIcon from '../img/postman-icon.svg';
import Report from '../img/concourse.svg';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SchoolIcon from '@mui/icons-material/School';
import Wukong from '../img/wukong.jpg';

function Profile2() {
    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                height: '91vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    maxWidth: 600,
                    textAlign: 'center',
                    borderRadius: '16px',
                    width: '60%'
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#6870FA',
                        height: 120,
                        borderBottomLeftRadius: '50% 20%',
                        borderBottomRightRadius: '50% 20%',
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                ></Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: -8, // Để avatar nổi lên trên đường cắt
                    }}
                >
                    <Avatar
                        src={Wukong}
                        sx={{
                            width: 120,
                            height: 120,
                            border: '2px solid #fff',
                        }}
                    />
                    <Typography variant="h6" fontSize="35px">
                        Nguyễn Tài Quân
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        naresh@example.com
                    </Typography> */}
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        padding: 2,
                        borderRadius: '12px',
                        textAlign: 'left',
                        backgroundColor: '#ffffff'
                    }}
                >
                    {/* <Typography variant="h6" gutterBottom fontSize='20px'>
                        Personal Information
                    </Typography> */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <Box display="flex" alignItems="center" >
                                <Person sx={{ marginRight: 1, color: '#6870FA' }} />
                                <Typography variant="body1" sx={{ fontSize: "20px" }}>Họ và tên</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "20px" }}>
                                Nguyễn Tài Quân
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box display="flex" alignItems="center">
                                <Email sx={{ marginRight: 1, color: '#6870FA' }} />
                                <Typography variant="body1" sx={{ fontSize: "20px" }}>Mã sinh viên</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "20px" }}>
                                B21DCCN614
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box display="flex" alignItems="center">
                                <SchoolIcon sx={{ marginRight: 1, color: '#6870FA' }} />
                                <Typography variant="body1" sx={{ fontSize: "20px" }}>Lớp</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "20px" }}>
                                B21CQCN02-B
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box display="flex" alignItems="center">
                                <AssessmentIcon sx={{ marginRight: 1, color: '#6870FA' }} />
                                <Typography variant="body1" sx={{ fontSize: "20px" }}>Báo cáo</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "20px" }}>
                                <a href={Report}>Link báo cáo</a>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}>
                    <a href='https://github.com/taiquan03a'><GitHubIcon style={{ width: '40px', height: '40px', padding: '5px', color: 'black' }} /></a>
                    <a href='#'><img src={PostmanIcon} alt="img" style={{ width: 40, height: 40, padding: 5 }} /></a>
                </Box>
            </Paper>
        </Box>
    );
}

export default Profile2;
