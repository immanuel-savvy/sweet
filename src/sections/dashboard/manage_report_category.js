import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Report_category from "../../components/report_category";
import Right_btn from "../../components/right_btn";
import Modal from "../../components/modal";
import Add_category from "./add_category";

class Report_categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let categories = await get_request("report_categories");

    this.setState({ categories });
  };

  on_add = (category) => {
    let { categories, category_in_edit } = this.state;

    if (category_in_edit) {
      categories = categories.map((cat) => {
        if (cat._id === category_in_edit._id) return category;
        return cat;
      });
    } else categories = new Array(category, ...categories);
    this.setState({ categories, category_in_edit: null });
  };

  toggle_add_category = () => this.add_category?.toggle();

  edit_cat = (cat) => {
    this.setState({ category_in_edit: cat });
    this.toggle_add_category();
  };

  remove_cat = async (cat) => {
    if (!window.confirm("Are you sure you to remove category?")) return;

    let { categories } = this.state;
    categories = categories.filter((c) => c._id !== cat._id);
    this.setState({ categories });

    await post_request(`remove_category/${cat._id}`);
  };

  render() {
    let { categories, category_in_edit } = this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb
          crumb="categories"
          right_btn={
            <Right_btn title="add category" action={this.toggle_add_category} />
          }
        />
        <div className="row">
          {categories ? (
            categories.length ? (
              categories.map((category) => (
                <Report_category
                  category={category}
                  edit={() => this.edit_cat(category)}
                  remove={() => this.remove_cat(category)}
                  key={category._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(add_category) => (this.add_category = add_category)}>
          <Add_category
            category={category_in_edit}
            toggle={this.toggle_add_category}
            on_add={this.on_add}
          />
        </Modal>
      </div>
    );
  }
}

export default Report_categories;
