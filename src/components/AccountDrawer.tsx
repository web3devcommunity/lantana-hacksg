import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const AccountDrawer = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(isOpen);
    };

  return (
    <React.Fragment>
      <IconButton onClick={toggleDrawer(true)}>
        <AccountCircleIcon />
      </IconButton>

      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {children}
        </Box>
      </Drawer>
    </React.Fragment>
  );
};
