import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { FiX } from "react-icons/fi";
import toast from 'react-hot-toast';
//import { addIcon, rotateIcon } from "../../assets/icons/svgIcons";
import { UFIcon } from "../../utility/helper/UFIcon";
import { fiveRandomNumbers, splitData, TR } from "../../utility/transformers";
import { uploadFileS3 } from "./handleFileUpload";
import UploadProgressBar from "./UploadProgress";

export const BasicDropzone = (props) => {
  const [images, setImages] = useState([]);
  const [imageReload, setImageReload] = useState(false);
  const [updatedOnce, setUpdatedOnce] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([
    { progress: 0, id: 0 },
  ]);
  const handleDelete = (id) => {
    const filteredPropFiles = props.value.filter((file) => file.id !== id);
    const filteredLocalFiles = images.filter((file) => file.id !== id);
    setImages(filteredLocalFiles);
    props.handleChange(filteredPropFiles);
  };

  const handleRetry = (file) => {
    setImageReload(true);
    uploadFileS3(
      file,
      (e) => {
        let filterImages = props.value.filter((item) => item?.id !== file?.id);
        props.handleChange([
          ...filterImages,
          { ...e, id: file.id, error: e?.error },
        ]);
        setImageReload(false);
      },
      (e) => {
        setUploadProgress([...uploadProgress, { progress: e, id: file.id }]);
      }
    );
  };
  useEffect(() => {
    if (props?.value?.length > 0 && !updatedOnce) {
      setImages(props?.value);
      setUpdatedOnce(true);
    }
  }, [props.value]);

  // const thumbs = props.value.map((file, index) => (
  const thumbs = images.map((file, index) => {
    let progress = uploadProgress.filter((item) => item?.id === file?.id);
    if (progress.length > 0) {
      progress = progress[0].progress;
    } else {
      progress = 0;
    }
    let uploadedImage = props.value.filter((item) => item?.id === file?.id);
    if (uploadedImage.length > 0) {
      uploadedImage = uploadedImage[0];
    } else {
      uploadedImage = {};
    }
    const isError = uploadedImage?.error;
    return (
      <div className="dz-thumb" key={index}>
        <a
          href={uploadedImage?.Location}
          target="_blank"
          className={`dz-thumb__file ${uploadedImage?.Location && "active"}  `}
        >
          <figure>{file.name && UFIcon(TR.getFileExtension(file.name))}</figure>
          <div className="dz-thumb__file__content">
            <span className="dz-thumb__file__content--fileName">
              {file.name}
            </span>
            <UploadProgressBar
              uploadProgress={progress}
              isError={isError}
              className="dz-thumb__file__content--progress"
            />
          </div>
        </a>

        {isError ? (
          <div
            className="dz-thumb--retry click-able"
            onClick={() => handleRetry(file)}
          >
            <figure className={`${imageReload && "active"}`}>
              {rotateIcon}
            </figure>
            <span>{imageReload ? "Retrying..." : "Retry"} </span>
          </div>
        ) : (
          <figure
            className="dz-thumb--delete click-able"
            onClick={() => handleDelete(file.id)}
          >
            <FiX />
          </figure>
        )}
      </div>
    );
  });
  return (
    <Dropzone
      accept={`${props.accept ? props.accept : "image/*"}`}
      type="file"
      maxSize={props.size ? props.size : 625000}
      onDropAccepted={(acceptedFiles) => {
        const randomID = fiveRandomNumbers();
        if (acceptedFiles.length > 0) {
          // console.log(acceptedFiles[0]);
          // if (props.value.length <= 5) {
          acceptedFiles[0].id = randomID;
          // acceptedFiles[0].name = splitData(acceptedFiles[0].name, " ", "_");

          setImages([...images, acceptedFiles[0]]);
          uploadFileS3(
            acceptedFiles[0],
            (e) => {
              props.handleChange([
                ...props.value,
                {
                  ...e,
                  name: acceptedFiles[0]?.name,
                  id: randomID,
                  error: e?.error,
                },
              ]);
            },
            (e) => {
              setUploadProgress([
                ...uploadProgress,
                { progress: e, id: randomID },
              ]);
            }
          );
          // } else {
          //   toast.error("Sorry, You can upload  five images");
          // }
        }
      }}
      onDropRejected={(err) => {
        console.log("error:>", err);
        // const errors = err[0].errors.map((error) => toast.error(error.message));
        // return errors;
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="dropZoneContainer">
          <div
            {...getRootProps({ className: "dropzone" })}
            // style={isDisabled ? { pointerEvents: "none" } : {}}
          >
            <input {...getInputProps()} />
            <div
              className={`dropzone__content ${
                props?.uploaderText && "justify-content-center"
              }`}
            >
              <figure>{addIcon}</figure>
              <p className="mx-1">{props?.uploaderText || "Add Files"} </p>
            </div>
          </div>
          <aside className="dropZoneContainer--thumb-container">{thumbs}</aside>
        </section>
      )}
    </Dropzone>
  );
};
