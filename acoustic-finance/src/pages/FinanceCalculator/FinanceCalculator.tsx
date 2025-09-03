import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Slider,
  InputAdornment,
  useTheme,
} from '@mui/material';
import {
  AttachMoney,
  Home,
  AccountBalance,
  TrendingUp,
  BarChart,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`finance-tabpanel-${index}`}
      aria-labelledby={`finance-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `finance-tab-${index}`,
    'aria-controls': `finance-tabpanel-${index}`,
  };
}

const FinanceCalculator: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [loanResults, setLoanResults] = useState<any>(null);

  // Mortgage Calculator State
  const [homePrice, setHomePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [mortgageRate, setMortgageRate] = useState<number>(4.5);
  const [mortgageTerm, setMortgageTerm] = useState<number>(30);
  const [mortgageResults, setMortgageResults] = useState<any>(null);

  // Investment Calculator State
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [investmentRate, setInvestmentRate] = useState<number>(7);
  const [investmentYears, setInvestmentYears] = useState<number>(20);
  const [investmentResults, setInvestmentResults] = useState<any>(null);

  // Retirement Calculator State
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlySavings, setMonthlySavings] = useState<number>(1000);
  const [retirementRate, setRetirementRate] = useState<number>(6);
  const [retirementResults, setRetirementResults] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Loan Calculator
  const calculateLoan = () => {
    const monthlyRate = loanInterestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Generate amortization data for chart
    const labels = Array.from({ length: loanTerm + 1 }, (_, i) => `Year ${i}`);
    const principalData = [];
    const interestData = [];

    let remainingBalance = loanAmount;
    principalData.push(remainingBalance);
    interestData.push(0);

    for (let year = 1; year <= loanTerm; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;

        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        remainingBalance -= principalPayment;
      }

      principalData.push(Math.max(0, remainingBalance));
      interestData.push(yearlyInterest);
    }

    setLoanResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      chartData: {
        labels,
        datasets: [
          {
            label: 'Remaining Principal',
            data: principalData,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light + '40',
            fill: true,
          },
          {
            label: 'Interest Paid',
            data: interestData,
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.light + '40',
            fill: true,
          },
        ],
      },
    });
  };

  // Mortgage Calculator
  const calculateMortgage = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = mortgageRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Generate amortization data for chart
    const labels = Array.from({ length: mortgageTerm + 1 }, (_, i) => `Year ${i}`);
    const principalData = [];
    const interestData = [];

    let remainingBalance = loanAmount;
    principalData.push(remainingBalance);
    interestData.push(0);

    for (let year = 1; year <= mortgageTerm; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;

        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        remainingBalance -= principalPayment;
      }

      principalData.push(Math.max(0, remainingBalance));
      interestData.push(yearlyInterest);
    }

    setMortgageResults({
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      chartData: {
        labels,
        datasets: [
          {
            label: 'Remaining Principal',
            data: principalData,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light + '40',
            fill: true,
          },
          {
            label: 'Interest Paid',
            data: interestData,
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.light + '40',
            fill: true,
          },
        ],
      },
    });
  };

  // Investment Calculator
  const calculateInvestment = () => {
    const monthlyRate = investmentRate / 100 / 12;
    const numberOfMonths = investmentYears * 12;
    
    // Calculate future value
    let futureValue = initialInvestment * Math.pow(1 + monthlyRate, numberOfMonths);
    
    // Add monthly contributions
    if (monthlyContribution > 0) {
      futureValue += monthlyContribution * ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate);
    }
    
    const totalContributions = initialInvestment + (monthlyContribution * numberOfMonths);
    const totalInterest = futureValue - totalContributions;
    
    // Generate growth data for chart
    const labels = Array.from({ length: investmentYears + 1 }, (_, i) => `Year ${i}`);
    const balanceData = [];
    const contributionData = [];
    
    balanceData.push(initialInvestment);
    contributionData.push(initialInvestment);
    
    let runningBalance = initialInvestment;
    let runningContributions = initialInvestment;
    
    for (let year = 1; year <= investmentYears; year++) {
      for (let month = 1; month <= 12; month++) {
        runningBalance = runningBalance * (1 + monthlyRate) + monthlyContribution;
        runningContributions += monthlyContribution;
      }
      
      balanceData.push(runningBalance);
      contributionData.push(runningContributions);
    }
    
    setInvestmentResults({
      futureValue,
      totalContributions,
      totalInterest,
      chartData: {
        labels,
        datasets: [
          {
            label: 'Account Balance',
            data: balanceData,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light + '40',
            fill: true,
          },
          {
            label: 'Total Contributions',
            data: contributionData,
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.light + '40',
            fill: true,
          },
        ],
      },
    });
  };

  // Retirement Calculator
  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyRate = retirementRate / 100 / 12;
    const numberOfMonths = yearsToRetirement * 12;
    
    // Calculate future value at retirement
    let retirementSavings = currentSavings * Math.pow(1 + monthlyRate, numberOfMonths);
    
    // Add monthly contributions
    if (monthlySavings > 0) {
      retirementSavings += monthlySavings * ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate);
    }
    
    const totalContributions = currentSavings + (monthlySavings * numberOfMonths);
    const totalInterest = retirementSavings - totalContributions;
    
    // Generate growth data for chart
    const labels = Array.from({ length: yearsToRetirement + 1 }, (_, i) => `Age ${currentAge + i}`);
    const balanceData = [];
    const contributionData = [];
    
    balanceData.push(currentSavings);
    contributionData.push(currentSavings);
    
    let runningBalance = currentSavings;
    let runningContributions = currentSavings;
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      for (let month = 1; month <= 12; month++) {
        runningBalance = runningBalance * (1 + monthlyRate) + monthlySavings;
        runningContributions += monthlySavings;
      }
      
      balanceData.push(runningBalance);
      contributionData.push(runningContributions);
    }
    
    setRetirementResults({
      retirementSavings,
      totalContributions,
      totalInterest,
      chartData: {
        labels,
        datasets: [
          {
            label: 'Retirement Balance',
            data: balanceData,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light + '40',
            fill: true,
          },
          {
            label: 'Total Contributions',
            data: contributionData,
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.light + '40',
            fill: true,
          },
        ],
      },
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Finance Calculator
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Use our comprehensive financial calculators to plan your loans, mortgages, investments, and retirement.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="finance calculator tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<AttachMoney />} label="Loan" {...a11yProps(0)} />
            <Tab icon={<Home />} label="Mortgage" {...a11yProps(1)} />
            <Tab icon={<TrendingUp />} label="Investment" {...a11yProps(2)} />
            <Tab icon={<AccountBalance />} label="Retirement" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {/* Loan Calculator */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h6" gutterBottom>Loan Calculator</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Calculate your monthly payments, total interest, and view an amortization schedule for personal loans, auto loans, and more.
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Loan Amount</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                    <Slider
                      value={loanAmount}
                      onChange={(e, newValue) => setLoanAmount(newValue as number)}
                      min={1000}
                      max={100000}
                      step={1000}
                      aria-labelledby="loan-amount-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      inputProps={{
                        step: 1000,
                        min: 1000,
                        max: 100000,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Interest Rate (%)</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                    <Slider
                      value={loanInterestRate}
                      onChange={(e, newValue) => setLoanInterestRate(newValue as number)}
                      min={1}
                      max={20}
                      step={0.1}
                      aria-labelledby="loan-interest-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                      value={loanInterestRate}
                      onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                      inputProps={{
                        step: 0.1,
                        min: 1,
                        max: 20,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Loan Term (years)</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                    <TextField
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      inputProps={{
                        step: 1,
                        min: 1,
                        max: 10,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 4 }}
                  onClick={calculateLoan}
                >
                  Calculate
                </Button>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 7 }}>
              {loanResults && (
                <Box>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Loan Amount</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${loanResults.loanAmount.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Monthly Payment</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${loanResults.monthlyPayment.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Total Payment</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${loanResults.totalPayment.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Total Interest</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${loanResults.totalInterest.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ height: 300, mt: 4 }}>
                    <Typography variant="h6" gutterBottom>Loan Amortization</Typography>
                    <Line 
                      data={loanResults.chartData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Amount ($)',
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </TabPanel>

        {/* Mortgage Calculator */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h6" gutterBottom>Mortgage Calculator</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Calculate your monthly mortgage payments, total interest, and view an amortization schedule for your home loan.
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Home Price</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={homePrice}
                      onChange={(e, newValue) => setHomePrice(newValue as number)}
                      min={100000}
                      max={1000000}
                      step={10000}
                      aria-labelledby="home-price-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      inputProps={{
                        step: 10000,
                        min: 100000,
                        max: 1000000,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Down Payment</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={downPayment}
                      onChange={(e, newValue) => setDownPayment(newValue as number)}
                      min={0}
                      max={homePrice * 0.5}
                      step={5000}
                      aria-labelledby="down-payment-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}> 
                    <TextField
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      inputProps={{
                        step: 5000,
                        min: 0,
                        max: homePrice,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Interest Rate (%)</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={mortgageRate}
                      onChange={(e, newValue) => setMortgageRate(newValue as number)}
                      min={1}
                      max={10}
                      step={0.125}
                      aria-labelledby="mortgage-rate-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={mortgageRate}
                      onChange={(e) => setMortgageRate(Number(e.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                      inputProps={{
                        step: 0.125,
                        min: 1,
                        max: 10,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Loan Term (years)</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={mortgageTerm}
                      onChange={(e, newValue) => setMortgageTerm(newValue as number)}
                      min={15}
                      max={30}
                      step={5}
                      marks
                      aria-labelledby="mortgage-term-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={mortgageTerm}
                      onChange={(e) => setMortgageTerm(Number(e.target.value))}
                      inputProps={{
                        step: 5,
                        min: 15,
                        max: 30,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 4 }}
                  onClick={calculateMortgage}
                >
                  Calculate
                </Button>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 7 }}>
              {mortgageResults && (
                <Box>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Loan Amount</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${mortgageResults.loanAmount.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Monthly Payment</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${mortgageResults.monthlyPayment.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Total Payment</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${mortgageResults.totalPayment.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Total Interest</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${mortgageResults.totalInterest.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ height: 300, mt: 4 }}>
                    <Typography variant="h6" gutterBottom>Mortgage Amortization</Typography>
                    <Line 
                      data={mortgageResults.chartData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Amount ($)',
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </TabPanel>

        {/* Investment Calculator */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h6" gutterBottom>Investment Calculator</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Calculate the future value of your investments based on initial investment, monthly contributions, and expected rate of return.
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Initial Investment</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={initialInvestment}
                      onChange={(e, newValue) => setInitialInvestment(newValue as number)}
                      min={0}
                      max={100000}
                      step={1000}
                      aria-labelledby="initial-investment-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Number(e.target.value))}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      inputProps={{
                        step: 1000,
                        min: 0,
                        max: 100000,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Monthly Contribution</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={monthlyContribution}
                      onChange={(e, newValue) => setMonthlyContribution(newValue as number)}
                      min={0}
                      max={2000}
                      step={100}
                      aria-labelledby="monthly-contribution-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      inputProps={{
                        step: 100,
                        min: 0,
                        max: 2000,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Annual Return Rate (%)</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={investmentRate}
                      onChange={(e, newValue) => setInvestmentRate(newValue as number)}
                      min={1}
                      max={15}
                      step={0.5}
                      aria-labelledby="investment-rate-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={investmentRate}
                      onChange={(e) => setInvestmentRate(Number(e.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                      inputProps={{
                        step: 0.5,
                        min: 1,
                        max: 15,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Investment Period (years)</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={investmentYears}
                      onChange={(e, newValue) => setInvestmentYears(newValue as number)}
                      min={1}
                      max={40}
                      step={1}
                      aria-labelledby="investment-years-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={investmentYears}
                      onChange={(e) => setInvestmentYears(Number(e.target.value))}
                      inputProps={{
                        step: 1,
                        min: 1,
                        max: 40,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 4 }}
                  onClick={calculateInvestment}
                >
                  Calculate
                </Button>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 7 }}>
              {investmentResults && (
                <Box>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Future Value</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${investmentResults.futureValue.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Total Contributions</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${investmentResults.totalContributions.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Total Interest</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${investmentResults.totalInterest.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ height: 300, mt: 4 }}>
                    <Typography variant="h6" gutterBottom>Investment Growth</Typography>
                    <Line 
                      data={investmentResults.chartData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Amount ($)',
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </TabPanel>

        {/* Retirement Calculator */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}> 
              <Typography variant="h6" gutterBottom>Retirement Calculator</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Plan for your retirement by calculating how much you'll have saved by your target retirement age.
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Current Age</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={currentAge}
                      onChange={(e, newValue) => setCurrentAge(newValue as number)}
                      min={18}
                      max={70}
                      step={1}
                      aria-labelledby="current-age-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      inputProps={{
                        step: 1,
                        min: 18,
                        max: 70,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Retirement Age</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={retirementAge}
                      onChange={(e, newValue) => setRetirementAge(newValue as number)}
                      min={Math.max(currentAge + 1, 55)}
                      max={80}
                      step={1}
                      aria-labelledby="retirement-age-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      inputProps={{
                        step: 1,
                        min: Math.max(currentAge + 1, 55),
                        max: 80,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Current Savings</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={currentSavings}
                      onChange={(e, newValue) => setCurrentSavings(newValue as number)}
                      min={0}
                      max={500000}
                      step={10000}
                      aria-labelledby="current-savings-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(Number(e.target.value))}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      inputProps={{
                        step: 10000,
                        min: 0,
                        max: 500000,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Monthly Savings</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={monthlySavings}
                      onChange={(e, newValue) => setMonthlySavings(newValue as number)}
                      min={0}
                      max={5000}
                      step={100}
                      aria-labelledby="monthly-savings-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={monthlySavings}
                      onChange={(e) => setMonthlySavings(Number(e.target.value))}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      inputProps={{
                        step: 100,
                        min: 0,
                        max: 5000,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Typography gutterBottom sx={{ mt: 2 }}>Expected Annual Return (%)</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Slider
                      value={retirementRate}
                      onChange={(e, newValue) => setRetirementRate(newValue as number)}
                      min={1}
                      max={12}
                      step={0.5}
                      aria-labelledby="retirement-rate-slider"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      value={retirementRate}
                      onChange={(e) => setRetirementRate(Number(e.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                      inputProps={{
                        step: 0.5,
                        min: 1,
                        max: 12,
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 4 }}
                  onClick={calculateRetirement}
                >
                  Calculate
                </Button>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              {retirementResults && (
                <Box>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Retirement Savings</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${retirementResults.retirementSavings.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Total Contributions</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${retirementResults.totalContributions.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Card>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Total Interest</Typography>
                          <Typography variant="h5"  sx={{ fontWeight: 'bold' }}>
                            ${retirementResults.totalInterest.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ height: 300, mt: 4 }}>
                    <Typography variant="h6" gutterBottom>Retirement Savings Growth</Typography>
                    <Line 
                      data={retirementResults.chartData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Amount ($)',
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default FinanceCalculator;