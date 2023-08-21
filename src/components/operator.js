import React from "react";
import Preview_image from "./preview_image";
import { Link } from "react-router-dom";
import Text_btn from "./text_btn";
import Modal from "./modal";
import { scroll_to_top } from "./explore_more";
import { save_to_session } from "../sections/footer";
import Operator_verification_details from "./operator_verification_details";
import Add_vehicle from "./add_vehicle";
import Operator_vehicles from "./operator_vehicles";

class Operator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_verification_details = () => this.verification_details.toggle();

  save_operator = () => {
    save_to_session("operator", this.props.operator);

    scroll_to_top();
  };

  toggle_vehicles = () => this.vehicles?.toggle();

  toggle_add_vehicle = () => this.add_vehicle?.toggle();

  render() {
    let { operator, admin, bir, full } = this.props;
    if (!operator) return;

    let { verified, image, _id, user } = operator;

    return (
      <div className={full ? "col-11" : "col-xl-3 col-lg-4 col-md-6 col-sm-6"}>
        <div className="crs_trt_grid">
          <div className="crs_trt_thumb circle">
            <Link
              to={`/operator?${_id}`}
              onClick={this.save_operator}
              className="crs_trt_thum_link"
            >
              <Preview_image style={{ height: 60 }} image={image} />
            </Link>
          </div>
          <div className="crs_trt_caption">
            <div className="instructor_title">
              <h4>
                <Link to={`/operator?${_id}`} onClick={this.save_operator}>
                  {`${user.firstname} ${user.lastname}`}
                </Link>
              </h4>
            </div>
          </div>
          <div className="crs_trt_footer">
            {bir ? null : verified && !admin ? (
              <div className="crs_trt_ent">
                <Link to={`/operator?${_id}`} onClick={this.save_operator}>
                  <Text_btn text="View operator" />
                </Link>
              </div>
            ) : (
              <div className="crs_trt_ent">
                <Text_btn
                  text="Registration Details"
                  action={this.toggle_verification_details}
                />
              </div>
            )}
            {bir ? (
              <div className="crs_trt_ent">
                <Text_btn
                  text="Manage Vehicles"
                  action={this.toggle_vehicles}
                />
                <Text_btn text="Add Vehicle" action={this.toggle_add_vehicle} />
              </div>
            ) : null}
          </div>
        </div>

        <Modal ref={(vehicles) => (this.vehicles = vehicles)}>
          <Operator_vehicles
            operator={operator}
            toggle={this.toggle_vehicles}
          />
        </Modal>

        <Modal
          ref={(verification_details) =>
            (this.verification_details = verification_details)
          }
        >
          <Operator_verification_details
            toggle={this.toggle_verification_details}
            operator={operator}
            on_verify={this.on_verify}
          />
        </Modal>

        <Modal ref={(add_vehicle) => (this.add_vehicle = add_vehicle)}>
          <Add_vehicle toggle={this.toggle_add_vehicle} operator={operator} />
        </Modal>
      </div>
    );
  }
}

export default Operator;
