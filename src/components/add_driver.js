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

class Add_driver extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { driver } = this.props;
    this.state = { ...driver, driver };
  }

  is_set = () => {
    let {
      fullname,
      image,
      driver_license,
      address,
      description,
      registration_number,
      license_plate,
    } = this.state;

    return (
      fullname &&
      description &&
      image &&
      address &&
      driver_license &&
      registration_number &&
      license_plate
    );
  };

  submit = async () => {
    let { operator } = this.props;
    let {
      fullname,
      image,
      driver_license_filename,
      driver_license,
      address,
      description,
      registration_number,
      license_plate,
      _id,
    } = this.state;

    let driver = {
      fullname,
      image,
      driver_license_filename,
      driver_license,
      address,
      description,
      registration_number,
      license_plate,
      _id,
      operator: operator._id || operator,
    };

    let result = await post_request(
      _id ? "update_driver" : "add_driver",
      driver
    );

    if (result && result._id) {
      driver._id = result._id;
      driver.created = result.created;

      emitter.emit(_id ? "driver_updated" : "new_driver", driver);

      this.setState({ driver });
    } else
      this.setState({
        message:
          (result && result.message) || "Cannot add driver at the moment.",
      });
  };

  render() {
    let { toggle } = this.props;
    let {
      fullname,
      address,
      license_plate,
      description,
      driver_license_filename,
      image,
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
                  <Modal_form_title title="Add Transit" toggle={toggle} />

                  <Form_divider text="Driver Details" />

                  <div className="form-group smalls">
                    <label>Picture*</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
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
                    value={fullname}
                    title="driver fullname"
                    action={(fullname) =>
                      this.setState({
                        fullname,
                        message: "",
                      })
                    }
                    important
                  />

                  <Text_input
                    value={address}
                    title="Address"
                    action={(address) =>
                      this.setState({
                        address,
                        message: "",
                      })
                    }
                    important
                  />

                  <File_input
                    title="driver license"
                    action={(e) => this.handle_file(e, "driver_license")}
                    filename={driver_license_filename}
                    important
                    accept="image/*,.doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    info="Type: PDF, Image, Maxsize: 3MB"
                    error_message={
                      this.state[`${"driver_license"}_oversize`]
                        ? "Too large"
                        : ""
                    }
                  />

                  <Form_divider text="Vehicle Details" />

                  <Text_input
                    value={registration_number}
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
                    action={(description) =>
                      this.setState({
                        description,
                        message: "",
                      })
                    }
                    multiline
                  />

                  <Stretch_button
                    title={_id ? "Update" : "create"}
                    disabled={!this.is_set()}
                    action={this.submit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Add_driver;
