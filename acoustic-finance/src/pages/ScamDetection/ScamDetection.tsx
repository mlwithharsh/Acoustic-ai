import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Grid,
} from '@mui/material';   
import {
  WarningAmber,
  CheckCircle,
  ErrorOutline,
  ExpandMore,
  PhishingOutlined,
  AccountBalanceWalletOutlined,
  EmailOutlined,
  CreditCardOutlined,
  LocalAtmOutlined,
} from '@mui/icons-material';

const ScamDetection: React.FC = () => {
  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Common financial scam keywords and patterns
  const scamKeywords = [
    'urgent', 'immediate action', 'act now', 'limited time', 'exclusive deal',
    'guaranteed return', 'risk-free investment', 'double your money',
    'secret', 'hidden', 'they don\'t want you to know', 'insider',
    'lottery', 'winner', 'prize', 'inheritance', 'unclaimed',
    'nigerian prince', 'foreign official', 'overseas',
    'verify your account', 'update your information', 'suspicious activity',
    'cryptocurrency', 'bitcoin', 'investment opportunity',
    'social security number', 'password', 'pin', 'account number',
    'wire transfer', 'western union', 'money order',
    'irs', 'tax', 'refund', 'government',
  ];

  // Common scam email domains
  const suspiciousDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', // Not actually suspicious, but official organizations typically use their own domains
    'mail.ru', 'protonmail.com', 'yandex.ru',
  ];

  // Analyze text for potential scams
  const analyzeText = () => {
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const text = inputText.toLowerCase();
      const foundKeywords: string[] = [];
      let riskScore = 0;
      
      // Check for scam keywords
      scamKeywords.forEach(keyword => {
        if (text.includes(keyword.toLowerCase())) {
          foundKeywords.push(keyword);
          riskScore += 10; // Increase risk score for each keyword found
        }
      });
      
      // Check for suspicious email domains
      const emailRegex = /[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
      const emails = text.match(emailRegex) || [];
      const suspiciousEmails: string[] = [];
      
      emails.forEach(email => {
        const domain = email.split('@')[1];
        if (suspiciousDomains.includes(domain.toLowerCase())) {
          suspiciousEmails.push(email);
          riskScore += 5; // Increase risk score for suspicious email domains
        }
      });
      
      // Check for URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = text.match(urlRegex) || [];
      
      if (urls.length > 0) {
        riskScore += 5; // Increase risk score if URLs are present
      }
      
      // Check for urgency language
      const urgencyPatterns = ['urgent', 'immediately', 'today', 'now', 'hurry', 'limited time', 'expires'];
      const foundUrgency = urgencyPatterns.filter(pattern => text.includes(pattern));
      
      if (foundUrgency.length > 0) {
        riskScore += 15; // Increase risk score significantly for urgency language
      }
      
      // Check for financial promises
      const promisePatterns = ['guarantee', 'guaranteed', '100%', 'risk-free', 'no risk', 'double', 'triple', 'return'];
      const foundPromises = promisePatterns.filter(pattern => text.includes(pattern));
      
      if (foundPromises.length > 0) {
        riskScore += 20; // Increase risk score significantly for unrealistic financial promises
      }
      
      // Cap the risk score at 100
      riskScore = Math.min(riskScore, 100);
      
      // Determine risk level
      let riskLevel;
      let riskColor;
      
      if (riskScore < 20) {
        riskLevel = 'Low';
        riskColor = theme.palette.success.main;
      } else if (riskScore < 50) {
        riskLevel = 'Medium';
        riskColor = theme.palette.warning.main;
      } else {
        riskLevel = 'High';
        riskColor = theme.palette.error.main;
      }
      
      // Set scan result
      setScanResult({
        riskScore,
        riskLevel,
        riskColor,
        foundKeywords,
        suspiciousEmails,
        urls,
        foundUrgency,
        foundPromises,
      });
      
      setLoading(false);
    }, 1500); // Simulate processing delay
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      analyzeText();
    }
  };

  const renderResult = () => {
    if (!scanResult) return null;
    
    return (
      <Box sx={{ mt: 4 }}>
        <Alert 
          severity={scanResult.riskLevel === 'Low' ? 'success' : scanResult.riskLevel === 'Medium' ? 'warning' : 'error'}
          sx={{ mb: 3 }}
        >
          <AlertTitle>Scam Risk Assessment: {scanResult.riskLevel} Risk</AlertTitle>
          Our analysis indicates this message has a <strong>{scanResult.riskLevel.toLowerCase()}</strong> risk of being a financial scam.
        </Alert>
        
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader 
                title="Risk Score" 
                titleTypographyProps={{ align: 'center' }}
                sx={{ bgcolor: theme.palette.grey[50] }}
              />
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Box 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    bgcolor: `${scanResult.riskColor}20`,
                    border: `8px solid ${scanResult.riskColor}`,
                    mb: 2,
                  }}
                >
                  <Typography variant="h4"  sx={{ fontWeight: 'bold', color: scanResult.riskColor }}>
                    {scanResult.riskScore}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Score ranges from 0 (safe) to 100 (high risk)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader 
                title="Detected Warning Signs" 
                titleTypographyProps={{ align: 'left' }}
                sx={{ bgcolor: theme.palette.grey[50] }}
              />
              <CardContent>
                <List dense>
                  {scanResult.foundKeywords.length > 0 && (
                    <ListItem>
                      <ListItemIcon>
                        <WarningAmber color="warning" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Suspicious Keywords Detected" 
                        secondary={`Found: ${scanResult.foundKeywords.slice(0, 5).join(', ')}${scanResult.foundKeywords.length > 5 ? '...' : ''}`}
                      />
                    </ListItem>
                  )}
                  
                  {scanResult.suspiciousEmails.length > 0 && (
                    <ListItem>
                      <ListItemIcon>
                        <EmailOutlined color="warning" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Suspicious Email Addresses" 
                        secondary={`Found: ${scanResult.suspiciousEmails.join(', ')}`}
                      />
                    </ListItem>
                  )}
                  
                  {scanResult.urls.length > 0 && (
                    <ListItem>
                      <ListItemIcon>
                        <PhishingOutlined color="warning" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Contains URLs (Potential Phishing)" 
                        secondary="Be cautious of links that may lead to fake websites"
                      />
                    </ListItem>
                  )}
                  
                  {scanResult.foundUrgency.length > 0 && (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorOutline color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Creates False Urgency" 
                        secondary="Scammers often create a false sense of urgency to pressure you"
                      />
                    </ListItem>
                  )}
                  
                  {scanResult.foundPromises.length > 0 && (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorOutline color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Unrealistic Financial Promises" 
                        secondary="Be skeptical of guaranteed returns or risk-free investments"
                      />
                    </ListItem>
                  )}
                  
                  {scanResult.foundKeywords.length === 0 && 
                   scanResult.suspiciousEmails.length === 0 && 
                   scanResult.urls.length === 0 && 
                   scanResult.foundUrgency.length === 0 && 
                   scanResult.foundPromises.length === 0 && (
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="No Obvious Warning Signs" 
                        secondary="While no clear warning signs were detected, always remain vigilant"
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>What Should You Do?</Typography>
          <Typography paragraph>
            {scanResult.riskLevel === 'Low' 
              ? 'This message appears to be relatively safe, but always exercise caution with financial matters.'
              : scanResult.riskLevel === 'Medium'
              ? 'This message shows some warning signs. Proceed with caution and verify through official channels.'
              : 'This message shows multiple red flags typical of financial scams. We strongly advise against responding or providing any personal information.'}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Scam Detection
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Protect yourself from financial scams by analyzing suspicious messages, emails, or offers.
          Our tool helps identify common warning signs and provides guidance on how to respond.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Analyze Suspicious Content
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Paste the suspicious message, email, or offer below to analyze it for potential scam indicators.
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <TextField
                label="Paste suspicious text here"
                multiline
                rows={10}
                value={inputText}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Example: Congratulations! You've won $5,000,000 in the international lottery. To claim your prize, please send $500 processing fee to..."
                sx={{ mb: 2 }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                disabled={!inputText.trim() || loading}
              >
                {loading ? 'Analyzing...' : 'Analyze for Scams'}
              </Button>
            </form>
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          {scanResult ? (
            renderResult()
          ) : (
            <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" gutterBottom>
                Common Financial Scams
              </Typography>
              <Typography variant="body2" paragraph>
                Be aware of these common financial scams to protect yourself and your assets.
              </Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhishingOutlined sx={{ mr: 1, color: theme.palette.error.main }} />
                    <Typography variant="subtitle1">Phishing Scams</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Phishing scams attempt to steal your personal information by impersonating legitimate organizations.
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>Warning Signs:</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Emails claiming to be from banks, government agencies, or well-known companies" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Urgent requests to verify account information" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Links to websites that look legitimate but have slight URL differences" />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalanceWalletOutlined sx={{ mr: 1, color: theme.palette.error.main }} />
                    <Typography variant="subtitle1">Investment Scams</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Investment scams promise high returns with little or no risk, often involving fake opportunities.
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>Warning Signs:</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Guaranteed high returns with no risk" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Pressure to invest quickly before an 'opportunity' expires" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Unregistered investments or unlicensed sellers" />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardOutlined sx={{ mr: 1, color: theme.palette.error.main }} />
                    <Typography variant="subtitle1">Credit Card Scams</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Credit card scams involve attempts to steal your card information or make unauthorized charges.
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>Warning Signs:</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Calls claiming to be from your credit card company asking for your card details" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Skimming devices attached to ATMs or point-of-sale terminals" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Fake websites that collect credit card information" />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalAtmOutlined sx={{ mr: 1, color: theme.palette.error.main }} />
                    <Typography variant="subtitle1">Advance Fee Scams</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Advance fee scams ask you to pay money upfront to receive a larger sum later, which never materializes.
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>Warning Signs:</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Notifications about winning a lottery you never entered" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Inheritance claims from unknown relatives" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><ErrorOutline fontSize="small" /></ListItemIcon>
                      <ListItemText primary="Requests for upfront fees to release funds" />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}
        </Grid>
      </Grid>
      
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          How to Protect Yourself from Financial Scams
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Verify the Source" 
                  secondary="Contact organizations directly using official phone numbers or websites, not the contact information provided in suspicious messages."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Be Skeptical of Urgency" 
                  secondary="Legitimate organizations rarely create extreme urgency. Take your time to verify before acting."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Guard Personal Information" 
                  secondary="Never share sensitive information like Social Security numbers, account numbers, or passwords via email or phone."
                />
              </ListItem>
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Use Strong Security Measures" 
                  secondary="Enable two-factor authentication, use strong passwords, and regularly monitor your accounts for suspicious activity."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Research Before Investing" 
                  secondary="Verify investment opportunities with registered financial advisors and check credentials with regulatory authorities."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Report Scams" 
                  secondary="Report suspected scams to the Federal Trade Commission (FTC), FBI's Internet Crime Complaint Center, or local authorities."
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ScamDetection;