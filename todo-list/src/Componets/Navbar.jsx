


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
                            <a href="javascript:void(0)" style={{display:"inline-block", marginLeft:"18px"}}>Home</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" style={{display:"inline-block", marginLeft:"18px"}}>About</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" style={{display:"inline-block", marginLeft:"18px"}}>Contact</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" style={{display:"inline-block", marginLeft:"18px"}}>Login</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" style={{display:"inline-block", marginLeft:"18px"}}>Sign-Up</a>
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