import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Badge, Spinner } from "reactstrap";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "reactstrap";
import startCase from "lodash/startCase";

import {
  IntlService,
  NavigationService,
  TaskService,
} from "../wasfaty/services";
import ButtonGreen from "./buttons/ButtonGreen";
import ButtonGreenOutline from "./buttons/ButtonGreenOutline";
import AuthUser from "../wasfaty/services/AuthService";
import TaskModal from "../wasfaty/Models/TaskModal";
import ReactSignatureCanvas from "react-signature-canvas";
import { observer } from "mobx-react";

const Signature = observer(({ task }) => {
  if (!task) return null;
  return (
    <div className="w-100">
      <p className="label">{IntlService.m("Signature")}</p>

      <ReactSignatureCanvas
        clearOnResize={false}
        ref={(ref) => {
          ref?.off?.();
          task.setSignatureRef(ref);
        }}
        penColor="transparent"
        canvasProps={{
          className: "signature-canvas",
        }}
      />
    </div>
  );
});

/**
 * @param {object} props
 * @param {TaskModal} props.task
 */
function SubmissionReview({ task }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  const SubmitAction = (status, reject) => {
    setLoading(true);
    TaskService.updateStatus(status, task._id, reject ? inputValue : null).then(
      (res) => {
        if (res.status == 200) {
          toast.success(res?.data?.data);
          task.init(res?.data?.task);

          // NavigationService.Navigation("/Schedule-Task");
        } else {
          toast.error(res.response.data.data);
        }
        setLoading(false);
        setModalOpen(false);
      }
    );
  };

  const rejectedResons = task?.history
    ?.filter((his) => his.is_rejected && !!his.reason)
    .reverse();

  // if (!(AuthUser.isAdmin || AuthUser.isRegionalRepresentatives)) return null;

  return (
    <div className="submission-review">
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        className="custom-modal"
        centered
      >
        <ModalHeader toggle={toggleModal}>
          {IntlService.m("Reject Reason")}
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
          {loading ? (
            <Spinner size="lg" />
          ) : (
            <Input
              type="textarea"
              value={inputValue}
              onChange={handleInputChange}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              if (inputValue != "") {
                SubmitAction("rejected", true);
                setModalOpen(false);
              } else {
                toast.error(IntlService.m("Please fill the Reject Reason!"));
              }
            }}
            disabled={loading}
          >
            {IntlService.m("Submit")}
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            {IntlService.m("Cancel")}
          </Button>
        </ModalFooter>
      </Modal>
      <h3>{IntlService.m("Submission Review")}</h3>

      {!task.is_approved && task.canSeeApprove && (
        <p>
          {IntlService.m(
            "Please review the submission below and select either"
          )}{" "}
          <strong>{IntlService.m("APPROVE")}</strong>
          {IntlService.m(" or ")}
          <strong>{IntlService.m("REJECTED")}</strong>
        </p>
      )}

      <div className="submission-details">
        <div className="head">
          <div className="title">
            <p className="label">{IntlService.m("Submitted By")}</p>{" "}
            <p className="value">{task.user.name}</p>
          </div>
          {task.canSeeApprove && (
            <div className="approval-buttons">
              <ButtonGreen
                title="Approve"
                onClick={() => SubmitAction("approved")}
                icon={loading && <Spinner size="sm" />}
              />
              <ButtonGreenOutline
                title="Reject"
                onClick={() => {
                  toggleModal();
                }}
              />
            </div>
          )}
        </div>
        <div className="center-content">
          <div>
            <p className="label">{IntlService.m("Start Date")}</p>
            <p className="value">{moment(task.start_date).format("llll")}</p>
          </div>
          <div>
            <p className="label">{IntlService.m("Submitted Date")}</p>
            <p className="value">
              {moment(task.submitted_date).format("llll")}
            </p>
          </div>

          <div>
            <p className="label">{IntlService.m("Steps")}</p>
            <p className="steps">
              {task.steps.map((step, index) => {
                return (
                  <p key={index} className="step">
                    {IntlService.m(step.label)}
                  </p>
                );
              })}
            </p>
          </div>
          <div>
            <p className="label">{IntlService.m("Status")}</p>
            <p className="m-0">
              <span
                className={`badge ${task.status || "text-black"} `}
                style={{ fontWeight: 600 }}
              >
                {" "}
                {IntlService.m(startCase(task.status) || "N/A")}
                {}
              </span>
            </p>
          </div>
        </div>
        <div className="center-content">
          <Signature task={task["task:identification"]} />
        </div>

        {!!rejectedResons?.length && (
          <div className="center-content d-flex justify-content-start flex-column">
            <p className="label">{IntlService.m("Reject Reason")}</p>
            {rejectedResons.map((his, i) => {
              return (
                <>
                  <p className="value">
                    {i + 1}) {his.reason}
                  </p>
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(SubmissionReview);
