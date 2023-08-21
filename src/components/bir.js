import React from "react";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import { Link } from "react-router-dom";

class Bir extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { bir, remove } = this.props;

    if (!bir) return;

    let { user, _id } = bir;

    let { image, image_hash, firstname, lastname, email } = user;
    if (!image) image = require("../assets/img/rate.png");

    return (
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <div class="crs_partn ed_view_box">
          <div class="p-3">
            <Link to={`/bir?_id=${_id}`}>
              <Preview_image
                image={image}
                image_hash={image_hash}
                class_name="img-fluid"
              />
            </Link>

            <Link to={`/bir?_id=${_id}`}>
              <h5>{`${firstname} ${lastname}`}</h5>
            </Link>
            <p style={{ flexWrap: "wrap", wordBreak: "break-all" }}>{email}</p>
          </div>

          {remove ? (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {remove ? (
                <Text_btn text="Remove" icon="fa-cancel" action={remove} />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Bir;
