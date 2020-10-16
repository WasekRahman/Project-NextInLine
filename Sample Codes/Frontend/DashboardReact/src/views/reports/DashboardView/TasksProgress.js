import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import $ from "jquery";
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }

}));

const TasksProgress = ({ className, ...rest }) => {
  const classes = useStyles();

  var entryrate1 = 30;
  var entryrate;   
  $.ajax({
          // change the below url with the actual api url
          url: "https://5f84f13ac29abd001619001c.mockapi.io/api/test/usersByDevices",
          type: 'GET',
          async: false,
          dataType: 'json', // added data type
          success: function(res) {
          entryrate = res; 
              //console.log(exitRate);
                //alert(res);
            }
        });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Entry Rate
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {
              entryrate1   //  changes this entryrate1 to entryrate after adding actual api
              }  
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <CallReceivedIcon />   
            </Avatar>
          </Grid>
          {/*
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
          */}
        </Grid>
        {/*
        <Box mt={3}>
          <LinearProgress
            value={75.5}
            variant="determinate"
          />
        </Box>
        */}
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
