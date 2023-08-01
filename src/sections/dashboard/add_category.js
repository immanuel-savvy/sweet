import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Alert_box from "../../components/alert_box";
import Stretch_button from "../../components/stretch_button";

class Add_category extends React.Component {
  constructor(props) {
    super(props);

    let { category } = this.props;
    this.state = { title: "", description: "", ...category };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let { title, _id } = this.state;
    this.setState({ loading: true });

    let cat = { title: title.trim(), _id };

    let result = await post_request(
      _id ? "update_category" : "create_category",
      cat
    );

    if (result && result._id) {
      cat._id = result._id;
      cat.created = result.created;

      on_add(cat);
      toggle();
    } else {
      this.setState({
        message:
          (result && result.message) || "Cannot create category at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let { title, loading, _id, message } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Add Category</h5>
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

                {message ? <Alert_box message={message} /> : null}

                <div class="form-group">
                  <Stretch_button
                    disabled={!title.trim()}
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

export default Add_category;
