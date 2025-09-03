import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid ,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Card,
  CardContent,
  Divider,
  useTheme,
} from '@mui/material';
import { ArrowBack, ArrowForward, Check } from '@mui/icons-material';

const steps = ['Personal Information', 'Income Details', 'Deductions', 'Results'];

const TaxAssistant: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    filingStatus: '',
    annualIncome: '',
    additionalIncome: '',
    federalTaxWithheld: '',
    stateTaxWithheld: '',
    mortgageInterest: '',
    charitableDonations: '',
    medicalExpenses: '',
    educationExpenses: '',
    retirementContributions: '',
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      filingStatus: '',
      annualIncome: '',
      additionalIncome: '',
      federalTaxWithheld: '',
      stateTaxWithheld: '',
      mortgageInterest: '',
      charitableDonations: '',
      medicalExpenses: '',
      educationExpenses: '',
      retirementContributions: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  // Simple tax calculation for demonstration
  const calculateTax = () => {
    const income = parseFloat(formData.annualIncome) || 0;
    const additionalIncome = parseFloat(formData.additionalIncome) || 0;
    const totalIncome = income + additionalIncome;
    
    // Simple progressive tax brackets (for demonstration)
    let taxAmount = 0;
    if (totalIncome <= 10000) {
      taxAmount = totalIncome * 0.1;
    } else if (totalIncome <= 40000) {
      taxAmount = 1000 + (totalIncome - 10000) * 0.12;
    } else if (totalIncome <= 85000) {
      taxAmount = 4600 + (totalIncome - 40000) * 0.22;
    } else if (totalIncome <= 165000) {
      taxAmount = 14500 + (totalIncome - 85000) * 0.24;
    } else if (totalIncome <= 210000) {
      taxAmount = 33700 + (totalIncome - 165000) * 0.32;
    } else if (totalIncome <= 520000) {
      taxAmount = 47700 + (totalIncome - 210000) * 0.35;
    } else {
      taxAmount = 157500 + (totalIncome - 520000) * 0.37;
    }
    
    // Calculate deductions
    const mortgageInterest = parseFloat(formData.mortgageInterest) || 0;
    const charitableDonations = parseFloat(formData.charitableDonations) || 0;
    const medicalExpenses = parseFloat(formData.medicalExpenses) || 0;
    const educationExpenses = parseFloat(formData.educationExpenses) || 0;
    const retirementContributions = parseFloat(formData.retirementContributions) || 0;
    
    const totalDeductions = mortgageInterest + charitableDonations + medicalExpenses + educationExpenses + retirementContributions;
    
    // Apply standard deduction or itemized deductions (whichever is greater)
    const standardDeduction = 12950; // 2022 standard deduction for single filers
    const deduction = Math.max(standardDeduction, totalDeductions);
    
    const taxableIncome = Math.max(0, totalIncome - deduction);
    
    // Recalculate tax based on taxable income
    let finalTax = 0;
    if (taxableIncome <= 10000) {
      finalTax = taxableIncome * 0.1;
    } else if (taxableIncome <= 40000) {
      finalTax = 1000 + (taxableIncome - 10000) * 0.12;
    } else if (taxableIncome <= 85000) {
      finalTax = 4600 + (taxableIncome - 40000) * 0.22;
    } else if (taxableIncome <= 165000) {
      finalTax = 14500 + (taxableIncome - 85000) * 0.24;
    } else if (taxableIncome <= 210000) {
      finalTax = 33700 + (taxableIncome - 165000) * 0.32;
    } else if (taxableIncome <= 520000) {
      finalTax = 47700 + (taxableIncome - 210000) * 0.35;
    } else {
      finalTax = 157500 + (taxableIncome - 520000) * 0.37;
    }
    
    // Tax credits and withholdings
    const federalWithheld = parseFloat(formData.federalTaxWithheld) || 0;
    const stateWithheld = parseFloat(formData.stateTaxWithheld) || 0;
    
    const totalWithheld = federalWithheld + stateWithheld;
    const taxDue = finalTax - totalWithheld;
    
    return {
      totalIncome,
      taxableIncome,
      totalDeductions: deduction,
      taxAmount: finalTax,
      totalWithheld,
      taxDue,
      refund: taxDue < 0 ? Math.abs(taxDue) : 0,
      amountOwed: taxDue > 0 ? taxDue : 0,
    };
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth required>
                <InputLabel id="filing-status-label">Filing Status</InputLabel>
                <Select
                  labelId="filing-status-label"
                  id="filingStatus"
                  name="filingStatus"
                  value={formData.filingStatus}
                  label="Filing Status"
                  onChange={handleChange}
                >
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married_joint">Married Filing Jointly</MenuItem>
                  <MenuItem value="married_separate">Married Filing Separately</MenuItem>
                  <MenuItem value="head_household">Head of Household</MenuItem>
                </Select>
                <FormHelperText>Select your tax filing status</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                id="annualIncome"
                name="annualIncome"
                label="Annual Income ($)"
                fullWidth
                variant="outlined"
                type="number"
                value={formData.annualIncome}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="additionalIncome"
                name="additionalIncome"
                label="Additional Income ($)"
                helperText="Interest, dividends, rental income, etc."
                fullWidth
                variant="outlined"
                type="number"
                value={formData.additionalIncome}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="federalTaxWithheld"
                name="federalTaxWithheld"
                label="Federal Tax Withheld ($)"
                fullWidth
                variant="outlined"
                type="number"
                value={formData.federalTaxWithheld}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="stateTaxWithheld"
                name="stateTaxWithheld"
                label="State Tax Withheld ($)"
                fullWidth
                variant="outlined"
                type="number"
                value={formData.stateTaxWithheld}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" gutterBottom>
                Enter your deductions to potentially reduce your taxable income
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="mortgageInterest"
                name="mortgageInterest"
                label="Mortgage Interest ($)"
                fullWidth
                variant="outlined"
                type="number"
                value={formData.mortgageInterest}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="charitableDonations"
                name="charitableDonations"
                label="Charitable Donations ($)"
                fullWidth
                variant="outlined"
                type="number"
                value={formData.charitableDonations}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="medicalExpenses"
                name="medicalExpenses"
                label="Medical Expenses ($)"
                fullWidth
                variant="outlined"
                type="number"
                value={formData.medicalExpenses}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="educationExpenses"
                name="educationExpenses"
                label="Education Expenses ($)"
                fullWidth
                variant="outlined"
                type="number"
                value={formData.educationExpenses}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                id="retirementContributions"
                name="retirementContributions"
                label="Retirement Contributions ($)"
                fullWidth
                variant="outlined"
                type="number"
                value={formData.retirementContributions}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 3:
        const taxResults = calculateTax();
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
              Tax Summary for {formData.firstName} {formData.lastName}
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 8 }}>
                <Typography>Total Income:</Typography>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Typography align="right">${taxResults.totalIncome.toFixed(2)}</Typography>
              </Grid>
              <Grid size={{ xs: 8 }}>
                <Typography>Total Deductions:</Typography>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Typography align="right">${taxResults.totalDeductions.toFixed(2)}</Typography>
              </Grid>
              <Grid size={{ xs: 8 }}>
                <Typography fontWeight="bold">Taxable Income:</Typography>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Typography align="right" fontWeight="bold">${taxResults.taxableIncome.toFixed(2)}</Typography>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tax Assistant
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Our tax assistant helps you estimate your tax liability or refund based on your income and deductions.
          Follow the steps below to get your personalized tax calculation.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>
          {activeStep === steps.length ? (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you're finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Start New Calculation</Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box sx={{ mb: 4 }}>
                {renderStepContent(activeStep)}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={activeStep === steps.length - 1 ? <Check /> : <ArrowForward />}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TaxAssistant;