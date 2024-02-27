import toast from "react-hot-toast";
import { SC, errorHandler } from "../../utility/helper";
import AWS from "aws-sdk";

export const handleFileUploader = async ({ files, props }) => {
  const data = {
    project: "APM",
    files,
  };
  const uploadProgress = (e) => {
    props.progressCB(e);
  };
  SC.postAttachment({
    url: `https://attachments.digitum.com.sa/api/attachments?email=admin@ascend.com.sa&password=Ascend@2040`,
    data,
    callbackProgressUpload: uploadProgress,
  }).then(
    (response) => {
      const attachment = response?.data?.data?.files;
      // toast.success("File uploaded successfully!");
      props.handleChange({
        stepIndex: props.stepIndex,
        key: props.name,
        value: props.single ? attachment : [...props.value, attachment[0]],
        // step: props.step || 0,
      });

      return attachment;
    },
    (error) => {
      const err = errorHandler(error);
      toast.error(err);
    }
  );
};

export const uploadFileS3 = (file, callBackS3, progressCB) => {
  if (file) {
    const {
      REACT_APP_AWS_ACCESS_KEY_ID,
      REACT_APP_AWS_BUCKET,
      REACT_APP_AWS_SECRET_ACCESS_KEY,
      REACT_APP_AWS_URL,
    } = process.env;
    var s3 = new AWS.S3({
      accessKeyId: REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: REACT_APP_AWS_SECRET_ACCESS_KEY,
      endpoint: REACT_APP_AWS_URL,
      s3ForcePathStyle: true,
      signatureVersion: "v4",
      ContentDisposition: "attachment;filename=" + file.name,
    });
    var params = {
      Bucket: REACT_APP_AWS_BUCKET,
      Key: file.name?.split(" ").join(""),
      Body: file,
      ACL: "public-read",
    };
    return s3
      .upload(params, function (err, data) {
        if (data) callBackS3(data);
        if (err) callBackS3({ error: err.toString() });
      })
      .on("httpUploadProgress", function (progress) {
        let progressPercentage = Math.round(
          (progress.loaded / progress.total) * 100
        );
        progressCB(progressPercentage);
      });
  }
};
