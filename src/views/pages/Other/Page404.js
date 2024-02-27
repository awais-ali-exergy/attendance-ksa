import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import AuthUser from "../../wasfaty/services/AuthService";

function Page404() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {AuthUser.isAdmin ? (
        <>
          <h1 style={{ fontSize: 60 }}>404</h1>
          <h1>We can't find that page</h1>
        </>
      ) : (
        <>
          <h1 style={{ fontSize: 60 }}>403</h1>
          <h3>
            Access Denied: Please contact your administrator for permission.
          </h3>
        </>
      )}

      <Button.Ripple
        style={{
          backgroundColor: "#10A945",
          color: "black",
        }}
        className="round btun mt-2 "
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
        color="primary"
      >
        <span style={{ color: "white" }}>Home</span>
      </Button.Ripple>
    </div>
  );
}

export default Page404;
