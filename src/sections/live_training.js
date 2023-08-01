import React from "react";
import { Col } from "react-bootstrap";
import { domain, get_request } from "../assets/js/utils/services";
import Video from "../components/video";

class Live_training extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let live_training = await get_request("live_training");

    this.setState({ live_training });
  };

  render() {
    let { live_training } = this.state;
    if (!live_training) return;

    let { title, description, video, thumbnail } = live_training;

    return (
      <section>
        <div className="container">
          <div className="row mb-3">
            <div
              className={`col-lg-${live_training ? "6" : "12"} col-md-${
                live_training ? "6" : "12"
              } ${
                live_training ? "" : "justify-content-center"
              } col-sm-12 align-items-center d-flex`}
            >
              <div className="">
                {/* <span className="mb-5">LIVE TRAINING</span> */}
                <h2>{title || "How to use our Platform"}</h2>
                <p className="lead">
                  {description ||
                    `Welcome to our comprehensive guide on accessing our engaging seminars and conferences! We believe in providing easy and convenient access to our valuable content, empowering individuals with knowledge and fostering a collaborative learning environment. In this section, we'll walk you through the simple steps to participate in our virtual events, ensuring that you don't miss out on the enriching experiences we have to offer.`}
                </p>
                <br />
                <br />
              </div>
            </div>
            {live_training ? (
              <Col lg={6} md={6} sm={12} className="align-items-center">
                <Video
                  url={`${domain}/videos/${video}`}
                  thumbnail={thumbnail}
                />
              </Col>
            ) : null}
          </div>
        </div>
      </section>
    );
  }
}

export default Live_training;
