import { Outlet } from "react-router-dom";
import Layout from "@layouts/VerticalLayout";

import navigation from "@src/navigation/vertical";

const VerticalLayout = (props) => {
  const userDetail = localStorage.getItem("AtouBeatXData");
  const userData = JSON.parse(userDetail);

  return (
    <>
      {userData?.DATA?.isUserProfileReviewed === 1 &&
      userData?.DATA?.isFirmProfileReviewed === 1 ? (
        <Layout menuData={navigation} {...props}>
          <Outlet />
        </Layout>
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </>
  );
};

export default VerticalLayout;
