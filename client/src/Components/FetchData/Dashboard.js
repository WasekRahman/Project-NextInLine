import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Container } from "@material-ui/core";
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
    fontSize: 24,
  },
  pos: {
    marginBottom: 14,
  },
});
let cache = {
  _id: null,
  name: " ",
  capacity: null,
  occupancy: null,
  waittime: null,
  entsensor1: null,
  entsensor2: null,
  extsensor1: null,
  extsensor2: null,
  totalentrance: null,
  totalexit: null,
};

export default function Building() {
  const [building, setBuilding] = useState({
    loading: false,
    data: null,
  });
  const [time, setTime] = useState(Date.now());
  const { id } = useParams();
  const url = `https://project-next-in-line.herokuapp.com/dashboard/${id}`;
  let content = null;
  useEffect(() => {
    const interval = setInterval(() => {
      setBuilding({
        loading: true,
        data: null,
      });
      axios
        .get(url)
        .then((response) => {
          setBuilding({
            loading: false,
            data: response.data,
            error: false,
          });
        })
        .catch(() => {
          setBuilding({
            loading: false,
            data: "",
            error: true,
          });
        });
      setTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [url, time]);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const serviceRate = 100;
  if (building.error) {
    content = <p>No data found</p>;
  }

  if (building.loading) {
    content = (
      <Container>
        <div>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <div align="right">
                <Button href={"/admin/" + cache._id} color="primary">
                  Admin
                </Button>
              </div>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              ></Typography>
              <Typography variant="h5" component="h2">
                {cache.name}
              </Typography>

              <Typography variant="body2" component="p">
                <b>Capacity:</b> {cache.capacity}
                <br />
                <b>Occupancy:</b> {cache.occupancy}
                <br />
                <b>Status:</b> {cache.capacity - cache.occupancy} additional
                people may fit
                <br />
                <b>Configured max throughput:</b> {serviceRate} customers/hour
                <br />
                <b>Expected Wait Time:</b> {cache.waittime}min(s)
              </Typography>
            </CardContent>
          </Card>
        </div>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            ></Typography>
            <Typography variant="h6" component="h2">
              Gate1 Entrance
            </Typography>

            <Typography variant="body2" component="p">
              <ul>
                <li>
                  <b>Sensor1:</b> {cache.entsensor1}
                </li>

                <li>
                  <b>Sensor2:</b> {cache.entsensor2}
                </li>

                <li>
                  <b>Events today:</b> {cache.totalentrance}
                </li>
              </ul>
            </Typography>
            <Typography variant="h6" component="h2">
              Gate2 Exit
            </Typography>

            <Typography variant="body2" component="p">
              <ul>
                <li>
                  <b>Sensor1:</b> {cache.extsensor1}
                </li>

                <li>
                  <b>Sensor2:</b> {cache.extsensor2}
                </li>

                <li>
                  <b>Events today:</b> {cache.totalexit}
                </li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }
  if (building.data) {
    cache._id = building.data.buildingInfos[0]._id;
    cache.name = building.data.buildingInfos[0].name;
    cache.capacity = building.data.buildingInfos[0].capacity;
    cache.occupancy = building.data.buildingInfos[0].occupancy;
    cache.waittime = building.data.waittime;
    cache.entsensor1 = building.data.entsensor1;
    cache.entsensor2 = building.data.entsensor2;
    cache.extsensor1 = building.data.exitsensor1;
    cache.extsensor2 = building.data.exitsensor2;
    cache.totalentrance = building.data.entrancetoday;
    cache.totalexit = building.data.exittoday;
    content = (
      <Container>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <div align="right">
              <Button href={"/admin/" + cache._id} color="primary">
                Admin
              </Button>
            </div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            ></Typography>
            <Typography variant="h5" component="h2">
              {building.data.buildingInfos[0].name}
            </Typography>

            <Typography variant="body2" component="p">
              <b>Capacity:</b> {building.data.buildingInfos[0].capacity}
              <br />
              <b>Occupancy:</b> {building.data.buildingInfos[0].occupancy}
              <br />
              <b>Status:</b>{" "}
              {building.data.buildingInfos[0].capacity -
                building.data.buildingInfos[0].occupancy}{" "}
              additional people may fit
              <br />
              <b>Configured max throughput:</b> {serviceRate} customers/hour
              <br />
              <b>Expected Wait Time:</b> {cache.waittime}min(s)
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            ></Typography>
            <Typography variant="h6" component="h2">
              Gate1 Entrance
            </Typography>

            <Typography variant="body2" component="p">
              <ul>
                <li>
                  <b>Sensor1:</b> {cache.entsensor1}
                </li>

                <li>
                  <b>Sensor2:</b> {cache.entsensor2}
                </li>

                <li>
                  <b>Events today:</b> {cache.totalentrance}
                </li>
              </ul>
            </Typography>
            <Typography variant="h6" component="h2">
              Gate2 Exit
            </Typography>

            <Typography variant="body2" component="p">
              <ul>
                <li>
                  <b>Sensor1:</b> {cache.extsensor1}
                </li>

                <li>
                  <b>Sensor2:</b> {cache.extsensor2}
                </li>

                <li>
                  <b>Events today:</b> {cache.totalexit}
                </li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return <Container>{content}</Container>;
}
