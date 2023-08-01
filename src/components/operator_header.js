import React from "react";
import Preview_image from "./preview_image";

class Operator_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { operator, loggeduser } = this.props;
    if (!operator) return;
    loggeduser = loggeduser || new Object();

    let { image, image_hash, verified, user } = operator;
    let { firstname, lastname } = user;

    return (
      <div
        className="ed_detail_head bg-cover mb-5"
        style={{
          backgroundImage: `url(${require("../assets/img/vouchers1.png")})`,
          backgroundRepeat: "no-repeat",
        }}
        data-overlay="8"
      >
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="authi_125">
                <div className="authi_125_thumb p-2">
                  <Preview_image
                    style={{
                      maxHeight: 150,
                      borderWidth: 4,
                      borderColor: "#fff",
                      borderStyle: "solid",
                      borderRadius: 10,
                    }}
                    image={
                      image ||
                      require("../assets/img/user_image_placeholder.png")
                    }
                    image_hash={image_hash}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="dlkio_452">
                <div className="ed_detail_wrap">
                  {operator.verified ? null : (
                    <div className="crs_cates cl_1">
                      <span style={{ color: "#fff" }}>Pending Approval</span>
                    </div>
                  )}
                  <div className="ed_header_caption">
                    <h2 className="ed_title text-light">{`${firstname} ${lastname}`}</h2>

                    <ul>
                      {/* <li className="text-light">
                        <i className="ti-calendar"></i>
                        {`${offer_vouchers || 0} Offer vouchers`}
                      </li> */}
                    </ul>
                  </div>
                  <div className="ed_header_short"></div>
                </div>
                <div className="dlkio_last">
                  <div className="ed_view_link"></div>
                </div>

                {verified &&
                loggeduser.operator &&
                loggeduser.operator === operator._id ? (
                  <></>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Operator_header;
