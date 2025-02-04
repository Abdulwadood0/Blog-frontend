import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import Navbar from "./Navbar";
import HeaderRigth from "./HeaderRight";

const Header = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <header className="header">

            <HeaderLeft toggle={toggle} setToggle={setToggle} />

            <Navbar toggle={toggle} setToggle={setToggle} />

            <HeaderRigth />


        </header>
    )
}

export default Header;