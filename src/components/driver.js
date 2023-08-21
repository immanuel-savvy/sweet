import React from "react";
import { Link } from "react-router-dom";
import { save_to_session } from "../sections/footer";
import { scroll_to_top } from "./explore_more";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import Modal from "./modal";
import File_a_report from "./report";
import CopyToClipboard from "react-copy-to-clipboard";
import { client_domain } from "../assets/js/utils/constants";
import Operator_vehicles from "./operator_vehicles";
import { post_request } from "../assets/js/utils/services";

class Driver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_operator = () => {
    let { operator } = this.props;

    save_to_session("operator", operator);
  };

  toggle_report = () => this.report?.toggle();

  copied = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 3000);
    });
  };

  toggle_assign = () => this.assign_?.toggle();

  assign = async (vehicle) => {
    let { driver } = this.props;
    this.setState({ vehicle });

    this.toggle_assign();

    await post_request("update_vehicle_driver", {
      vehicle: vehicle._id,
      driver: driver?.driver?._id || driver?._id,
    });
  };

  on_report = () => this.setState({ reported: true });

  render() {
    let { copied, reported, vehicle: vehicle_ } = this.state;
    let { driver, operator, in_op, full, remove, edit } = this.props;
    console.log(driver);
    driver = driver.driver || driver;
    let { image, image_file_hash, vehicle, fullname, _id } = driver;
    vehicle = vehicle_ || vehicle;

    let {
      user,
      image: op_image,
      image_file_hash: op_image_hash,
      _id: operator_id,
    } = operator;

    let { firstname, lastname } = user;

    return (
      <div
        className={
          full
            ? "col-11"
            : in_op
            ? "col-xl-6 col-lg-6 col-md-6 col-sm-12"
            : "col-xl-4 col-lg-4 col-md-6 col-sm-12"
        }
      >
        <div className="crs_grid">
          <div className="crs_grid_thumb">
            <Link
              to={`/driver/${_id}`}
              onClick={() => {
                save_to_session("driver", {
                  ...driver,
                });
                save_to_session("operator", operator);
                scroll_to_top();
              }}
              className="crs_detail_link"
            >
              <Preview_image
                image={image || require("../assets/img/vouchers1.png")}
                image_hash={image_file_hash}
                class_name="circle img-fluid"
              />
            </Link>

            {remove ? (
              <div className="crs_video_ico cursor-pointer" onClick={remove}>
                <i className={`fa fa-trash`}></i>
              </div>
            ) : null}
            {edit ? (
              <div className="crs_locked_ico cursor-pointer" onClick={edit}>
                <i className={`fa fa-edit`}></i>
              </div>
            ) : null}
          </div>
          <div className="crs_grid_caption">
            {vehicle ? (
              <div className="crs_flex">
                <div className="crs_fl_first">
                  <div className="crs_inrolled">Vehicle</div>
                </div>
                <div className="crs_fl_last">
                  <div className="crs_cates cl_3">
                    <span>{vehicle.license_plate}</span>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="crs_title">
              <h3>
                <Link
                  to={`/driver/${_id}`}
                  onClick={() => {
                    save_to_session("driver", {
                      ...driver,
                    });
                    save_to_session("operator", operator);
                    scroll_to_top();
                  }}
                  className="crs_title_link"
                >
                  {fullname}
                </Link>
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CopyToClipboard
                text={`${client_domain}/driver/${_id}`}
                onCopy={this.copied}
              >
                <span>
                  <Text_btn text={copied ? "URL Copied!" : "Share URL"} />
                </span>
              </CopyToClipboard>

              <Text_btn
                text={reported ? "Report Sent!" : "Report"}
                action={reported ? null : this.toggle_report}
                style={{ color: "red" }}
              />
            </div>
          </div>
          <div className="crs_grid_foot">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <small>Operator</small>
                <div className="crs_tutor">
                  <div className="crs_tutor_thumb">
                    <Link
                      to={`/operator?${operator_id}`}
                      onClick={this.handle_operator}
                    >
                      <Preview_image
                        class_name="img-fluid circle"
                        style={{ height: 30, width: 30 }}
                        image={op_image}
                        image_hash={op_image_hash}
                      />
                    </Link>
                  </div>
                  <div className="crs_tutor_name">
                    <Link
                      to={`/operator?${operator._id}`}
                      onClick={this.handle_operator}
                    >
                      {`${firstname} ${lastname}`}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_price">
                  {edit ? (
                    <h2 className="cursor-pointer" onClick={this.toggle_assign}>
                      <span className="currency">
                        {vehicle ? "Reessign" : "Assign"} Vehicle
                      </span>
                    </h2>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal ref={(report) => (this.report = report)}>
          <File_a_report
            on_add={this.on_report}
            driver={driver}
            toggle={this.toggle_report}
          />
        </Modal>

        <Modal ref={(assign_) => (this.assign_ = assign_)}>
          <Operator_vehicles
            operator={operator}
            assign={this.assign}
            toggle={this.toggle_assign}
          />
        </Modal>
      </div>
    );
  }
}

export default Driver;
