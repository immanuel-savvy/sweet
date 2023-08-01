import React from "react";
import Text_btn from "./text_btn";

class Report_category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { category, edit, remove } = this.props;
    if (!category) return;

    let { title, reports } = category;

    return (
      <div className={"col-xl-3 col-lg-4 col-md-6 col-sm-6"}>
        <div className="crs_trt_grid">
          <div className="crs_trt_caption">
            <div className="instructor_title">
              <h4>
                {title} ({reports || 0})
              </h4>
            </div>
          </div>
          <div className="crs_trt_footer">
            <div className="crs_trt_ent">
              {edit ? <Text_btn text="Edit" action={edit} /> : null}
              &nbsp; &nbsp; &nbsp;
              {remove ? <Text_btn text="Remove" action={remove} /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Report_category;
