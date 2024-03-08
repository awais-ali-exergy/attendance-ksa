import { Outlet } from "react-router-dom";
import Layout from "@layouts/VerticalLayout";

import navigation from "@src/navigation/vertical";

const VerticalLayout = (props) => {
  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
