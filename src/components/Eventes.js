import React, { useState } from "react";
import {
  Table,
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
import { AiFillDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";

//redux
import { connect } from "react-redux";
import { removeEvent, updateEvent } from "../action/operation";

const Eventes = ({ eventIteams, markComplete, updateEvent }) => {
  const [isSelected, selectionHander] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({vehicleType: false,uom: false,});
  const [eventIteam, setEventIteam] = useState({});
  // const [events, setEvents] = useState(eventIteams);

  //handlers
  const togglePopup = () => selectionHander((prevState) => !prevState);
  const handleUpdate = (eventIteam) => {
    setEventIteam(eventIteam);
    togglePopup();
  };
  const handleDropDown = (e) => {setEventIteam({...eventIteam,[e.target.getAttribute("data-type")]: e.currentTarget.textContent,});};

  const handleInput = (e) => {setEventIteam({ ...eventIteam, [e.target.name]: e.target.value });
  };

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
    console.log("updated event" + JSON.stringify(eventIteam));
    updateEvent(eventIteam);
    togglePopup(); 
  };

  // const handleSearch = (e) => {
  //   setEvents(eventIteams.filter ((eventIteam) => eventIteam.vehicleType.includes(e.target.value) ))
  //   console.log(events);
  // }

  return (
    <section className="container">
      {/* <div
        color="primary"
        className="container row bg-primary text-white p-1 px-3 mt-1"
      >
        <div className="col-6">
          <h4> Late Delivery </h4>
        </div>
        <div className="col-lg-3">
          <Form>
            <InputGroup>
              <Input type="text" placeholder="Search Event" onChange={handleSearch}/>
            </InputGroup>
          </Form>
        </div>
      </div> */}
      <Table className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Vehicle Type</th>
            <th>Amount</th>
            <th>Grace</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {eventIteams.map((eventIteam, index) => (
            <tr key={eventIteam.id}>
              <th scope="row">{index}</th>
              <td>{eventIteam.vehicleType}</td>
              <td>{eventIteam.amount}</td>
              <td>{eventIteam.grace}</td>
              <td className="d-flex justify-content-center">
                <span
                  className="float-right m-2"
                  onClick={() => markComplete(eventIteam.id)}
                >
                  <AiFillDelete />
                </span>
                <span
                  className="float-right m-2"
                  onClick={() => handleUpdate(eventIteam)}
                >
                  <TbEdit />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isSelected && (
        <div className="container">
          <Modal isOpen={isSelected} toggle={togglePopup}>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="flex">
                  <div className="d-flex text-sm-left flex-column p-2 ">
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
                          Header
                        </DropdownItem>
                        <DropdownItem
                          onClick={handleDropDown}
                          data-type="vehicleType"
                        >
                          Some Action
                        </DropdownItem>
                        <DropdownItem
                          onClick={handleDropDown}
                          data-type="vehicleType"
                        >
                          Dropdown Item Text
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="d-flex text-sm-left flex-column p-2">
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
                  <InputGroup>
                    <label>Amount</label>
                    <Input
                      type="text"
                      name="amount"
                      placeholder="Your text"
                      value={eventIteam.amount}
                      onChange={(e) => handleInput(e)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>Grace</Label>
                    <Input
                      type="text"
                      name="grace"
                      placeholder="Your text"
                      value={eventIteam.grace}
                      onChange={(e) => handleInput(e)}
                    />
                  </InputGroup>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleSubmit}>
                Done
              </Button>
              <Button color="secondary" onClick={togglePopup}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  eventIteams: state.evenIteams,
});

const mapDispatachToProps = (dispatach) => ({
  markComplete: (id) => {
    dispatach(removeEvent(id));
  },
  updateEvent: (Event) => {
    dispatach(updateEvent(Event));
  },
});

export default connect(mapStateToProps, mapDispatachToProps)(Eventes);