/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Container, Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 5,
  },
});

export default function AdminData() {
  const [time, setTime] = useState(Date.now());
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        const res = await axios(
          "https://project-next-in-line.herokuapp.com/dashboard/"
        );

        setData(res.data);
      };

      fetchData();
      setTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Container>
      {data.map((building) => (
        <Grid
          container
          direction="space-evenly"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Card className={classes.root} variant="outlined">
            <a href={"dashboard/" + building._id}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {bull}Click for updates
                </Typography>
                <Typography variant="h5" component="h2">
                  {building.name}
                </Typography>

                <Typography variant="body2" component="p">
                  Capacity: {building.capacity}
                  <br />
                  Occupancy: {building.occupancy}
                </Typography>
              </CardContent>
            </a>
          </Card>
        </Grid>
      ))}
    </Container>
  );
}
