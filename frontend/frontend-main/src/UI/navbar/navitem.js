import { NavLink } from "react-router-dom";

const Navitem = (props) =>{
    return (
        <li className="text-white hover:text-gray-300">
          <NavLink
            to={props.to}
            className="py-2 px-4 font-semibold transition duration-300"
            activeClassName="border-b-2 border-white"
          >
            {props.children}
          </NavLink>
        </li>
    );
};

export default Navitem;