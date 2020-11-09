import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, TextField, Typography } from '@material-ui/core';

import { ReactComponent as LogoSvg } from './logo.svg';

const validationSchema = Yup.object().shape({
  binaryValue: Yup.string() // make sure is a string
    .matches(/^[0-1]+$/g, 'Enter only binary numbers (0 or 1).') // Make sure we accept only either 0 or 1
    .required('Enter the binary number.') // make sure is required and not empty
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  content: {
    padding: theme.spacing(5),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[24]
  },
  link: {
    color: theme.palette.text.secondary,
    textDecoration: 'none'
  }
}));

function App() {
  const classes = useStyles();

  const [decimalValue, setDecimalValue] = React.useState(0);

  // Perform the conversion on form submit
  const handleFormSubmit = ({ binaryValue }) => {
    let priorValue = 0; // The initial prior value will always be 0
    const arrayBits = binaryValue
      .split('') // Convert to a array
      .map(Number); // Convert to a number from string

    // Formulae:
    // PRIOR_VALUE = PRIOR_VALUE * 2 + NEXT_BIT
    // input = 0 => output = ((0*2) + 0) = 0
    // input = 1 => output = ((0*2) + 1) = 1
    // input = 101 => output = ((0*2) + 1) = 1 = ((1*2) + 0) = 2 = ((2*2) + 1) = 5
    arrayBits.forEach(nextBit => {
      priorValue = priorValue * 2 + nextBit;
    });

    setDecimalValue(priorValue); // Set Decimal output
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <main id="main-content" className={classes.content}>
          <Box mb={4}>
            <LogoSvg />
          </Box>

          <Typography variant="h6">Binary To Decimal Converter</Typography>

          <Typography color="textSecondary">
            Enter the{' '}
            <a
              href="https://en.wikipedia.org/wiki/Binary_number"
              className={classes.link}
            >
              binary numbers
            </a>
            . Receive its decimal equivalent. It&apos;s that easy. Try it
            yourself.
          </Typography>

          <Box my={8} textAlign="center">
            <Typography variant="h2">
              {decimalValue}
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
              >
                10
              </Typography>
            </Typography>
          </Box>

          <Formik
            validationSchema={validationSchema}
            initialValues={{ binaryValue: '' }}
            onSubmit={handleFormSubmit}
          >
            {formik => (
              <Form>
                <TextField
                  id="binaryValue"
                  name="binaryValue"
                  placeholder="Enter the binary numbers..."
                  variant="outlined"
                  fullWidth
                  value={formik.values.binaryValue}
                  onChange={e => {
                    formik.handleChange(e);
                    setTimeout(formik.handleSubmit, 0);
                  }}
                  error={!!formik.errors.binaryValue}
                  helperText={formik.errors.binaryValue}
                />
              </Form>
            )}
          </Formik>
        </main>
      </Container>
    </div>
  );
}

export default App;
