import moment from "moment";
import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
} from "reactstrap";
import ButtonGreen from "../../../../components/buttons/ButtonGreen";
import { observer } from "mobx-react";

function HistoryModal({ modal, toggle, taskSelected }) {
  return (
    <Modal isOpen={modal} toggle={toggle} unmountOnClose={true}>
      <ModalHeader toggle={toggle}>History</ModalHeader>
      <ModalBody>
        {taskSelected?.map((his) => {
          return (
            <div className="task-history">
              <p className="time">{moment(his.created_at).format("ll")}</p>
              <p className="message">
                {his.message}
                {/* {!!his.reason && (
                  <>
                    <UncontrolledTooltip
                      placement="top"
                      target={"id" + his._id}
                    >
                    </UncontrolledTooltip>
                    <span
                      style={{ color: "red", marginLeft: 10 }}
                      id={"id" + his._id}
                    >
                      Message
                    </span>
                  </>
                )} */}
              </p>
            </div>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <ButtonGreen onClick={toggle} title="Close" />
      </ModalFooter>
    </Modal>
  );
}

export default observer(HistoryModal);
