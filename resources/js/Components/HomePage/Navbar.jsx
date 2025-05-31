export default function Navbar() {
    return (
        <header
            id="header"
            className="header d-flex align-items-center fixed-top h-20"
        >
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <a
                    href="index.html"
                    className="logo d-flex align-items-center me-auto"
                >
                    {/* Uncomment the line below if you also wish to use an image logo */}
                    <img src="images/logo.png" alt="LOGO"/>
                    {/* <span className="text-3xl font-extrabold">
                        SMART EXAM
                    </span> */}
                </a>
                <nav id="navmenu" className="navmenu flex-grow-1 d-flex justify-content-center">
                    <ul className="d-flex justify-content-center align-items-center gap-2">
                        <li>
                            <a href="#hero" className="active">
                                Home
                                <br />
                            </a>
                        </li>
                        <li>
                            <a href="#keunggulan">Keunggulan</a>
                        </li>
                        <li>
                            <a href="#fitur">Fitur</a>
                        </li>
                        <li>
                            <a href="#clients">Clients</a>
                        </li>                        
                        <li>
                            <a href="#testimonials">Testimoni</a>
                        </li>
                        <li className="dropdown">
                            <a href="#">
                                <span>Bantuan</span>{" "}
                                <i className="bi bi-chevron-down toggle-dropdown" />
                            </a>
                            <ul>
                                <li>
                                    <a href="#">Dropdown 1</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/login">Login</a>
                        </li>
                    </ul>
                    <i className="mobile-nav-toggle d-xl-none bi bi-list" />
                </nav>
                <a
                    className="btn-getstarted flex-md-shrink-0"
                    href="/konfirmasi"
                >
                    Daftar Sekarang
                </a>
            </div>
        </header>
    );
}