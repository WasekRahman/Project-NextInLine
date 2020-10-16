import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import $ from "jquery";
import CallMadeIcon from '@material-ui/icons/CallMade';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

var exitRate1 = 25;
var exitRate;   
$.ajax({
        // change the below url with the actual api url
        url: "https://5f84f13ac29abd001619001c.mockapi.io/api/test/usersByDevices",
        type: 'GET',
        async: false,
        dataType: 'json', // added data type
        success: function(res) {
        exitRate = res; 
            //console.log(exitRate);
              //alert(res);
          }
      });

const TotalProfit = ({ className, ...rest }) => {
  const classes = useStyles();

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
              Exit Rate
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {    
               exitRate1 // changes this exitrat1 to exitrate after adding actual api
              }
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <CallMadeIcon />   
            </Avatar>
          </Grid>
          {/*
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
          */}
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
