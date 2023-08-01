import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../../assets/js/utils/functions";
import { emitter } from "../../Sweet";

class Dashboard_breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  right_btn = (on_click, title, hide) => {
    return hide ? null : (
      <div>
        <div class="elkios" onClick={on_click}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>
            {to_title(title)}
          </a>
        </div>
      </div>
    );
  };

  render() {
    let { crumb, on_click, hide, title, right_btn } = this.props;
    on_click = on_click || right_btn;

    return (
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
          {on_click ? (
            <div class="dashboard_wrap d-flex align-items-center justify-content-between">
              <div class="arion">
                <nav class="transparent">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <Link
                        onClick={() =>
                          emitter.emit("dash_nav_click", "dashboard")
                        }
                        style={{ color: "#000132" }}
                      >
                        Home
                      </Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      {to_title(crumb)}
                    </li>
                  </ol>
                </nav>
              </div>
              {right_btn || this.right_btn(on_click, title, hide)}
            </div>
          ) : (
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link style={{ color: "#000132" }} to="/">
                    Home
                  </Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {to_title(crumb)}
                </li>
              </ol>
            </nav>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard_breadcrumb;
