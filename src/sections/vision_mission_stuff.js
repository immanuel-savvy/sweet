import React from "react";
import { domain } from "../assets/js/utils/constants";
import Small_btn from "../components/small_btn";

class Vision_mission_stuff extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { details, reverted, gray } = this.props;
    if (!details) return;

    let {
      vision_statement: description,
      global: title,
      action_text,
      action_url,
      features,
      vision: image,
      vision_title,
      mission_title,
    } = details;
    if (vision_title) title = vision_title;
    if (!title) title = mission_title;

    if (!image) image = details.mission;
    if (!description) description = details.mission_statement;

    return (
      <div className={gray ? "container-fluid gray" : "container-fluid"}>
        <div className="row">
          <section class="imageblock pt-m-0">
            <div class={"imageblock__content" + (reverted ? " left" : "")}>
              <div
                class="background-image-holder"
                style={{
                  backgroundImage:
                    typeof image === "string"
                      ? `url(${domain}/images/${image})`
                      : `url('${image}')`,
                }}
              ></div>
            </div>
            <div class="container">
              <div
                class={`row align-items-center justify-content-${
                  reverted ? "end" : "between"
                }`}
              >
                <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                  <div class="lmp_caption">
                    <h2 class="mb-3">{title.replace(/_/g, " ")}</h2>
                    <p className="ml-0" style={{ fontSize: 16 }}>
                      {description}
                    </p>

                    {features
                      ? features.map((feature, index) => (
                          <div key={index} class="mb-3 mr-4 ml-lg-0 mr-lg-4">
                            <div class="d-flex align-items-center">
                              <div class="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                                <i class="fas fa-check"></i>
                              </div>
                              <h6 class="mb-0 ml-3">{feature}</h6>
                            </div>
                          </div>
                        ))
                      : null}

                    {action_text ? (
                      <Small_btn
                        text={action_text}
                        action={() => window.location.assign(action_url)}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Vision_mission_stuff;
