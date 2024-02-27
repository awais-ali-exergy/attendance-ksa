import React, { useState, Fragment } from "react";
import { Card, CardBody, Alert, CardHeader, CardTitle } from "reactstrap";
import UploadProgressBar from "./UploadProgress";
import { BasicDropzone } from "./BasicDropZone";
import "./style.scss"
const FileUploader = (props) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  return (
    <Fragment>
      {/* <UploadProgressBar uploadProgress={uploadProgress} /> */}
      <Card>
        {!props?.onlyUploader && (
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
            <CardTitle className="text-success">Optional</CardTitle>
          </CardHeader>
        )}
        <CardBody>
          <BasicDropzone
            handleChange={props.handleChange}
            name={props.name}
            accept={props.accept}
            size={props.size}
            value={props.value}
            url={props.url}
            step={props.step}
            single={props.single}
            stepIndex={props.stepIndex}
            progressCB={setUploadProgress}
            uploadProgress={uploadProgress}
            fileUploadName={props.fileUploadName}
            {...props}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default FileUploader;
