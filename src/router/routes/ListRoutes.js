import { lazy } from "react";
const UserList = lazy(() => import("../../views/pages/List/UserList"));
const Dashboard = lazy(() => import("../../views/pages/dashboard"));
const GroupedFeatures = lazy(() => import("../../views/pages/GroupedFeatures"));
const Production = lazy(() => import("../../views/pages/production"));
const Stock = lazy(() => import("../../views/pages/production/Stock"));
const Report = lazy(() => import("../../views/pages/production/Report"));
const Slip = lazy(() => import("../../views/pages/discountsAndPromo/Slip"));
const CreditSlip = lazy(() =>
  import("../../views/pages/discountsAndPromo/CreditSlip")
);

const AddDesignationViewList = lazy(() =>
  import(
    "../../views/pages/HRModule/Designation/DesignationView/DesignationViewList"
  )
);

const NewOutletRequest = lazy(() =>
  import("../../views/pages/administrator/NewOutletRequest")
);
const AddEmployee = lazy(() =>
  import("../../views/pages/Employee/AddEmployee/AddEmployee")
);
const AddDepartment = lazy(() =>
  import("../../views/pages/HRModule/Department/AddDepartment")
);
const AddDesignation = lazy(() =>
  import("../../views/pages/HRModule/Designation/AddDesignation")
);
const AdminManualAttendance = lazy(() =>
  import("../../views/pages/ManualAttendance/AdminManualAttendance")
);

const AddDepartmentViewList = lazy(() =>
  import(
    "../../views/pages/HRModule/Department/DepartmentView/DepartmentViewList"
  )
);

const BasicLeave = lazy(() =>
  import("../../views/pages/LeaveModule/BasicLeave")
);
const Holiday = lazy(() => import("../../views/pages/Holiday/TakeHolidayForm"));
const HolidayLeave = lazy(() =>
  import("../../views/pages/Holiday/HolidayListview/HolidayListView")
);
const HolidayListView = lazy(() =>
  import("../../views/pages/Holiday/HolidayListview/HolidayListView")
);

const ViewAllEmployeesData = lazy(() =>
  import("../../views/pages/Employee/ViewAllEmployees/ViewAllEmployeesData")
);
const ViewAllAttendanceData = lazy(() =>
  import(
    "../../views/pages/ManualAttendance/ViewAttendanceData/ViewAttendanceData"
  )
);
const FirmManagement = lazy(() =>
  import("../../views/pages/FirmManagment/FirmManagement")
);
const AddStoreLocation = lazy(() =>
  import("../../views/pages/AddStoreLocation/AddStoreLocation")
);

const ManagerRights = lazy(() =>
  import("../../views/pages/HRModule/ManagerRights/ManagerRights")
);
const UserRights = lazy(() =>
  import("../../views/pages/HRModule/UserRights/UserRights")
);
const AttendanceMarker = lazy(() =>
  import("../../views/pages/AttendanceMarker/AttendanceMarker")
);
const ListOfBranches = lazy(() =>
  import("../../views/pages/AddStoreLocation/ListOfBranches/ListOfBranches")
);

const ViewAllLeavesData = lazy(() =>
  import("../../views/pages/LeaveModule/BasicLeaveData/BasicLeaveDataList")
);

const ViewAllEmployeeReportData = lazy(() =>
  import("../../views/pages/EmployeeReport/EmployeeReport")
);

const AttendanceReport = lazy(() =>
  import("../../views/pages/AttendanceReport/AttendanceReport")
);

