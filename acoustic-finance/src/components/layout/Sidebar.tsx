import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import {
  CalculateOutlined,
  WarningAmberOutlined,
  ReceiptLongOutlined,
  HomeOutlined,
} from '@mui/icons-material';

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  window?: () => Window;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle, window }) => {
  const theme = useTheme();
  const location = useLocation();
  
  const menuItems = [
    { text: 'Home', icon: <HomeOutlined />, path: '/' },
    { text: 'Tax Assistant', icon: <ReceiptLongOutlined />, path: '/tax-assistant' },
    { text: 'Finance Calculator', icon: <CalculateOutlined />, path: '/finance-calculator' },
    { text: 'Scam Detection', icon: <WarningAmberOutlined />, path: '/scam-detection' },
  ];

  const drawer = (
    <div>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6"  sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Acoustic Finance
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  backgroundColor: isActive ? theme.palette.primary.light + '20' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive 
                      ? theme.palette.primary.light + '30' 
                      : theme.palette.action.hover,
                  },
                  borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
                  pl: isActive ? 1.5 : 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: isActive ? 'bold' : 'regular',
                    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;