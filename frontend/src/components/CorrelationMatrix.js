import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';

function CustomPopover({ data, isOpen, onClose }) {
  const fields = Object.keys(data);
  console.log("fields", fields);

  // Define columns for MUI Data Grid
  const columns = [
    { field: 'id', headerName: 'Field', width: 150, editable: false },
    ...fields.map(field => ({
      field: field,
      headerName: field,
      width: 150,
      type: 'number',
      editable: false,
    }))
  ];

  // Transform the data into a format suitable for MUI Data Grid
  const rows = fields.map((field, index) => ({
    id: field,
    ...fields.reduce((acc, curr) => ({ ...acc, [curr]: data[field][curr] }), {}),
  }));


  return (
    <Popover
      open={isOpen}
      onClose={onClose}
      anchorReference={"none"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <CardHeader title="Correlation Matrix" />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          style={{ padding: 20 }}
        />
      </Card>
    </Popover>
  );
}

export default CustomPopover;
