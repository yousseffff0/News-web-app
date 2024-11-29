import Navitem from "./navitem";
import SearchBar from "./SearchBar";

const Navbar = () =>{
    return (
        <nav className="">
          <ul className="flex justify-center items-center space-x-2 p-4">
            <Navitem to="/home">Home</Navitem>
            <Navitem to="/articles">All Articles</Navitem>
            <Navitem to="/profile">Profile</Navitem>
            <SearchBar/>
          </ul>
        </nav>
    );
};

export default Navbar;