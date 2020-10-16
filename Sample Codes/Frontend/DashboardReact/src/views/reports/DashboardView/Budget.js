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
import QueueIcon from '@material-ui/icons/Queue';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget = ({ className, ...rest }) => {
  const classes = useStyles();

  var capacity1 = 100;
  var capacity;   
  $.ajax({
          // change the below url with the actual api url
          url: "https://cors-anywhere.herokuapp.com/https://project-next-in-line.herokuapp.com/dashboard/",
          type: 'GET',
          async: false,
          dataType: 'json', // added data type
          success: function(res) {
          capacity = res; 
              //console.log(capacity);
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
              Capacity
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {
                capacity[0].capacity               
              }
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <QueueIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          {/*<ArrowDownwardIcon className={classes.differenceIcon} />*/}
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
           Maximum 
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            {/*add date here*/}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
