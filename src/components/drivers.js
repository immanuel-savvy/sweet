import React from "react";
import { post_request } from "../assets/js/utils/services";
import Loadindicator from "./loadindicator";
import Listempty from "./listempty";
import { emitter } from "./../Sweet";
import Modal from "./modal";
import Driver from "./driver";
import Add_driver from "./add_driver";
import Section_header from "./section_headers";
import Small_btn from "./small_btn";

class Drivers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { operator } = this.props;

    let drivers = await post_request(
      "drivers",
      operator ? { query: { operator: operator._id } } : undefined
    );

    this.setState({ drivers });

    this.new_driver = (driver) => {
      if (driver.operator !== operator._id) return;

      let { drivers } = this.state;
      drivers = new Array(...drivers, driver);

      this.setState({ drivers }, () =>
        this.add_driver?.setState({ show: false })
      );
    };
    this.driver_updated = (driver) => {
      if (driver.operator !== operator._id) return;

      let { drivers } = this.state;

      drivers = drivers.map((d) => {
        if (d?.driver?._id === driver?._id) return { driver };
        return d;
      });

      this.setState({ drivers }, () =>
        this.add_driver?.setState({ show: false })
      );
    };
    emitter.listen("new_driver", this.new_driver);
    emitter.listen("driver_updated", this.driver_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("driver_updated", this.driver_updated);
    emitter.remove_listener("new_driver", this.new_driver);
  };

  edit = (driver) => {
    this.setState({ driver }, this.toggle_add_driver);
  };

  remove = async (driver) => {
    if (!window.confirm("Are you sure to remove driver?")) return;

    let { drivers } = this.state;
    drivers = drivers.filter((d) => d.driver._id !== driver._id);
    this.setState({ drivers });

    await post_request("remove_driver", {
      driver: driver._id,
      operator: driver.operator,
    });
  };

  toggle_add_driver = () => this.add_driver?.toggle();

  render() {
    let { operator } = this.props;
    let { drivers, driver } = this.state;

    return (
      <div className="container">
        <Section_header
          title="Drivers"
          description=""
          btn={<Small_btn title="Add Driver" action={this.toggle_add_driver} />}
        />

        <div className="row align-items-center">
          {drivers ? (
            drivers.length ? (
              drivers.map((driver) => (
                <Driver
                  edit={
                    operator?._id === driver?.driver?.operator &&
                    (() => this.edit(driver.driver))
                  }
                  remove={
                    operator?._id === driver?.driver?.operator &&
                    (() => this.remove(driver.driver))
                  }
                  operator={operator}
                  driver={driver}
                  key={driver._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(add_driver) => (this.add_driver = add_driver)}>
          <Add_driver
            driver={driver}
            toggle={this.toggle_add_driver}
            operator={operator}
          />
        </Modal>
      </div>
    );
  }
}

export default Drivers;
