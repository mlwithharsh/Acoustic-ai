import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  useTheme 
} from '@mui/material';
import { 
  CalculateOutlined, 
  WarningAmberOutlined, 
  ReceiptLongOutlined,
  ArrowForwardIos
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      title: 'Tax Assistant',
      description: 'Get help with tax calculations, deductions, and planning to maximize your returns.',
      icon: <ReceiptLongOutlined sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      path: '/tax-assistant',
      color: theme.palette.primary.main,
    },
    {
      title: 'Finance Calculator',
      description: 'Calculate loans, mortgages, investments, and more with our comprehensive tools.',
      icon: <CalculateOutlined sx={{ fontSize: 60, color: theme.palette.secondary.main }} />,
      path: '/finance-calculator',
      color: theme.palette.secondary.main,
    },
    {
      title: 'Scam Detection',
      description: 'Protect yourself from financial scams with our detection and education resources.',
      icon: <WarningAmberOutlined sx={{ fontSize: 60, color: theme.palette.warning.main }} />,
      path: '/scam-detection',
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 8, 
          px: 2, 
          textAlign: 'center',
          borderRadius: 2,
          mb: 6,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          color: 'white',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Acoustic Finance
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          Your trusted partner for tax assistance, financial calculations, and scam protection
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          sx={{ 
            backgroundColor: 'white', 
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.grey[100],
            },
            px: 4,
            py: 1.5,
          }}
          component={Link}
          to="/tax-assistant"
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Our Services
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px -10px rgba(0,0,0,0.2)',
                },
                borderTop: `4px solid ${feature.color}`,
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  {feature.description}
                </Typography>
                <Button 
                  variant="text" 
                  color="primary" 
                  component={Link} 
                  to={feature.path}
                  endIcon={<ArrowForwardIos />}
                  sx={{ mt: 'auto' }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* About Section */}
      <Box sx={{ py: 6, bgcolor: theme.palette.grey[50], borderRadius: 2, px: 3 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Why Choose Acoustic Finance?
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Expert Financial Guidance
            </Typography>
            <Typography paragraph>
              Our platform provides accurate, up-to-date financial tools and information to help you make informed decisions about your money.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
              User-Friendly Interface
            </Typography>
            <Typography paragraph>
              We've designed our tools to be intuitive and easy to use, regardless of your financial expertise level.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Comprehensive Solutions
            </Typography>
            <Typography paragraph>
              From tax assistance to investment calculations and fraud protection, we offer all the tools you need in one place.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 3 }}>
              Security First
            </Typography>
            <Typography paragraph>
              Your financial security is our priority. Our scam detection tools help you identify and avoid potential financial threats.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;