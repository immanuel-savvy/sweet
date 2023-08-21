import React from "react";
import Preview_image from "./preview_image";
import { Link } from "react-router-dom";
import Text_btn from "./text_btn";
import Modal from "./modal";
import { scroll_to_top } from "./explore_more";
import { save_to_session } from "../sections/footer";
import Add_vehicle from "./add_vehicle";
import Assign_driver from "./assign_driver";

class Operator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_reg_details = () => this.reg_details?.toggle();

  save_operator = () => {
    save_to_session("vehicle", this.props.vehicle);

    scroll_to_top();
  };

  toggle_assign = () => this.assign?.toggle();

  toggle_add_vehicle = () => this.add_vehicle?.toggle();

  render() {
    let { vehicle, admin, assign, bir } = this.props;
    if (!vehicle) return;

    let { verified, driver, image, _id, user } = vehicle;

    return (
      <div className={"col-xl-3 col-lg-6 col-md-6 col-sm-6"}>
        <div className="crs_trt_grid">
          <div className="crs_trt_thumb circle">
            <Preview_image
              style={{ height: 60, width: "100%" }}
              image={image}
            />
          </div>
          <div className="crs_trt_caption">
            <div className="instructor_title">
              {driver ? (
                <h4>
                  <Link to={`/vehicle?${_id}`} onClick={this.save_operator}>
                    {`${driver.fullname}`}
                  </Link>
                </h4>
              ) : null}
            </div>
          </div>
          <div className="crs_trt_footer">
            {
              <div className="crs_trt_ent">
                <Text_btn
                  text={assign ? "Assign" : "Registration Details"}
                  action={
                    assign ? () => assign(vehicle) : this.toggle_reg_details
                  }
                />
              </div>
            }
            {/* {driver ? null : (
              <div className="crs_trt_ent">
                <Text_btn text="Assign Driver" action={this.toggle_assign} />
              </div>
            )} */}
          </div>
        </div>

        <Modal ref={(reg_details) => (this.reg_details = reg_details)}>
          <Add_vehicle
            vehicle={vehicle}
            readonly
            toggle={this.toggle_reg_details}
          />
        </Modal>

        <Modal ref={(assign) => (this.assign = assign)}>
          <Assign_driver vehicle={vehicle} toggle={this.toggle_assign} />
        </Modal>
      </div>
    );
  }
}

export default Operator;
