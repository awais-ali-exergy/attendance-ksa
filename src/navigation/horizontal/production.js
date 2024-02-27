// ** Icons Import
import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User,
  Shield,
} from "react-feather";

export default [
  {
    id: "production",
    title: "Production",
    icon: <FileText size={20} />,
    children: [
      {
        id: "receipt-from-Production",
        title: "Receipt from Production",
        icon: <Circle size={12} />,
        navLink: "/receipt-from-Production",
      },
      {
        id: "production-report",
        title: "Production Report",
        icon: <Circle size={12} />,
      },
      {
        id: "production-gnr",
        title: "Production GRN",
        icon: <Circle size={12} />,
      },
      {
        id: "production-gnr-report",
        title: "Production GRN Report",
        icon: <Circle size={12} />,
      },
      {
        id: "stock-transfer",
        title: "Stock Transfer",
        icon: <Circle size={12} />,
      },
      {
        id: "warehouse-gnr",
        title: "Warehouse GRN",
        icon: <Circle size={12} />,
      },
      {
        id: "monthly-discount",
        title: "Warehouse Stock Transfer",
        icon: <Circle size={12} />,
      },
    ],
  },
];
