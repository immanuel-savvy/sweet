import React from "react";
import { domain, post_request } from "../assets/js/utils/services";
import { emitter } from "../Sweet";
import Modal_form_title from "./modal_form_title";
import Stretch_button from "./stretch_button";
import Text_input from "./text_input";
import Form_divider from "./form_divider";
import Handle_file_upload from "./handle_file_upload";
import Loadindicator from "./loadindicator";
import File_input from "./file_input";
import Alert_box from "./alert_box";

class Add_vehicle extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { vehicle } = this.props;
    this.state = { ...vehicle, vehicle };
  }

  is_set = () => {
    let { image, description, registration_number, license_plate } = this.state;

    return description && image && registration_number && license_plate;
  };

  submit = async () => {
    let { operator, toggle } = this.props;
    let { image, description, registration_number, license_plate, _id } =
      this.state;

    let vehicle = {
      image,
      description,
      registration_number,
      license_plate,
      _id,
      operator: operator._id || operator,
    };

    let result = await post_request(
      _id ? "update_vehicle" : "add_vehicle",
      vehicle
    );

    if (result && result._id) {
      vehicle._id = result._id;
      vehicle.created = result.created;

      emitter.emit(_id ? "vehicle_updated" : "new_vehicle", vehicle);

      this.setState({ vehicle }, toggle);
    } else
      this.setState({
        message:
          (result && result.message) || "Cannot add vehicle at the moment.",
      });
  };

  render() {
    let { toggle, readonly } = this.props;
    let {
      license_plate,
      description,
      image,
      message,
      registration_number,
      image_file_loading,
      _id,
    } = this.state;

    return (
      <section style={{ paddingTop: 20 }}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <form>
                <div className="crs_log_wrap">
                  <Modal_form_title title="Add Vehicle" toggle={toggle} />

                  <div className="form-group smalls">
                    <label>Picture*</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
                        disabled={readonly}
                        onChange={(e) =>
                          this.handle_file(e, "image", null, null, true)
                        }
                      />
                      <label className="custom-file-label" for="customFile">
                        Choose Image
                      </label>
                    </div>
                    {image_file_loading ? (
                      <Loadindicator />
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <span>
                          <img
                            className="py-3 rounded"
                            style={{
                              maxHeight: 200,
                              maxWidth: 200,
                              marginRight: 10,
                            }}
                            src={
                              image && image.startsWith("data")
                                ? image
                                : `${domain}/images/${image}`
                            }
                          />
                        </span>
                      </div>
                    )}
                  </div>

                  <Text_input
                    value={registration_number}
                    disabled={readonly}
                    title="Registration Number"
                    action={(registration_number) =>
                      this.setState({
                        registration_number,
                        message: "",
                      })
                    }
                    important
                  />

                  <Text_input
                    value={license_plate}
                    title="license plate"
                    disabled={readonly}
                    action={(license_plate) =>
                      this.setState({
                        license_plate,
                        message: "",
                      })
                    }
                    important
                  />

                  <Text_input
                    value={description}
                    title="Description"
                    disabled={readonly}
                    action={(description) =>
                      this.setState({
                        description,
                        message: "",
                      })
                    }
                    multiline
                  />

                  <Alert_box
                    type={readonly ? "info" : null}
                    message={readonly ? "Read-only" : message}
                  />

                  {readonly ? null : (
                    <Stretch_button
                      title={_id ? "Update" : "create"}
                      disabled={!this.is_set()}
                      action={this.submit}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Add_vehicle;
