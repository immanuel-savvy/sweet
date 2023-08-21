import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { tabs } from "../pages/Bir";
import { domain } from "../assets/js/utils/constants";

class Dash_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { user, set_panel } = this.props;
    let { firstname, lastname, image, email } = user;

    return (
      <div className="d-user-avater">
        <img
          src={
            `${domain}/images/${image}` ||
            require("../assets/img/user_image_placeholder.png")
          }
          className="img-fluid avater"
          alt=""
        />
        <h4 className="text-dark">{to_title(`${firstname} ${lastname}`)} </h4>
        <span className="text-dark">{email}</span>

        <div className="elso_syu89"></div>
        <div className="elso_syu77 mx-5">
          {tabs.map((panel) => (
            <div
              onClick={() => set_panel(panel)}
              key={panel}
              className="one_third cursor-pointer"
            >
              <div className="one_45ic text-info bg-dark-info">
                <i className="fas fa-star"></i>
              </div>
              <span className="text-dark">{to_title(panel)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dash_header;
