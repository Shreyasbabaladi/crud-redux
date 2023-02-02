import React,{useState} from 'react'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

 const DropDown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState('Dropdown');
    
    const handleDropDown = e => {setDropDownValue(e.currentTarget.textContent)}  
    const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="d-flex p-5">
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
      <DropdownToggle caret >{dropDownValue}</DropdownToggle>
      <DropdownMenu >
        <DropdownItem onClick={handleDropDown} data-drop='vehical'>Header</DropdownItem>
        <DropdownItem onClick={handleDropDown}>Some Action</DropdownItem>
        <DropdownItem onClick={handleDropDown}>Dropdown Item Text</DropdownItem>
        <DropdownItem onClick={handleDropDown}>Action </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </div>
);
}

export default DropDown;