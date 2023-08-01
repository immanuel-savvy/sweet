import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import { date_string, gen_random_int } from "../assets/js/utils/functions";
import Preview_image from "../components/preview_image";
import { save_to_session } from "../sections/footer";

class Driver_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_operator = () => {
    let { operator } = this.props;

    save_to_session("operator", operator);
    window.location.assign(`${client_domain}/operator?${operator._id}`);
  };

  render() {
    let { operator, driver } = this.props;
    let { fullname, created, _id } = driver;
    let { user, image } = operator;
    let { firstname, lastname } = user;

    return (
      <div className="ed_detail_head">
        <div className="container">
          <div className="row align-items-center justify-content-between mb-2">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
              <div className="dlkio_452">
                <div className="ed_detail_wrap">
                  {/* <div className="crs_cates cl_1">
                    <span>{category}</span>
                  </div> */}

                  <div className="ed_header_caption">
                    <h2 className="ed_title">{fullname}</h2>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center cursor-pointer">
                      <Preview_image
                        image={image}
                        action={this.handle_operator}
                        class_name="img img-fluid circle"
                        height={70}
                        width={70}
                      />
                    </div>
                    <div className="ml-2 ml-md-3">
                      <span>Operator</span>
                      <h6
                        onClick={this.handle_operator}
                        style={{ cursor: "pointer" }}
                        className="m-0"
                      >
                        {`${firstname} ${lastname}`}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12">
              <ul className="row p-0">
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-star mr-1 text-warning"></i>
                  <span>4.9 Star (5,254)</span>
                </li>
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-calendar mr-1 text-success"></i>
                  <span>{date_string(created)}</span>
                </li>
                {/* <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-user mr-1 text-info"></i>
                  <span>
                    {total_sales || 0} {is_event ? "Tickets Sold" : "Purchased"}
                  </span>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Driver_header;
