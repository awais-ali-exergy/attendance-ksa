import {
  Regions,
  Users,
  Settings,
  DashboardIcon,
  HajjComplience,
  Forms,
  productionIcon,
  Compliance,
  lightsvg,
  pinMapIcon,
  discountIcon,
  priceIcon,
  inventoryIcon,
  saleIcon,
  mobileIcon,
  CashIcon,
} from "../../assets/wasfaty/SVG";
// var navData = [];

// const getFeaturesGroups = async () => {
//   console.log("data is coming");

//   try {
//     const response = await fetch(
//       "http://192.168.24.201:8081/AMS/UsersFeatures/GetAllGroupedFeaturesByUser",
//       {
//         method: "POST",
//         headers: {
//           Authorization:
//             "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
//         },
//         redirect: "follow",
//       }
//     );

//     if (response.status === 401) {
//       <Logout />;
//     }

//     const result = await response.json();

//     if (result.SUCCESS === 1) {
//       let data = result.DATA;
//       navData = data.map((item) => ({
//         id: item.label,
//         slug: item.subLabel,
//         title: item.label,
//         navLink: `/Module/${item.id}`,
//         icon: () => productionIcon,
//       }));
//     } else {
//       // handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
//     }
//   } catch (error) {
//     console.log("error", error);
//     handleOpenSnackbar("Failed to fetch ! Please try Again later.", "error");
//   }
// };

var navigationLinks = [
  {
    id: "dashboards",
    slug: "dashboards",
    title: "Dashboards",
    icon: () => DashboardIcon,
    navLink: "/",
    // children: [
    //   {
    //     id: "order_booker",
    //     slug: "order_booker",
    //     title: "Order Booker",
    //     text: "order_booker",

    //     navLink: "/",
    //     icon: () => Users,
    //   },
    //   // {
    //   //   id: "outlet",
    //   //   slug: "outlet",
    //   //   title: "Outlet",
    //   //   text: "outlet",

    //   //   navLink: "/outlet",
    //   //   icon: () => Users,
    //   // },
    //   // {
    //   //   id: "distributors",
    //   //   slug: "distributors",
    //   //   title: "Distributors",
    //   //   text: "distributors",

    //   //   navLink: "/distributors",
    //   //   icon: () => Users,
    //   // },
    //   // {
    //   //   id: "region",
    //   //   slug: "region",
    //   //   title: "Region",
    //   //   text: "region",

    //   //   navLink: "/region",
    //   //   icon: () => Regions,
    //   // },
    // ],
  },

  {
    id: "production",
    slug: "production",
    title: "Admin Module",
    icon: () => productionIcon,
    navLink: "/Module/" + 101,
    // children: [
    //   // {
    //   //   id: "grn",
    //   //   slug: "grn",
    //   //   title: "GRN",
    //   //   text: "grn",
    //   //   navLink: "/grn",
    //   // },
    //   // {
    //   //   id: "stock",
    //   //   slug: "stock",
    //   //   title: "Stock",
    //   //   text: "stock",

    //   //   navLink: "/stock",
    //   // },
    //   // {
    //   //   id: "report",
    //   //   slug: "report",
    //   //   title: "Report",
    //   //   text: "report",

    //   //   navLink: "/report",
    //   // },
    // ],
  },

  {
    id: "administration",
    slug: "administration",
    title: "Employee Module",
    icon: () => Users,
    navLink: "/new_outlet_request",
    navLink: "/Module/" + 102,
  },
  {
    id: "targets",
    slug: "targets",
    title: "Organaisation Module",
    icon: () => Forms,
    navLink: "/Module/" + 103,
  },
  {
    id: "price_list",
    slug: "price_list",
    title: "Attendance Module",
    icon: () => priceIcon,
    navLink: "/Module/" + 104,
  },
  {
    id: "supply_chain",
    slug: "supply_chain",
    title: "Rota Module",
    icon: () => Compliance,
    navLink: "/Module/" + 105,
  },
  {
    id: "inventory",
    slug: "inventory",
    title: "Report Module",
    icon: () => inventoryIcon,
    navLink: "/Module/" + 106,
  },
  {
    id: "sales",
    slug: "sales",
    title: "Basic Leave Module",
    icon: () => saleIcon,
    navLink: "/Module/" + 107,
  },
];

// (async () => {
//   await getFeaturesGroups();
//   console.log(navData, "data is coming");
//   if (navData.length > 0) {
//     navigationLinks.push(...navData);
//   }
// })();

export default navigationLinks;
