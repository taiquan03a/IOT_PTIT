import React from 'react';
import { Container, Grid, Typography, Avatar, Button, Paper } from '@mui/material';
import profileImage from "../img/fan-icon-png-2.jpg"

const Profile = () => {
    return (
        <Container maxWidth="sm">
            <Paper
                sx={{
                    padding: 4,
                    marginTop: 10,
                    backgroundColor: '#f0f4f8',
                    borderRadius: 2,
                }}
                elevation={3}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: 16,
                    }}
                >
                    <Avatar
                        alt="Profile Picture"
                        src={profileImage}
                        sx={{
                            width: 160,
                            height: 160,
                            marginBottom: 2,
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                        }}
                    >
                        Nguyễn Tài Quân
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Mã Sinh Viên: B21DCCN614
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Lớp: CNPM1
                    </Typography>
                    <Typography variant="body1">
                        Báo cáo: <a href={profileImage} target="_blank" rel="noopener noreferrer">Xem Báo Cáo</a>
                    </Typography>
                </div>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://github.com/your-github-profile"
                            target="_blank"
                        >
                            Link GitHub
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            href="https://api-doc-link.com"
                            target="_blank"
                        >
                            API Documentation
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Profile;
