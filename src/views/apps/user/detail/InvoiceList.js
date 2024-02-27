// ** Reactstrap Imports
import { Card, CardHeader, Badge } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";


const projectsArr = [
  {
    progress: 60,
    hours: "210:30h",
    progressColor: "info",
    totalTasks: "1000000",
    subtitle: "React Project",
    title: "BGC eCommerce App",
    img: require("@src/assets/images/icons/brands/react-label.png").default,
  },
  {
    hours: "89h",
    progress: 15,
    totalTasks: "1000000",
    progressColor: "danger",
    subtitle: "UI/UX Project",
    title: "Falcon Logo Design",
    img: require("@src/assets/images/icons/brands/xd-label.png").default,
  },
  {
    progress: 90,
    hours: "129:45h",
    totalTasks: "1000000",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Dashboard Design",
    img: require("@src/assets/images/icons/brands/vue-label.png").default,
  },
  {
    hours: "45h",
    progress: 49,
    totalTasks: "1000000",
    progressColor: "warning",
    subtitle: "iPhone Project",
    title: "Foodista mobile app",
    img: require("@src/assets/images/icons/brands/sketch-label.png").default,
  },

  {
    progress: 73,
    hours: "67:10h",
    totalTasks: "1000000",
    progressColor: "info",
    subtitle: "React Project",
    title: "Dojo React Project",
    img: require("@src/assets/images/icons/brands/react-label.png").default,
  },
  {
    progress: 81,
    hours: "108:39h",
    totalTasks: "1000000",
    title: "HTML Project",
    progressColor: "success",
    subtitle: "Crypto Website",
    img: require("@src/assets/images/icons/brands/html-label.png").default,
  },
  {
    progress: 78,
    hours: "88:19h",
    totalTasks: "1000000",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Vue Admin template",
    img: require("@src/assets/images/icons/brands/vue-label.png").default,
  },
];

export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "Project",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.img}
              alt={row.title}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.title}</span>
            <small className="text-muted">{row.subtitle}</small>
          </div>
        </div>
      );
    },
  },
  {
    name: "Invoice",
    selector: (row) => row.totalTasks,
  },
  {
    name: "Action",
    selector: (row) => row.totalTasks,
  },
];

const UserProjectsList = () => {
  return (
    <Card>
      <CardHeader tag="h4">Invoice List</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserProjectsList;