const LeaveReport = lazy(() =>
  import("../../views/pages/LeaveReport/LeaveReport")
);
const Page404 = lazy(() => import("../../views/pages/Other/Page404"));
const UnderDevelopment = lazy(() =>
  import("../../views/pages/Other/UnderDevelopment")
);
const ListRoutes = [
  {
    element: <Dashboard />,
    path: "/",
    route: "order_booker",
    slug: "order_booker",
    title: "order_booker",
  },
  {
    element: <Dashboard />,
    path: "/outlet",
    route: "outlet",
    slug: "outlet",
    title: "outlet",
  },
  {
    element: <Dashboard />,
    path: "/distributors",
    route: "distributors",
    slug: "distributors",
    title: "distributors",
  },
  {
    element: <Dashboard />,
    path: "/region",
    route: "region",
    slug: "region",
    title: "region",
  },
  // Production
  {
    element: <GroupedFeatures />,
    path: "/Module/:groupId",
    route: "production",
    slug: "production",
    title: "production",
  },

  {
    element: <Production />,
    path: "/grn",
    route: "grn",
    slug: "grn",
    title: "grn",
  },
  {
    element: <Stock />,
    path: "/stock",
    route: "stock",
    slug: "stock",
    title: "stock",
  },
  {
    element: <Report />,
    path: "/report",
    route: "report",
    slug: "report",
    title: "report",
  },
  {
    element: <Slip />,
    path: "/slip",
    route: "slip",
    slug: "slip",
    title: "slip",
  },
  {
    element: <CreditSlip />,
    path: "/credit_slip",
    route: "credit_slip",
    slug: "credit_slip",
    title: "credit_slip",
  },
  {
    element: <NewOutletRequest />,
    path: "/new_outlet_request",
    route: "new_outlet_request",
    slug: "new_outlet_request",
    title: "new_outlet_request",
  },
  {
    element: <AddEmployee />,
    path: "/AddEmployee",
    route: "AddEmployee",
    slug: "AddEmployee",
    title: "AddEmployee",
  },
  {
    element: <AddEmployee />,
    path: "/AddEmployee/:id",
    route: "AddEmployee",
    slug: "AddEmployee",
    title: "AddEmployee",
  },
  {
    element: <Holiday />,
    path: "/Holiday",
    route: "Holiday",
    slug: "Holiday",
    title: "Holiday",
  },
  {
    element: <AddDepartment />,
    path: "/AddDepartment",
    route: "AddEmployee",
    slug: "AddEmployee",
    title: "AddEmployee",
  },
  {
    element: <AddDepartment />,
    path: "/AddDepartment/:id",
    route: "AddEmployee",
    slug: "AddEmployee",
    title: "AddEmployee",
  },
  {
    element: <AddDepartmentViewList />,
    path: "/AddDepartmentViewList",
    route: "AddDepartmentViewList",
    slug: "AddDepartmentViewList",
    title: "AddDepartmentViewList",
  },
  {
    element: <AddDesignationViewList />,
    path: "/AddDesignationViewList",
    route: "AddDesignationViewList",
    slug: "AddDesignationViewList",
    title: "AddDesignationViewList",
  },
  {
    element: <HolidayLeave />,
    path: "/Holiday",
    route: "Holiday",
    slug: "Holiday",
    title: "Holiday",
  },

  {
    element: <HolidayListView />,
    path: "/ViewAllHolidayData",
    route: "ViewAllHolidayData",
    slug: "ViewAllHolidayData",
    title: "ViewAllHolidayData",
  },
  {
    element: <AddDesignation />,
    path: "/AddDesignation",
    route: "AddEmployee",
    slug: "AddEmployee",
    title: "AddEmployee",
  },
  {
    element: <ViewAllEmployeesData />,
    path: "/ViewAllEmployeeData",
    route: "ViewAllEmployees",
    slug: "ViewAllEmployees",
    title: "ViewAllEmployees",
  },
  {
    element: <LeaveReport />,
    path: "/LeaveReport",
    route: "LeaveReport",
    slug: "LeaveReport",
    title: "LeaveReport",
  },
  {
    element: <ViewAllLeavesData />,
    path: "/ViewAllLeavesData",
    route: "ViewAllLeavesData",
    slug: "ViewAllLeavesData",
    title: "ViewAllLeavesData",
  },
  {
    element: <AdminManualAttendance />,
    path: "/AdminManualAttendance",
    route: "AddEmployee",
    slug: "AddEmployee",
    title: "AddEmployee",
  },
  {
    element: <AdminManualAttendance />,
    path: "/AdminManualAttendance/:id",
    route: "AddEmployee",
    slug: "AddEmployee",
    title: "AddEmployee",
  },
  {
    element: <ViewAllEmployeeReportData />,
    path: "/EmployeeReport",
    route: "EmployeeReport",
    slug: "EmployeeReport",
    title: "EmployeeReport",
  },
  {
    element: <AttendanceReport />,
    path: "/AttendanceReport",
    route: "AttendanceReport",
    slug: "AttendanceReport",
    title: "AttendanceReport",
  },
  {
    element: <BasicLeave />,
    path: "/BasicLeave",
    route: "AddEmployee",
    slug: "AddEmployee",
    title: "AddEmployee",
  },
  {
    element: <ViewAllAttendanceData />,
    path: "/ViewAllAttendanceData",
    route: "ViewAllAttendance",
    slug: "ViewAllAttendance",
    title: "ViewAllAttendance",
  },
  {
    element: <FirmManagement />,
    path: "/AddCompanies",
    route: "ViewAllAttendance",
    slug: "ViewAllAttendance",
    title: "ViewAllAttendance",
  },
  {
    element: <AddStoreLocation />,
    path: "/AddStoreLocation",
    route: "ViewAllAttendance",
    slug: "ViewAllAttendance",
    title: "ViewAllAttendance",
  },
  {
    element: <ManagerRights />,
    path: "/ManagerRights",
    route: "ViewAllAttendance",
    slug: "ViewAllAttendance",
    title: "ViewAllAttendance",
  },
  {
    element: <UserRights />,
    path: "/UserRights",
    route: "ViewAllAttendance",
    slug: "ViewAllAttendance",
    title: "ViewAllAttendance",
  },
  {
    element: <AttendanceMarker />,
    path: "/AttendanceMarker",
    route: "ViewAllAttendance",
    slug: "ViewAllAttendance",
    title: "ViewAllAttendance",
  },
  {
    element: <ListOfBranches />,
    path: "/StoreLocationList",
    route: "ViewAllAttendance",
    slug: "ViewAllAttendance",
    title: "ViewAllAttendance",
  },
  {
    element: <AddStoreLocation />,
    path: "/AddStoreLocation/:id",
    route: "ViewAllAttendance",
    slug: "ViewAllAttendance",
    title: "ViewAllAttendance",
  },
  {
    element: <UnderDevelopment />,
    path: "/UnderDevelopment",
    route: "targets",
    slug: "targets",
    title: "targets",
  },
  // {
  //   element: <Page404 />,
  //   path: "/price_list",
  //   route: "price_list",
  //   slug: "price_list",
  //   title: "price_list",
  // },
  // {
  //   element: <Page404 />,
  //   path: "/supply_chain",
  //   route: "supply_chain",
  //   slug: "supply_chain",
  //   title: "supply_chain",
  // },
  // {
  //   element: <Page404 />,
  //   path: "/inventory",
  //   route: "inventory",
  //   slug: "inventory",
  //   title: "inventory",
  // },
  // {
  //   element: <Page404 />,
  //   path: "/sales",
  //   route: "sales",
  //   slug: "sales",
  //   title: "sales",
  // },
  // {
  //   element: <Page404 />,
  //   path: "/report_center",
  //   route: "report_center",
  //   slug: "report_center",
  //   title: "report_center",
  // },
  // {
  //   element: <Page404 />,
  //   path: "/crm",
  //   route: "crm",
  //   slug: "crm",
  //   title: "crm",
  // },
  // {
  //   element: <Page404 />,
  //   path: "/distributor_reports",
  //   route: "distributor_reports",
  //   slug: "distributor_reports",
  //   title: "distributor_reports",
  // },
  // {
  //   element: <Page404 />,
  //   path: "/mobile",
  //   route: "mobile",
  //   slug: "mobile",
  //   title: "mobile",
  // },
  // {
  //   element: <Page404 />,
  //   path: "/cash",
  //   route: "cash",
  //   slug: "cash",
  //   title: "cash",
  // },
];
export default ListRoutes;
