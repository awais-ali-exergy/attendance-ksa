import * as React from "react";
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
    CashIcon
  } from "../../assets/wasfaty/SVG";

export default function navigationLinks() {
    const [groupFeatures, setGroupFeatures] = useState([]);
    const navigationLinks = [
        {
          id: "dashboards",
          slug: "dashboards",
          title: "Dashboards",
          icon: () => DashboardIcon,
          navLink: "/",
        },
        {
          id: "administration",
          slug: "administration",
          title: "Administration",
          navLink: "/new_outlet_request",
          icon: () => Users,

        },
        {
          id: "targets",
          slug: "targets",
          title: "Targets",
          icon: () => Forms,
          navLink: "/targets",
  
        },
        {
          id: "price_list",
          slug: "price_list",
          title: "Price List",
          icon: () => priceIcon,
          navLink: "/price_list",
      

        },
        {
          id: "supply_chain",
          slug: "supply_chain",
          title: "Supply Chain",
          icon: () => Compliance,
          navLink: "/supply_chain",
      
   
        },
        {
          id: "report_center",
          slug: "report_center",
          title: "Report Center",
          icon: () => lightsvg,
          navLink: "/report_center",
      
       
        },
        {
          id: "crm",
          slug: "crm",
          title: "CRM",
          icon: () => Settings,
          navLink: "/crm",
      

        },
        {
          id: "distributor_reports",
          slug: "distributor_reports",
          title: "Distributor Reports",
          icon: () => pinMapIcon,
          navLink: "/distributor_reports",
      
     
        },
        {
          id: "mobile",
          slug: "mobile",
          title: "Mobile",
          icon: () => mobileIcon,
          navLink: "/mobile",

        },
        {
          id: "cash",
          slug: "Cash",
          title: "Cash",
          icon: () => CashIcon,
          navLink: "/cash",

        },
      ];
    const getFeaturesGroups = async () => {
    
        await fetch(
          `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/GetAllGroupedFeaturesByUser`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
            },
            redirect: "follow",
          }
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.SUCCESS === 1) {
              setGroupFeatures(result.DATA);
            } 
            // else {
            //     handleOpenAlert(<span>{result.USER_MESSAGE}</span>, "danger");
            // }
          })
          .catch((error) => {
            console.log("error", error);
            // handleOpenAlert(
            //   "Failed to fetch ! Please try Again later.",
            //   "danger"
            // );
          });
      };
      React.useEffect(() => {
        getFeaturesGroups();
      }, []);
        return (
            
            {navigationLinks}
            );
}