// ** create-user.component.js ** //

import React, { Component } from "react";
import axios from "axios";
export default class CreateDoor extends Component {
  constructor(props) {
    super(props);

    this.onChangeDoorName = this.onChangeDoorName.bind(this);
    this.onChangeDoorEntranceExit = this.onChangeDoorEntranceExit.bind(this);
    this.onChangeDoorSensor1 = this.onChangeDoorSensor1.bind(this);
    this.onChangeDoorSensor2 = this.onChangeDoorSensor2.bind(this);
    this.onChangeBuildingID = props.buildingID;
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      entrance_exit: null,
      sensor1comport: "",
      sensor2comport: "",
      buildingID: null,
    };
  }

  onChangeDoorName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeDoorEntranceExit(e) {
    this.setState({ entrance_exit: e.target.value });
  }

  onChangeDoorSensor1(e) {
    this.setState({ sensor1comport: e.target.value });
  }

  onChangeDoorSensor2(e) {
    this.setState({ sensor2comport: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      name: this.state.name,
      entrance_exit: this.state.entrance_exit,
      sensor1comport: this.state.sensor1comport,
      sensor2comport: this.state.sensor2comport,
      buildingID: this.props.buildingID,
    };

    axios
      .post(
        `https://project-next-in-line.herokuapp.com/door/post/${this.props.buildingID}`,
        userObject
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      name: "",
      entrance_exit: null,
      sensor1comport: "",
      sensor2comport: "",
      buildingID: null,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Enter name of door</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeDoorName}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Enter true if Entrance,false if Exit</label>
            <input
              type="text"
              value={this.state.entrance_exit}
              onChange={this.onChangeDoorEntranceExit}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Enter sensor1 comport</label>
            <input
              type="text"
              value={this.state.sensor1comport}
              onChange={this.onChangeDoorSensor1}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Enter sensor2 comport</label>
            <input
              type="text"
              value={this.state.sensor2comport}
              onChange={this.onChangeDoorSensor2}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Door"
              className="btn btn-success btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
