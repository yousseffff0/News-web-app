import Navbar from "../UI/navbarJournalist/navbar";

const Layout = (props) =>{
    return (
        <>
          <header>
            <Navbar />
          </header>
          <main className="flex flex-col justify-center items-center p-10">
            {props.children}
          </main>
        </>
    );
};

export default Layout;