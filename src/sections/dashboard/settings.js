import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Manage_testimonial_overview from "./manage_testimonial_overview";
import Manage_about_statement from "./manage_about_statement";
import Manage_vision_mission_statement from "./manage_vision_mission_statement";
import { to_title } from "../../assets/js/utils/functions";
import Manage_live_training from "./manage_live_training";
import Manage_donation_section from "./manage_donation_section";
import Report_categories from "./manage_report_category";

const tabs = new Object({
  about_statement: <Manage_about_statement />,
  testimonial_overview: <Manage_testimonial_overview />,
  vision_mission_statement: <Manage_vision_mission_statement />,
  live_training: <Manage_live_training />,
  donation_section: <Manage_donation_section />,
  report_categories: <Report_categories />,
});

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active_tab: "about_statement" };
  }

  render() {
    let { active_tab } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        {
          <Tabs
            defaultActiveKey={active_tab}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            {Object.keys(tabs).map((tab) => (
              <Tab
                eventKey={tab}
                title={to_title(tab.replace(/_/g, " "))}
                key={tab}
              >
                {tabs[tab]}
              </Tab>
            ))}
          </Tabs>
        }
      </div>
    );
  }
}

export default Settings;
