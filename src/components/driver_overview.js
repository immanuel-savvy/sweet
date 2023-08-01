import React from "react";
import Driver_details from "./driver_details";
import Driver_media from "./driver_media";
import Driver_reviews from "./driver_reviews";
import Operator_card from "./operator_card";

class Driver_overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { driver, operator, event } = this.props;
    if (!driver) driver = event;

    return (
      <div class="col-lg-8 col-md-12 order-lg-first">
        <Driver_media driver={driver} />

        <Driver_details driver={driver} operator={operator} />

        <Operator_card operator={operator} />
        <Driver_reviews driver={driver} operator={operator} />
      </div>
    );
  }
}

export default Driver_overview;
