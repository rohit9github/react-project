import { Link } from "react-router-dom";



function Navbar() {


    return (
        <>
            <header className="py-4">
                <div style={{ maxWidth: "1320px", margin: "0  auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <a href="javascript:void(0)" className="logo">Logo</a>
                        <nav>
                            <ul style={{ display: "flex", listStyle: "none" }}>
                                <li>
                                    <Link to={"/"} style={{ display: "inline-block", marginLeft: "18px" }}>Home</Link>
                                </li>
                                <li>
                                    <Link to={"/view"} style={{ display: "inline-block", marginLeft: "18px" }}>View</Link>
                                </li>
                                <li>
                                    <Link to={"/signup"} style={{ display: "inline-block", marginLeft: "18px" }}>SignUp</Link>
                                </li>
                                <li>
                                    <Link to={"/login"} style={{ display: "inline-block", marginLeft: "18px" }}>Login</Link>
                                </li>
                                {/* <li>
                                    <Link to={"/demo"} style={{ display: "inline-block", marginLeft: "18px" }}>Demo</Link>
                                </li> */}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar;