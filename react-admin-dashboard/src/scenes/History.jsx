import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import Header from "../components/Header";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const initialRows = [
    { id: 1, name: 'Quạt', action: 'On', time: '2024-08-01 10:00' },
    { id: 2, name: 'Điều hòa', action: 'Off', time: '2024-08-01 10:30' },
    { id: 3, name: 'Bóng đèn', action: 'On', time: '2024-08-02 09:45' },
    { id: 4, name: 'Quạt', action: 'Off', time: '2024-08-02 11:00' },
    { id: 5, name: 'Quạt', action: 'On', time: '2024-08-01 10:00' },
    { id: 6, name: 'Điều hòa', action: 'Off', time: '2024-08-01 10:30' },
    { id: 7, name: 'Bóng đèn', action: 'On', time: '2024-08-02 09:45' },
    { id: 8, name: 'Quạt', action: 'Off', time: '2024-08-02 11:00' },
    { id: 9, name: 'Quạt', action: 'On', time: '2024-08-01 10:00' },
    { id: 10, name: 'Điều hòa', action: 'Off', time: '2024-08-01 10:30' },
    { id: 11, name: 'Bóng đèn', action: 'On', time: '2024-08-02 09:45' },
    { id: 12, name: 'Quạt', action: 'Off', time: '2024-08-02 11:00' },
    { id: 13, name: 'Quạt', action: 'On', time: '2024-08-01 10:00' },
    { id: 14, name: 'Điều hòa', action: 'Off', time: '2024-08-01 10:30' },
    { id: 15, name: 'Bóng đèn', action: 'On', time: '2024-08-02 09:45' },
    { id: 16, name: 'Quạt', action: 'Off', time: '2024-08-02 11:00' },
];

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'device', headerName: 'Name', flex: 1 },
    { field: 'action', headerName: 'Action', flex: 1 },
    { field: 'time', headerName: 'Time', flex: 1 },
];

const History = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchText, setSearchText] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [rows, setRows] = useState(initialRows);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);  // DataGrid sử dụng chỉ mục trang bắt đầu từ 0
    const [pageSize, setPageSize] = useState(10);
    const [rowCount, setRowCount] = useState(0);
    const [sortModel, setSortModel] = useState([{ field: 'id', sort: 'desc' }]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchText(value);

    };
    const fetchSearch = async () => {
        const sortField = sortModel[0]?.field || 'id';
        const sortDirection = sortModel[0]?.sort || 'desc';

        try {
            const response = await fetch(`http://localhost:8080/api/action/page?page=${page}&size=${pageSize}&sortBy=${sortField}&direction=${sortDirection}&searchBy=${selectedAction}&searchValue=${searchText}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setData(result.content);
            setRowCount(result.totalElements);  // Tổng số bản ghi để sử dụng trong phân trang
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setSelectedAction(value);
        filterRows(searchText, value);
    };

    const filterRows = (searchText, selectedAction) => {
        const filteredRows = initialRows.filter((row) => {
            const matchesSearchText = Object.values(row).some((field) =>
                String(field).toLowerCase().includes(searchText)
            );
            const matchesAction = selectedAction ? row.action === selectedAction : true;
            return matchesSearchText && matchesAction;
        });

        setRows(filteredRows);
    };
    const handleStartDateChange = (date) => {
        setStartDate(date);
        filterRows(searchText, selectedAction, date, endDate);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        filterRows(searchText, selectedAction, startDate, date);
    };
    useEffect(() => {
        const fetchData = async () => {
            const sortField = sortModel[0]?.field || 'id';
            const sortDirection = sortModel[0]?.sort || 'desc';

            try {
                const response = await fetch(`http://localhost:8080/api/action/page?page=${page}&size=${pageSize}&sortBy=${sortField}&direction=${sortDirection}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result.content);
                setRowCount(result.totalElements);  // Tổng số bản ghi để sử dụng trong phân trang
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [page, pageSize, sortModel]);

    return (

        <Box m="20px" >
            <Box backgroundColor="white" borderRadius="10px" padding="20px">
                <Header title="LỊCH SỬ TRẠNG THÁI THIẾT BỊ" />
                <Grid container spacing={2} alignItems="center" marginBottom={2} width="100%">
                    <Grid item md={2}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchText}
                            onChange={handleSearch}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={2}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>SearchBy</InputLabel>
                            <Select
                                value={selectedAction}
                                onChange={handleFilterChange}
                                label="Action"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="device">device</MenuItem>
                                <MenuItem value="action">action</MenuItem>
                                <MenuItem value="time">time</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={fetchSearch}
                            sx={{ backgroundColor: "#6870FA", height: '50px', width: '120px' }}
                        >
                            Search
                        </Button>
                    </Grid>

                </Grid>
                <Box
                    m="20px 0 0 0"
                    height="70vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-row": {
                            borderBottom: '1px solid #ddd',
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#ccc",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px"
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: "#ccc",
                            borderBottomLeftRadius: "20px",
                            borderBottomRightRadius: "20px"
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pagination
                        page={page}
                        pageSize={pageSize}
                        rowCount={rowCount}
                        paginationMode="server"
                        onPageChange={(newPage) => setPage(newPage)}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[10, 15, 20, 100]}
                        sortModel={sortModel}
                        onSortModelChange={(model) => setSortModel(model)}
                        style={{ fontSize: '16px' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default History;
