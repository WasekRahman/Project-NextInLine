import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import $ from "jquery";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

var Occupancy1 = 50;
var Occupancy;   
$.ajax({
        // change the below url with the actual api url
        url: "https://cors-anywhere.herokuapp.com/https://project-next-in-line.herokuapp.com/dashboard/",
        type: 'GET',
        async: false,
        dataType: 'json', // added data type
        success: function(res) {
        Occupancy = res; 
            //console.log(Occupancy);
              //alert(res);
          }
      });

const TotalCustomers = ({ className, ...rest }) => {
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
              Occupancy
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {
              Occupancy[0].occupancy                       
              }
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
           {/* we can add how many more the store can accomodate*/}
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
