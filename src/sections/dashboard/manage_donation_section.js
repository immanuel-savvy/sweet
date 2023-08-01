import React from "react";
import { domain } from "../../assets/js/utils/constants";
import { get_request, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Stretch_button from "../../components/stretch_button";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_donation_section extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let donation_section = await get_request("donation_section");

    this.setState({ ...donation_section });
  };

  update = async () => {
    let { image, image_file_hash, text, title } = this.state;

    this.setState({ updating: true });

    let res = await post_request("update_donation_section", {
      image,
      image_file_hash,
      text,
      title,
    });

    this.setState({ updating: false, image: res?.image });
  };

  render() {
    let { updating, image, image_file_loading, text, title } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb crumb="about statement" />
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 col-xl-6 col-sm-12">
            <div className="crs_grid">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Donation Section</h5>
              </div>

              <div className="modal-body">
                <div className="login-form">
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Title</label>
                          <input
                            className="form-control"
                            placeholder="Title"
                            value={title}
                            onChange={({ target }) =>
                              this.setState({ title: target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>Text</label>
                          <textarea
                            className="form-control"
                            type="number"
                            placeholder="Text..."
                            value={text}
                            onChange={({ target }) =>
                              this.setState({ text: target.value })
                            }
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-group smalls">
                        <label>Image (1200 x 800)*</label>
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
                          <div style={{ overflow: "scroll" }}>
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
                    </div>

                    <Stretch_button
                      loading={updating}
                      title="Update"
                      action={this.update}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manage_donation_section;
