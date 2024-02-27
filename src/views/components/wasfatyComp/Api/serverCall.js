/* eslint-disable no-extend-native */
import axios from "axios";
import { authHeader } from "./authHeader";
import errorHandler from "./errorHandler";

const baseUrl = process.env.REACT_APP_BASEURL;
const version = process.env.REACT_APP_VERSION;
console.log("version", version);

export const SC = {
  getCall,
  postCall,
  putCall,
  deleteCall,
  postCallWithoutAuth,
  getCallWithId,
  postAttachment,
  postCallTicketing,
};

const handleVersionErrors = (error) => {
  let err = errorHandler(error);
  if (err == "Version Not Matched.") {
    window.location.reload();
  }
};

function getCall({ url, customUrl, page, params, customToken }) {
  params = {
    ...params,
    // version: version,
  };
  const requestOptions = {
    method: "GET",
    headers: authHeader(customToken),
    params,
  };
  return axios
    .get(
      customUrl
        ? customUrl
        : // + `?version=${version}`
          baseUrl + url,
      // + `?version=${version}`,
      requestOptions
    )
    .then((response) => {
      // console.log("version", version);

      return response;
    })
    .catch(function (error) {
      handleVersionErrors(error);

      return Promise.reject(error);
    });
}

// function getCallTicketing({ url, customUrl, page, params, customToken }) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(customToken),
//     params: { ...params, forData: true },
//   };
//   return axios
//     .get(
//       customUrl
//         ? customUrl
//         : // + `?version=${version}`
//           baseUrl + url,
//       // + `?version=${version}`,
//       requestOptions
//     )
//     .then((response) => {
//       // console.log("version", version);

//       return response;
//     })
//     .catch(function (error) {
//       handleVersionErrors(error);

//       return Promise.reject(error);
//     });
// }
function postCall({
  url,
  customUrl,
  data,
  callbackProgressUpload = null,
  source,
}) {
  Date.prototype.toJSON = function () {
    // return moment(this).format();
  };
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
    onUploadProgress: function (progressEvent) {
      // var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      if (callbackProgressUpload) callbackProgressUpload(progressEvent);
    },
  };
  if (source) {
    requestOptions.cancelToken = source.token;
  }
  return axios
    .post(
      customUrl
        ? customUrl
        : // `?version=${version}`
          baseUrl + url,
      // + `?version=${version}`,
      data,
      requestOptions
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      handleVersionErrors(error);

      return Promise.reject(error);
    });
}

function postCallTicketing({
  url,
  customUrl,
  data,
  callbackProgressUpload = null,
  source,
}) {
  Date.prototype.toJSON = function () {
    // return moment(this).format();
  };
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
    onUploadProgress: function (progressEvent) {
      // var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      if (callbackProgressUpload) callbackProgressUpload(progressEvent);
    },
  };
  if (source) {
    requestOptions.cancelToken = source.token;
  }
  return axios
    .post(
      customUrl ? customUrl + "?forData=true" : baseUrl + url + "?forData=true",
      data,
      requestOptions
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      handleVersionErrors(error);

      return Promise.reject(error);
    });
}
function postAttachment({ url, data, callbackProgressUpload = null, source }) {
  Date.prototype.toJSON = function () {
    // return moment(this).format();
  };
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
    onUploadProgress: function (progressEvent) {
      // var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      if (callbackProgressUpload) callbackProgressUpload(progressEvent);
    },
  };
  if (source) {
    requestOptions.cancelToken = source.token;
  }
  return axios
    .post(url, data, requestOptions)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      handleVersionErrors(error);

      return Promise.reject(error);
    });
}
function putCall({ url, customUrl, data }) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return axios
    .put(
      customUrl
        ? customUrl + `?version=${version}`
        : baseUrl + url + `?version=${version}`,
      data,
      requestOptions
    )
    .then((response) => {
      return response;
    })

    .catch(function (error) {
      handleVersionErrors(error);
      return Promise.reject(error);
    });
}
function deleteCall({ customUrl, url }) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  return axios
    .delete(
      customUrl
        ? customUrl + `?version=${version}`
        : baseUrl + url + `?version=${version}`,
      requestOptions
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
}

function postCallWithoutAuth({ url, customUrl, data }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return axios
    .post(
      customUrl
        ? customUrl + `?version=${version}`
        : baseUrl + url + `?version=${version}`,
      data,
      requestOptions
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      handleVersionErrors(error);

      return Promise.reject(error);
    });
}
//get data with id
function getCallWithId({ url, customUrl, id }) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return axios
    .get(
      customUrl
        ? customUrl + url + "/" + id + `?version=${version}`
        : baseUrl + url + url + "/" + id + `?version=${version}`,

      requestOptions
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      handleVersionErrors(error);

      return Promise.reject(error);
    });
}
