import { Link } from "react-router-dom";



function Navbar() {

    
    return (
        <>
            <header>
            <div style={{maxWidth:"1320px" , margin:"0  auto"}}>
            <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
                <a href="javascript:void(0)" className="logo">Logo</a>
                <nav>
                    <ul style={{display:"flex",listStyle:"none"}}>
                        <li>
                            <Link to={"/"} style={{display:"inline-block", marginLeft:"18px"}}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/about"} style={{display:"inline-block", marginLeft:"18px"}}>About</Link>
                        </li>
                        <li>
                            <Link to={"/contact"} style={{display:"inline-block", marginLeft:"18px"}}>Contact</Link>
                        </li>
                        <li>
                            <Link to={"/login"} style={{display:"inline-block", marginLeft:"18px"}}>Login</Link>
                        </li>
                        <li>
                            <Link to={"/signup"} style={{display:"inline-block", marginLeft:"18px"}}>Sign-Up</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            </div>
            </header>
        </>
    )
}

export default Navbar;