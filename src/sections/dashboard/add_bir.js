import React from "react";
import { domain, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";
import { email_regex } from "../../assets/js/utils/functions";
import Alert_box from "../../components/alert_box";

class Add_bir extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { bir } = this.props;
    this.state = {
      image: "",
      email: "",
      firstname: "",
      lastname: "",
      ...bir,
    };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let {
      lastname,
      email,
      firstname,
      image_file_hash,
      image,
      image_hash,
      _id,
    } = this.state;

    let bir = {
      email,
      lastname,
      firstname,
      image_hash: image_file_hash || image_hash,
      image,
      _id,
    };

    let res = await post_request(_id ? "update_bir" : "add_bir", bir);

    if (res?._id) {
      bir._id = res._id;
      bir.image = res.image;
      bir.created = res.created;

      on_add && on_add(bir);
      toggle();
    } else {
      this.setState({
        message: res?.message || "Cannot add bir at the moment",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let {
      _id,
      image,
      firstname,
      email,
      message,
      lastname,
      logo_file_loading,
      loading,
    } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Board Member" toggle={toggle} />
          <div class="modal-body">
            <div class="login-form">
              <form>
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
                      Choose Logo
                    </label>
                  </div>
                  {logo_file_loading ? (
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

                <div className="row">
                  <div class="form-group col-6">
                    <label>Firstname</label>
                    <div class="input-with-icon">
                      <input
                        type="text"
                        class="form-control"
                        value={firstname}
                        onChange={({ target }) =>
                          this.setState({
                            firstname: target.value,
                            message: "",
                          })
                        }
                        placeholder="Full Name"
                      />
                      <i class="ti-text"></i>
                    </div>
                  </div>

                  <div class="form-group col-6">
                    <label>Lastname</label>
                    <div class="input-with-icon">
                      <input
                        type="text"
                        class="form-control"
                        value={lastname}
                        onChange={({ target }) =>
                          this.setState({
                            lastname: target.value,
                            message: "",
                          })
                        }
                        placeholder="URL"
                      />
                      <i class="ti-text"></i>
                    </div>
                  </div>

                  <div class="form-group col-12">
                    <label>Email</label>
                    <div class="input-with-icon">
                      <input
                        type="email"
                        class="form-control"
                        value={email}
                        onChange={({ target }) =>
                          this.setState({
                            email: target.value,
                            message: "",
                          })
                        }
                        placeholder="URL"
                      />
                      <i class="ti-text"></i>
                    </div>
                  </div>
                </div>

                {message ? <Alert_box message={message} /> : null}

                <div class="form-group">
                  <Stretch_button
                    disabled={
                      !firstname.trim() ||
                      !lastname.trim() ||
                      !image.trim() ||
                      !email_regex.test(email)
                    }
                    loading={loading}
                    title={_id ? "Update" : "Add"}
                    action={this.add}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_bir;
