import React from "react";
import {
  date_string,
  time_string,
  to_title,
} from "../assets/js/utils/functions";
import Modal from "./modal";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import { post_request } from "../assets/js/utils/services";
import Text_btn from "./text_btn";
import CopyToClipboard from "react-copy-to-clipboard";
import File_a_report from "./report";

class Driver_sidebar extends React.Component {
  constructor(props) {
    super(props);

    let { voucher_code, ticket_code } = this.props;

    this.state = { voucher_code: voucher_code || ticket_code };
  }

  componentDidMount = async () => {
    let { driver } = this.props;
    let reports = await post_request("reports", { driver: driver._id });
    this.setState({ reports });
  };

  on_report = () => {
    this.setState({ reported: true });
  };

  toggle_report = () => this.report?.toggle();

  copied = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 3000);
    });
  };

  render() {
    let { driver } = this.props;
    let { copied, reported } = this.state;

    let { reports } = driver;

    return (
      <div className="col-lg-4 col-md-12 order-lg-last">
        <div className="ed_view_box style_2 border min pt-3">
          <span className="ml-3">License Plate</span>

          <div className="ed_author">
            <h2 className="theme-cl m-0">
              <span className="old_prc"></span>
            </h2>
          </div>
          <div className="ed_view_link">
            <CopyToClipboard
              text={`${window.location.href}`}
              onCopy={this.copied}
            >
              <a
                href="#"
                onClick={this.share}
                class="btn theme-light enroll-btn"
              >
                Share URL<i class="ti-angle-right"></i>
              </a>
            </CopyToClipboard>
            {copied ? <Text_btn text="Copied!" /> : null}
          </div>

          <div className="ed_view_link">
            <a
              href="#"
              onClick={reported ? null : this.toggle_report}
              className="btn theme-bg enroll-btn"
            >
              {reported ? "Report Sent!" : "Report"}
              <i className="ti-angle-right"></i>
            </a>
          </div>

          <div className="ed_view_features">
            <div className="eld mb-3">
              <h5 className="font-medium">Reports</h5>

              <div className="eld mb-3">
                {reports ? (
                  reports.length ? (
                    <ul className="edu_list right">
                      {reports.map((rep) => (
                        <li>
                          <i className="ti-angle-right"></i>
                          {rep.report.title}:<strong>{rep.count}</strong>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Listempty />
                  )
                ) : (
                  <Loadindicator />
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal ref={(report) => (this.report = report)}>
          <File_a_report
            on_add={this.on_report}
            driver={driver}
            toggle={this.toggle_report}
          />
        </Modal>
      </div>
    );
  }
}

export default Driver_sidebar;
