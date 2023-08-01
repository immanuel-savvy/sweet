import React from "react";
import { client_domain, domain } from "../assets/js/utils/constants";
import { post_request } from "../assets/js/utils/services";
import Text_btn from "../components/text_btn";
import Loadindicator from "../components/loadindicator";

class Hero_banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = { plate: "" };
  }

  search = async (e) => {
    e.preventDefault();

    let { plate } = this.state;

    plate = plate.trim();

    if (!plate) return;

    let driver = await post_request(`driver`, {
      query: {
        [plate.length < 8 ? "license_plate" : "registration_number"]: plate,
      },
    });

    driver?._id
      ? window.location.assign(`${client_domain}/driver/${driver._id}`)
      : this.setState({
          message: "Driver not found",
          searching: false,
          plate: "",
        });
  };

  render() {
    let { message, searching } = this.state;
    let { hero } = this.props;
    let { title, sub_text, image, overlay } = hero;

    return (
      <div
        className="hero_banner image-cover image_bottom h4_bg"
        style={{
          backgroundImage: `url(${domain}/images/${image})`,
          height: "75vh",
          backgroundColor: "black",
          width: "100%",
        }}
        data-overlay={`${overlay || 5}`}
      >
        <div className="container">
          <div className="row align-items-center mx-auto">
            <div className="align-items-center mx-auto">
              <h1 className="banner_title mb-4 text-center">{title}</h1>
              <p
                className="font-lg mx-auto text-center mb-4"
                style={{ width: "60%", fontSize: 20 }}
              >
                {sub_text}
              </p>

              <div class="input-group simple_search">
                <i class="fa fa-search ico"></i>
                <input
                  type="text"
                  onChange={({ target }) =>
                    this.setState({ plate: target.value, message: "" })
                  }
                  class="form-control"
                  placeholder="Enter Vehicle's Plate"
                />
                {searching ? (
                  <Loadindicator />
                ) : (
                  <div class="input-group-append">
                    <button
                      class="btn theme-bg"
                      onClick={this.search}
                      type="button"
                    >
                      Search Vehicle
                    </button>
                  </div>
                )}
              </div>
              {message ? (
                <div style={{ textAlign: "center" }}>
                  <Text_btn
                    text={message}
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      backgroundColor: "black",
                      padding: 10,
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero_banner;
