import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { setActiveStep, clearActiveStep } from '../store/activeStepSlice';
import '@fontsource/public-sans';

const steps = ['upload', 'profiling', 'query', 'automl'];

const HorizontalStepper = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const activeStep = useSelector((state) => state.activeStep.value);
  const redux_dataset = useSelector((state) => state.dataset.value);

  const [skipped, setSkipped] = React.useState(new Set());

  // optional "query" page
  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    dispatch(setActiveStep(activeStep + 1));
    setSkipped(newSkipped);

    // if we're on the last step (Finish), don't do anything
    if (activeStep === steps.length - 1) {
      return;
    }

    router.push(`/${steps[activeStep + 1]}`);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      dispatch(setActiveStep(activeStep - 1));
      router.push(`/${steps[activeStep - 1]}`);
    }

    else if (activeStep === 0) {
      dispatch(setActiveStep(activeStep - 1));
      router.push('/');
    }

    else {
      dispatch(clearActiveStep());
      router.push('/upload');
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });

    router.push(`/${steps[activeStep + 1]}`);
  };

  const handleReset = () => {
    dispatch(clearActiveStep());
    router.push(`/${steps[0]}`);
  };

  return (
    <Container maxWidth='xl' sx={{ pt: 2 }}>
      <Box
        sx={{
          flex: 1,
          display: { md: 'flex' },
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Stepper activeStep={activeStep} sx={{ width: '80%' }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant='caption'>Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pl: 4 }}>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {/* <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed!
                </Typography> */}

                <Button onClick={handleReset} variant='contained' color='primary'>
                  Restart <RestartAltIcon />
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Button
                  color='inherit'
                  onClick={handleBack}
                  disabled={activeStep <= 0}
                  sx={{ mr: 1 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ArrowBackIcon />
                    Back
                  </Box>
                </Button>

                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color='inherit' onClick={handleSkip} sx={{ mr: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      Skip
                      <SkipNextIcon />
                    </Box>
                  </Button>
                )}

                <Button
                  onClick={handleNext}
                  disabled={!redux_dataset}
                  variant='contained'
                  color='primary'
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {activeStep === steps.length - 1 ? (
                      <>
                        Finish <CheckCircleIcon />
                      </>
                    ) : (
                      <>
                        Next <ArrowForwardIcon />
                      </>
                    )}
                  </Box>
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HorizontalStepper;
