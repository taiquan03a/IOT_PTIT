import React, { useState, useEffect } from 'react';
import { Box, Grid, useTheme } from "@mui/material";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import Header from "../components/Header";

const Devices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState();
  const [selectedAction, setSelectedAction] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);  // DataGrid sử dụng chỉ mục trang bắt đầu từ 0
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [sortModel, setSortModel] = useState([{ field: 'id', sort: 'desc' }]);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "temperature",
      headerName: "Nhiệt độ",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "humidity",
      headerName: "Độ ẩm",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "light",
      headerName: "Ánh sáng",
      flex: 1,
    },
    {
      field: "random",
      headerName: "Random",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Thời gian",
      flex: 1,
    },
  ];
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);

  };
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedAction(value);
  };
  const fetchSearch = async () => {
    const sortField = sortModel[0]?.field || 'id';
    const sortDirection = sortModel[0]?.sort || 'desc';

    try {
      const response = await fetch(`http://localhost:8080/api/device/page?page=${page}&size=${pageSize}&sortBy=${sortField}&direction=${sortDirection}&searchBy=${selectedAction}&searchValue=${searchText}`);

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
  useEffect(() => {
    const fetchData = async () => {
      const sortField = sortModel[0]?.field || 'id';
      const sortDirection = sortModel[0]?.sort || 'desc';

      try {
        const response = await fetch(`http://localhost:8080/api/device/page?page=${page}&size=${pageSize}&sortBy=${sortField}&direction=${sortDirection}`);

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
    <Box m="20px">
      <Box backgroundColor="white" borderRadius="10px" padding="10px">
        <Header title="DATA SENSOR" />
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
                <MenuItem value="temperature">Nhiệt độ</MenuItem>
                <MenuItem value="humidity">Độ ẩm</MenuItem>
                <MenuItem value="light">Ánh sáng</MenuItem>
                <MenuItem value="time">Thời gian</MenuItem>
                <MenuItem value="random">Random</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item md={3}>
            <TextField
              label="Start Date"
              type="datetime-local"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              label="End Date"
              type="datetime-local"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid> */}
          <Grid item md={2}>
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
            disableSelectionOnClick
            style={{ fontSize: '16px' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Devices;
