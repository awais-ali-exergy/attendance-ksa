// ** Icons Import
import { Home, Activity, ShoppingCart } from 'react-feather'

export default [
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Home />,
    children: [
      {
        id: "analyticsDash",
        title: "Analytics",
        icon: <Activity />,
        navLink: "/Analytics",
      },
      {
        id: "eCommerceDash",
        title: "eCommerce",
        icon: <ShoppingCart />,
        navLink: "/",
      },
    ],
  },
];
