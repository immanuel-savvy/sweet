import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Article from "../../components/article";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Small_btn from "../../components/small_btn";
import { emitter } from "../../Sweet";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = { page_size: 25, page: 1 };
  }

  componentDidMount = async () => {
    let { page_size, page } = this.state;

    let articles = await post_request("articles", {
      limit: page_size,
      skip: page_size * (page - 1),
    });

    this.setState({ articles });
  };

  render() {
    let { articles } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage articles"
          right_btn={
            <Small_btn
              title="Add Article"
              action={() => emitter.emit("dash_nav_click", "new_article")}
            />
          }
        />
        <div className="row justify-content-center">
          {articles ? (
            articles.length ? (
              articles.map((article) => (
                <Article article={article} key={article._id} />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_articles;
