import React from "react";
import Preview_image from "./preview_image";

class Driver_media extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { driver } = this.props;
    let { image } = driver;

    return (
      <>
        <div class="property_video radius lg mb-4">
          <div class="thumb">
            <Preview_image image={image} class_name="pro_img img-fluid w100" />
          </div>
        </div>
      </>
    );
  }
}

export default Driver_media;
