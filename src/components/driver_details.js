import React from "react";

class Driver_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { driver } = this.props;
    let { description } = driver;

    return (
      <>
        <div class="edu_wraper">
          <h4 class="edu_title">{"Driver"} Details</h4>
          {description.split("\n").map((d, index) => (
            <p key={index}>{d}</p>
          ))}
        </div>
      </>
    );
  }
}

export default Driver_details;
