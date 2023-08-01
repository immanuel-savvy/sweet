import React from "react";
import ReactMarkdown from "react-markdown";
import { get_request } from "../assets/js/utils/services";
import Alert_box from "../components/alert_box";
import Make_a_donation from "../components/make_a_donation";
import Modal from "../components/modal";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Small_btn from "../components/small_btn";
import { A_tag, Img_tag } from "./who_we_are";

class Donations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let donation = await get_request("donation_section");

    this.setState({ donation });
  };

  toggle = () => this.donation?.toggle();

  render() {
    let { donated, donation } = this.state;
    if (!donation) return;

    let { title, text, image, image_file_hash } = donation;
    if (!title) return;

    text = text?.split("\n");
    title = title?.split(",");

    return (
      <section className="">
        <Section_header
          title={title?.slice(0, -1).join(",") + ","}
          color_title={title?.slice(-1)[0]}
        />

        <div className="container">
          <div className="row justify-content-between align-items-center ">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="lmp_caption">
                <p className="lead text-justify">
                  {<ReactMarkdown children={text && text[0]} />}
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
              <div className="lmp_thumb">
                <Preview_image
                  class_name="rounded"
                  style={{ width: "100%" }}
                  image_hash={image_file_hash}
                  image={image}
                />
              </div>
            </div>
          </div>
          <div className="row ">
            {text?.slice(1).map((t, i) => {
              return (
                <p key={i} className="lead text-justify">
                  <ReactMarkdown
                    children={t}
                    components={{ a: A_tag, img: Img_tag }}
                  />
                </p>
              );
            })}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              {donated ? (
                <Alert_box
                  message={
                    "We have recieve your proposal, and will get in touch with you soon"
                  }
                  type="info"
                />
              ) : (
                <Small_btn title="Make a Donation" action={this.toggle} />
              )}
            </div>
          </div>
        </div>

        <Modal ref={(donation) => (this.donation = donation)}>
          <Make_a_donation toggle={this.toggle} />
        </Modal>
      </section>
    );
  }
}

export default Donations;
