import { Singleton, Resources } from "../Resource";
import moment from "moment";
import startCase from "lodash/startCase";
import { SC } from "../Api/serverCall";

class Service extends Resources {
  route = "user";
  allUsers = "allUsers";

  constructor() {
    super(arguments);
  }

  getHeaders() {
    return [
      { title: "Name", dataIndex: "name" },
      { title: "Email", dataIndex: "email" },
      { title: "Phone", dataIndex: "phone" },
      { title: "Role", dataIndex: "type" },
      { title: "Category", dataIndex: "category" },
      { title: "Region", dataIndex: "region" },
      { title: "Cluster", dataIndex: "cluster" },
      { title: "Site", dataIndex: "sites" },
      { title: "Site Name Aabic", dataIndex: "phc_name_ar" },
      { title: "City", dataIndex: "city" },
      { title: "Facility Type", dataIndex: "facilityType" },
      { title: "Moh Id", dataIndex: "moh_id" },
      {
        title: startCase("nhic_organization_id"),
        dataIndex: "nhic_organization_id",
      },
      {
        title: startCase("wasfaty_code"),
        dataIndex: "wasfaty_code",
      },
      { title: "Modules", dataIndex: "modules" },
      { title: "Created at", dataIndex: "created_at" },
    ];
  }

  getUsers(params) {
    return SC.getCall({
      url: this.allUsers,
      params,
    });
  }

  mapExportData(data) {
    data = data.map((item) => {
      item.modules = item.modules.reduce((r, c) => r + c.name + ",", "");
      item.region = item.region.reduce((r, c) => r + c.name + ",", "");
      let sites = "";
      if (item?.clusters?.length) {
        item.cluster = item.clusters.reduce((r, c) => r + c.name + ",", "");
      }

      if (item?.sites?.length) {
        sites = item.sites.reduce((r, c) => r + c.name + ",", "");
      }

      let otherObj = {};
      if (item?.nupco_sites?.length) {
        sites = item.nupco_sites.reduce(
          (r, c) => r + c.phc_name_eng + ",",
          sites
        );

        otherObj = item.nupco_sites[0];
      }

      item.sites = sites;

      item.created_at = moment(item.created_at.created_at).format(
        "DD-MM-YYYY h:mm A"
      );
      return { ...otherObj, ...item };
    });

    return {
      headers: this.getHeaders(),
      data,
    };
  }
}

const UserService = new Service();
export default UserService;
