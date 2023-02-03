import React, { useState } from "react";

import {
  FormGroup,
  Input,
  Button,
  Form,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
} from "reactstrap";

import { v4 } from "uuid";

//redux
import { connect } from "react-redux";
import { addEvent } from "../action/operation";

const eventIteamsModal = {
  id: "",
  vehicleType: "Van",
  grace: 0,
  uom: "hours",
  amount: 0,
};

const EventForm = ({ addEvent }) => {
  const [eventIteam, setEventIteam] = useState(eventIteamsModal);
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    vehicleType: false,
    uom: false,
  });

  //handles
  const handleDropDown = (e) => {
    setEventIteam({
      ...eventIteam,
      [e.target.getAttribute("data-type")]: e.currentTarget.textContent,
    });
  };
  const handleInput = (e) => {
    setEventIteam({ ...eventIteam, [e.target.name]: e.target.value });
  };
  const togglePopup = () => setModal((prevState) => !prevState);
  const toggleVehicleTypeDropdown = () =>
    setDropdownOpen((prevState) => ({
      ...prevState,
      vehicleType: !prevState.vehicleType,
    }));
  const toggleUomDropdown = () =>
    setDropdownOpen((prevState) => ({ ...prevState, uom: !prevState.uom }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventIteam.vehicleType === "Dropdown") {
      return alert("Please Add event");
    }
    setEventIteam((eventIteam["id"] = v4()));
    addEvent(eventIteam);
    setEventIteam(eventIteamsModal);
    togglePopup();
  };

  return (
    <section className="container">
      <Button color="primary" onClick={togglePopup}>
        Add
      </Button>
      <Modal isOpen={modal} toggle={togglePopup} centered={true} size={"lg"}>
        <ModalBody className="px-5 py-4">
          <h4>Add Event</h4>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="container ">
              <div className="row row-cols-3">

{/* Vahicle Type input*/}
                <div className="col  text-sm-left  p-2">
                  <Label>Vahicle Type</Label>
                  <Dropdown
                  
                    isOpen={dropdownOpen.vehicleType}
                    toggle={toggleVehicleTypeDropdown}
                    direction={"down"}
                  >
                    <DropdownToggle caret>
                      {eventIteam.vehicleType}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={handleDropDown}
                        data-type="vehicleType"
                      >
                        Taxi
                      </DropdownItem>
                      <DropdownItem
                        onClick={handleDropDown}
                        data-type="vehicleType"
                      >
                        Bus
                      </DropdownItem>
                      <DropdownItem
                        onClick={handleDropDown}
                        data-type="vehicleType"
                      >
                        Ambulance
                      </DropdownItem>
                      <DropdownItem
                        onClick={handleDropDown}
                        data-type="vehicleType"
                      >
                        Dump truck
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

{/* UOM input*/}

                <div className="col d-flex text-sm-left flex-column p-2">
                  <Label>UOM</Label>
                  <Dropdown
                    isOpen={dropdownOpen.uom}
                    toggle={toggleUomDropdown}
                    direction={"down"}
                  >
                    <DropdownToggle caret>{eventIteam.uom}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={handleDropDown} data-type="uom">
                        hours
                      </DropdownItem>
                      <DropdownItem onClick={handleDropDown} data-type="uom">
                        mins
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

{/* Amount input*/}
                <div className="col">
                <label className="inline">Amount</label>
                <InputGroup >
                  <Input
                    type="text"
                    name="amount"
                    placeholder="Your text"
                    value={eventIteam.amount}
                    onChange={(e) => handleInput(e)}
                  />
                </InputGroup>
                </div>

{/* Grace input*/}
                <div className="col">
                  <Label className="inline">Grace</Label>
                  <InputGroup >
                  <Input
                    type="text"
                    name="grace"
                    placeholder="Your text"
                    value={eventIteam.grace}
                    onChange={(e) => handleInput(e)}
                  />
                </InputGroup>
                </div>
              </div>

            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" outline onClick={handleSubmit} className="rounded-pill py-2 px-3 mx-4">
            Done
          </Button>
          <Button color="primary" outline onClick={togglePopup} className='rounded-pill py-2 px-3'>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatachToProps = (dispatch) => ({
  addEvent: (eventIteam) => dispatch(addEvent(eventIteam)),
});

export default connect(mapStateToProps, mapDispatachToProps)(EventForm);
