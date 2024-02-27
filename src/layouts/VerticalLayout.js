// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";
import { getUserData } from "@utils";

// ** Menu Items Array
import navigation from "@src/navigation/vertical";
import { Navigation } from "react-feather";
import { useEffect, useState } from "react";

const VerticalLayout = (props) => {
  // Admin: Auth side menu selection

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
