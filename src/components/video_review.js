import React from "react";
import { domain } from "../assets/js/utils/constants";
import Text_btn from "./text_btn";
import Video from "./video";

class Video_review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { review, class_name, update, remove } = this.props;
    let { url, thumbnail, thumbnail_hash } = review;

    return (
      <div className={class_name}>
        <Video
          url={`${domain}/videos/${url}`}
          thumbnail={thumbnail}
          thumbnail_hash={thumbnail_hash}
        />

        {update || remove ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text_btn text="Edit" icon="fa-edit" action={update} />
            <Text_btn text="Remove" icon="fa-trash" action={remove} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Video_review;
