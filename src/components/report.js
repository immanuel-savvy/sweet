import React from "react";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Alert_box from "./alert_box";
import { Loggeduser } from "../Contexts";
import { post_request } from "../assets/js/utils/services";
import { to_title } from "../assets/js/utils/functions";
import Stretch_button from "./stretch_button";

class File_a_report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
    };
  }

  set_category = ({ target }) => this.setState({ category: target.value });

  send = async () => {
    let { toggle, on_add, driver } = this.props;
    let { title, category, description } = this.state;

    this.setState({ loading: true });

    let report = {
      title: title.trim(),
      operator: driver.operator,
      driver: driver._id,
      category,
      description,
    };

    let result = await post_request("send_report", report);

    if (result && result._id) {
      report._id = result._id;
      report.created = result.created;

      on_add && on_add(report);
      toggle();
    } else {
      this.setState({
        message:
          (result && result.message) || "Cannot file report at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let { title, show_id, loading, category, description, id, _id, message } =
      this.state;

    return (
      <Loggeduser.Consumer>
        {({ report_categories }) => {
          return (
            <div>
              <div class="modal-content overli" id="loginmodal">
                <div class="modal-header">
                  <h5 class="modal-title">File a Report</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => toggle && toggle()}
                  >
                    <span aria-hidden="true">
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="login-form">
                    <form>
                      <div class="form-group">
                        <label>Title</label>
                        <div class="input-with-icon">
                          <input
                            type="text"
                            class="form-control"
                            value={title}
                            onChange={({ target }) =>
                              this.setState({
                                title: target.value,
                                message: "",
                              })
                            }
                            placeholder="Title"
                          />
                          <i class="ti-text"></i>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Category</label>
                        {report_categories ? (
                          report_categories.length ? (
                            <div className="simple-input">
                              <select
                                id="category"
                                onChange={this.set_category}
                                className="form-control"
                              >
                                <option value="" disabled selected>
                                  -- Select Category --
                                </option>
                                {report_categories.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {to_title(
                                      category.title.replace(/_/g, " ")
                                    )}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <Listempty text="Cannot get categories." />
                          )
                        ) : (
                          <Loadindicator smalls />
                        )}
                      </div>

                      <div class="form-group">
                        <label>Description</label>
                        <div class="">
                          <textarea
                            type={"text"}
                            class="form-control"
                            placeholder="Brief description here..."
                            value={description}
                            style={{ minHeight: 200 }}
                            onChange={({ target }) =>
                              this.setState({
                                description: target.value,
                                message: "",
                              })
                            }
                          ></textarea>
                        </div>
                      </div>

                      {message ? <Alert_box message={message} /> : null}

                      <div class="form-group">
                        <Stretch_button
                          disabled={
                            !category || !title.trim() || !description.trim()
                          }
                          loading={loading}
                          title={"Add"}
                          action={this.send}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default File_a_report;
