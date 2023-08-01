import React from "react";
import { domain } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";
import Form_divider from "./form_divider";
import Modal_form_title from "./modal_form_title";
import Preview_image from "./preview_image";
import Small_btn from "./small_btn";
import Stretch_button from "./stretch_button";
import Text_btn from "./text_btn";
import Text_input from "./text_input";

class Operator_verification_details extends React.Component {
  constructor(props) {
    super(props);

    let { operator } = this.props;

    this.state = {
      suspended: operator.suspended,
      commision_fee: operator.commision_fee || 25,
    };
  }

  url = (file) => window.open(`${domain}/files/${file}`);

  verify = async () => {
    let { loading } = this.state;
    if (loading) return;

    this.setState({ loading: true });
    let { operator, toggle, on_verify } = this.props;

    let res = await post_request(`verify_operator/${operator._id}`);

    if (res && res.message)
      return this.setState({ message: res.message, loading: false });

    if (res.verified) on_verify && on_verify(operator._id);
    else toggle && toggle();
  };

  update_vendor_commision_fee = async () => {
    let { operator } = this.props;
    let { commision_fee } = this.state;
    this.setState({ comitting: true });

    await post_request(`update_vendor_commision`, {
      operator: operator._id,
      commision_fee: commision_fee || operator.commision_fee,
    });
    this.setState({ comitting: false });
  };

  render() {
    let { loading, message } = this.state;
    let { operator, toggle } = this.props;
    let { user, cac, ID, id_type, image, verified } = operator;

    return (
      <div style={{ overflow: "scroll" }}>
        <form>
          <div className="crs_log_wrap">
            <div className="crs_log__caption">
              <Modal_form_title title="Register your brand" toggle={toggle} />

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Preview_image image={image} style={{ height: 50 }} />
              </div>

              <br />

              <Form_divider text="user details" />

              <Text_input value={user.firstname} disabled title="firstname" />
              <Text_input value={user.lastname} disabled title="lastname" />
              <Text_input value={user.email} disabled title="email" />
              <div
                className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                style={{ marginBottom: 30 }}
              >
                <Text_btn
                  text="Send an Email"
                  action={() => window.open(`mailto:${user.email}`)}
                  icon="fa-envelope"
                />
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label style={{ textTransform: "capitalize" }}>
                    {(id_type || "Proof of Identity").replace(/_/g, " ")}
                  </label>
                  <br />
                  <Text_btn text={ID} action={() => this.url(ID)} />
                </div>
              </div>

              <Form_divider text="Business Registration Details" />

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label>Certificate of Incorporation</label>
                  <br />
                  <Text_btn text={cac} action={() => this.url(cac)} />
                </div>
              </div>

              {message ? <Alert_box message={message} /> : null}

              {verified ? null : (
                <Stretch_button
                  title={"verify"}
                  loading={loading}
                  action={this.verify}
                />
              )}
              <div style={{ marginBottom: 24 }} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Operator_verification_details;
