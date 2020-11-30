import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
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
  name: null,
  capacity: null,
  occupancy: null,
  waittime: null,
  doors: [
    {
      _id: null,
      name: null,
      entrance_exit: null,
      sensor1comport: null,
      sensor2comport: null,
    },
  ],
  maxthroughput: null,
  totalentrance: null,
  totalexit: null,
};
var seconds = 1000;
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
    }, seconds);
    return () => {
      clearInterval(interval);
    };
  }, [url, time, seconds]);
  const classes = useStyles();
  if (building.error) {
    content = <p>No data found</p>;
  }

  if (building.loading) {
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
              <b>Configured max throughput:</b> {cache.maxthroughput}{" "}
              customers/hour
              <br />
              <b>Expected Wait Time:</b> {cache.waittime}min(s)
            </Typography>
          </CardContent>
        </Card>

        {cache.doors.map((door) => {
          return (
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                ></Typography>
                <Typography variant="h6" component="h2">
                  {door.name} {door.entrance_exit ? "Entrance" : "Exit"}
                </Typography>

                <Typography variant="body2" component="p">
                  <ul>
                    <li>
                      <b>Sensor1:</b> {door.sensor1comport}
                    </li>

                    <li>
                      <b>Sensor2:</b> {door.sensor2comport}
                    </li>

                    <li>
                      <b>Events today:</b>{" "}
                      {door.entrance_exit
                        ? cache.totalentrance
                        : cache.totalexit}
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    );
  }
  if (building.data) {
    seconds = 10000;
    if (typeof building.data.buildingInfos !== "undefined") {
      cache._id = building.data.buildingInfos[0]._id;
      cache.name = building.data.buildingInfos[0].name;
      cache.capacity = building.data.buildingInfos[0].capacity;
      cache.occupancy = building.data.buildingInfos[0].occupancy;
      cache.waittime = building.data.waittime;
      cache.doors = building.data.doors;
      cache.maxthroughput = building.data.buildingInfos[0].maxthroughput;
      cache.totalentrance = building.data.entrancetoday;
      cache.totalexit = building.data.exittoday;
    }
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
              <b>Configured max throughput:</b> {cache.maxthroughput}{" "}
              customers/hour
              <br />
              <b>Expected Wait Time:</b> {cache.waittime}min(s)
            </Typography>
          </CardContent>
        </Card>

        {cache.doors.map((door) => {
          return (
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                ></Typography>
                <Typography variant="h6" component="h2">
                  {door.name} {door.entrance_exit ? "Entrance" : "Exit"}
                </Typography>

                <Typography variant="body2" component="p">
                  <ul>
                    <li>
                      <b>Sensor1:</b> {door.sensor1comport}
                    </li>

                    <li>
                      <b>Sensor2:</b> {door.sensor2comport}
                    </li>

                    <li>
                      <b>Events today:</b>{" "}
                      {door.entrance_exit
                        ? cache.totalentrance
                        : cache.totalexit}
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    );
  }

  return <Container>{content}</Container>;
}
