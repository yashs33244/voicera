import LanguageDropdown from "@/components/elements/LanguageDropdown"
import Link from "next/link"
import Sidebar from "../Sidebar"

export default function Header2({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <header>
                <div id="header-fixed-height" />
                <div className="header-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header-top-content text-center">
                                    <p>Sign up and receive 20% bonus discount on checkout. <Link href="/contact">Learn more <i className="far fa-angle-right" /></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sticky-header" className="menu-area menu-area-two">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="mobile-nav-toggler" onClick={handleMobileMenu}><i className="fas fa-bars" /></div>
                                <div className="menu-wrap">
                                    <nav className="menu-nav">
                                        <div className="logo">
                                            <Link href="/"><img src="/assets/img/logo/logo02.png" alt="Logo" /></Link>
                                        </div>
                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <ul className="navigation">
                                                <li className="active menu-item-has-children tg-mega-menu-has-children"><Link href="#">Home</Link>
                                                    <div className="tg-mega-menu-wrap">
                                                        <div className="row row-cols-1 row-cols-lg-4 row-cols-xl-4">
                                                            <div className="col">
                                                                <div className="mega-menu-item">
                                                                    <div className="mega-menu-thumb">
                                                                        <Link href="/"><img src="/assets/img/images/home_img01.jpg" alt="" /></Link>
                                                                    </div>
                                                                    <div className="mega-menu-content">
                                                                        <h4 className="title"><Link href="/">01: Ai Content Writer</Link></h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="mega-menu-item active">
                                                                    <div className="mega-menu-thumb">
                                                                        <Link href="/index-2"><img src="/assets/img/images/home_img02.jpg" alt="" /></Link>
                                                                    </div>
                                                                    <div className="mega-menu-content">
                                                                        <h4 className="title"><Link href="/index-2">02: Text to Video Ai</Link></h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="mega-menu-item">
                                                                    <div className="mega-menu-thumb">
                                                                        <Link href="/index-3"><img src="/assets/img/images/home_img03.jpg" alt="" /></Link>
                                                                    </div>
                                                                    <div className="mega-menu-content">
                                                                        <h4 className="title"><Link href="/index-3">03:Text to Speech Ai</Link></h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="mega-menu-item">
                                                                    <div className="mega-menu-thumb">
                                                                        <img src="/assets/img/images/coming_soon.jpg" alt="" />
                                                                    </div>
                                                                    <div className="mega-menu-content">
                                                                        <h4 className="title">04: Coming Soon</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li><Link href="/about">About Us</Link></li>
                                                <li className="menu-item-has-children"><Link href="#">Pages</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link href="/work">How It Work</Link></li>
                                                        <li><Link href="/faq">Faq Page</Link></li>
                                                        <li><Link href="/help">Help Center</Link></li>
                                                        <li><Link href="/job">Job Page</Link></li>
                                                        <li><Link href="/job-details">Job Details</Link></li>
                                                        <li><Link href="/login">Login Page</Link></li>
                                                        <li><Link href="/404">404 Error Page</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item-has-children"><Link href="#">News</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link href="/blog">Our Blog</Link></li>
                                                        <li><Link href="/blog-details">Blog Details</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link href="/contact">contacts</Link></li>
                                            </ul>
                                        </div>
                                        <div className="header-action d-none d-md-block">
                                            <ul className="list-wrap">
                                                <li className="header-lang">
                                                    <LanguageDropdown />
                                                </li>
                                                <li className="header-btn"><Link href="/login" className="btn">sign up</Link></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                {/* Mobile Menu  */}
                                <div className="mobile-menu">
                                    <nav className="menu-box">
                                        <div className="close-btn" onClick={handleMobileMenu}><i className="fas fa-times" /></div>
                                        <div className="nav-logo">
                                            <Link href="/"><img src="/assets/img/logo/logo02.png" alt="Logo" /></Link>
                                        </div>
                                        <div className="menu-outer">
                                            <Sidebar />
                                        </div>
                                        <div className="social-links">
                                            <ul className="clearfix list-wrap">
                                                <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-youtube" /></Link></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="menu-backdrop" onClick={handleMobileMenu} />
                                {/* End Mobile Menu */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
