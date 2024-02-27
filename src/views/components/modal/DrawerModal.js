// ** React Imports
import { useState } from "react";

// ** Third Party Components
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { User, Briefcase, Mail, Calendar, DollarSign, X } from "react-feather";

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
  Col,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";

const DrawerModal = ({ open, handleModal }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date());

  const devOptions = [
    { value: "Anas", label: "Anas" },
    { value: "Usman", label: "Usman" },
    { value: "Hamza", label: "Hamza" },
  ];

  const bdOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  );

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">New Project</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <div className="mb-1">
          <Label className="form-label" for="full-name">
            Project Name
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id="full-name" placeholder="Bruce Wayne" />
          </InputGroup>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="salary">
            Project Budget
          </Label>
          <InputGroup>
            <InputGroupText>
              <DollarSign size={15} />
            </InputGroupText>
            <Input type="number" id="salary" />
          </InputGroup>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="joining-date">
            BD
          </Label>
          <Select
            isMulti
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={devOptions}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="joining-date">
            Developers
          </Label>
          <Select
            isMulti
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={devOptions}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="joining-date">
            Joining Date
          </Label>
          <InputGroup>
            <InputGroupText>
              <Calendar size={15} />
            </InputGroupText>
            <Flatpickr
              className="form-control"
              id="joining-date"
              value={Picker}
              onChange={(date) => setPicker(date)}
            />
          </InputGroup>
        </div>
        <Button className="me-1" color="primary" onClick={handleModal}>
          Submit
        </Button>
        <Button color="secondary" onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default DrawerModal;
