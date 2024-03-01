import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card'

function CustomPopover({ data, isOpen, onClose }) {
  const style = {
    position: 'fixed', // Use fixed to position relative to the viewport
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Adjust to center perfectly
    width: 'fit-content', // Adjust width based on content
    maxWidth: '80%', // Prevent it from being too wide
  }
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
        <Typography sx={{ p: 2 }}>{data}</Typography>
      </Card>
    </Popover>
  );
}

export default CustomPopover;
