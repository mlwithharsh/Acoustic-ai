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
      {/* Google Login Button at the bottom */}
      <Box sx={{ position: 'absolute', bottom: 24, left: 0, width: '100%', px: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: 24,
              padding: '8px 24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 16,
              color: '#4285F4',
              transition: 'background 0.2s',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
              <g>
                <path fill="#4285F4" d="M12 12.5v-2.5h7.5c0.2 1.1 0.2 2.2 0 3.3-0.3 1.3-1.1 2.5-2.1 3.3l-2.1-1.6c0.6-0.5 1.1-1.2 1.3-2h-4.6z"/>
                <path fill="#34A853" d="M12 12.5v-2.5h-4.6c-0.2 0.8-0.2 1.7 0 2.5 0.3 1.3 1.1 2.5 2.1 3.3l2.1-1.6c-0.6-0.5-1.1-1.2-1.3-2h4.6z"/>
                <path fill="#FBBC05" d="M12 12.5v-2.5h-4.6c-0.2 0.8-0.2 1.7 0 2.5 0.3 1.3 1.1 2.5 2.1 3.3l2.1-1.6c-0.6-0.5-1.1-1.2-1.3-2h4.6z"/>
                <path fill="#EA4335" d="M12 12.5v-2.5h7.5c0.2 1.1 0.2 2.2 0 3.3-0.3 1.3-1.1 2.5-2.1 3.3l-2.1-1.6c0.6-0.5 1.1-1.2 1.3-2h-4.6z"/>
              </g>
            </svg>
            Login with Google
          </button>
        </Box>
      </Box>
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