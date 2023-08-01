import React from "react";
import Preview_image from "./preview_image";
import { Link } from "react-router-dom";
import { date_string } from "../assets/js/utils/functions";

class Operator_card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { operator } = this.props;
    let { image, _id, user, drivers, created } = operator;
    let { firstname, lastname } = user;

    return (
      <div class="single_instructor">
        <div class="single_instructor_thumb">
          <Link to={`/operator?${_id}`}>
            <Preview_image image={image} class_name="img-fluid rounded" />
          </Link>
        </div>
        <div class="single_instructor_caption">
          <h4>
            <a href="#">{`${firstname} ${lastname}`}</a>
          </h4>
          <ul class="instructor_info">
            <li>
              <i class="ti-user"></i>
              {drivers || 1} Drivers
            </li>
            <li>
              <i class="ti-user"></i>
              {date_string(created)}
            </li>
          </ul>
          <p>
            {/* At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi. */}
          </p>
        </div>
      </div>
    );
  }
}

export default Operator_card;
