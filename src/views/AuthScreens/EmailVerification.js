import * as React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  h1: {
    textAlign: "center",
    color: "#333",
  },
  p: {
    color: "#666",
    fontSize: "16px",
    lineHeight: "1.5",
  },
};
export default function LinkVerfication() {
  const navigate = useNavigate();
  let parms = useParams();
  let uUID = parms.u;
  let oTP = parms.o;
  const [isLoading, setIsLoading] = React.useState(false);
  const [stauts, setStauts] = React.useState(false);

  const getAllEmp = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("uUID", uUID);
    formdata.append("oTP", oTP);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/LinkVerification`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setStauts(true);
          setTimeout(function () {
            navigate("/Login");
          }, 3000);
        } else {
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getAllEmp();
  }, []);
  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.h1}>Email Verification</h1>
        <p style={styles.p}>Dear User,</p>
        <p style={styles.p}>Your email has been verified.</p>

        <p style={styles.p}>
          You are being redirected to the login page shortly.
        </p>
        <p style={styles.p}>Thank you,</p>
        <p style={styles.p}>AutoBeatX Management Team</p>
      </div>
    </>
  );
}
