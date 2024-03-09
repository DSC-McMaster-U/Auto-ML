import React from 'react';
import { Card, CardHeader, Popover } from '@mui/material'

function CustomPopover({ eda, isOpen, onClose }) {

  const data = eda.data;
  const url = eda.graph_url;

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
      <Card sx={{ padding: '1rem' }}>
        <CardHeader title="Correlation Matrix" subheader="Press ESC or click outside the area to exit." />
        <img src={url} sx={{ width: 'auto' }}></img>
      </Card>
    </Popover>
  );
}

export default CustomPopover;
