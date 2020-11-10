// ** create-user.component.js ** //

import React, { Component } from "react";
import axios from "axios";

export default class CreateBuilding extends Component {
  constructor(props) {
    super(props);

    this.onChangeBuildingName = this.onChangeBuildingName.bind(this);
    this.onChangeBuildingCapacity = this.onChangeBuildingCapacity.bind(this);
    this.onChangeBuildingOccupancy = this.onChangeBuildingOccupancy.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      capacity: null,
      occupancy: null,
    };
  }

  onChangeBuildingName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeBuildingCapacity(e) {
    this.setState({ capacity: e.target.value });
  }

  onChangeBuildingOccupancy(e) {
    this.setState({ occupancy: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      name: this.state.name,
      capacity: this.state.capacity,
      occupancy: this.state.occupancy,
    };

    axios
      .post(
        "https://project-next-in-line.herokuapp.com/building/post",
        userObject
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ name: "", capacity: null, occupancy: null });
  }

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Enter name of business</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeBuildingName}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Enter capacity</label>
            <input
              type="text"
              value={this.state.capacity}
              onChange={this.onChangeBuildingCapacity}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Enter occupancy</label>
            <input
              type="text"
              value={this.state.occupancy}
              onChange={this.onChangeBuildingOccupancy}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Building"
              className="btn btn-success btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
