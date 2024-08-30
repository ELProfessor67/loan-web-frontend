import React from 'react'

const Footer = () => {
    return (
        <>
            <footer>
                {/* Footer Start*/}
                <div className="footer-area">
                    <div className="container">
                        <div className="footer-top footer-padding">
                            <div className="row justify-content-between">
                                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-footer-caption mb-50">
                                        <div className="single-footer-caption mb-30">
                                            {/* logo */}
                                            <div className="footer-logo">
                                                <a href="index.html">
                                                    <img src="/assets/img/logo/logo2_footer.png" alt="" />
                                                </a>
                                            </div>
                                            <div className="footer-pera">
                                                <p>
                                                    Heaven fruitful doesn't over lesser days appear creeping
                                                    seasons so behold bearing
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>Quick Link</h4>
                                            <ul>
                                                <li>
                                                    <a href="#">About</a>
                                                </li>
                                                <li>
                                                    <a href="#">Offers &amp; Discounts</a>
                                                </li>
                                                <li>
                                                    <a href="#">Get Coupon</a>
                                                </li>
                                                <li>
                                                    <a href="#"> Contact Us</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>New Products</h4>
                                            <ul>
                                                <li>
                                                    <a href="#">Woman Cloth</a>
                                                </li>
                                                <li>
                                                    <a href="#">Fashion Accessories</a>
                                                </li>
                                                <li>
                                                    <a href="#">Man Accessories</a>
                                                </li>
                                                <li>
                                                    <a href="#">Rubber made Toys</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>Support</h4>
                                            <ul>
                                                <li>
                                                    <a href="#">Frequently Asked Questions</a>
                                                </li>
                                                <li>
                                                    <a href="#">Terms &amp; Conditions</a>
                                                </li>
                                                <li>
                                                    <a href="#"> Privacy Policy</a>
                                                </li>
                                                <li>
                                                    <a href="#">Report a Payment Issue</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="col-xl-9 col-lg-8">
                                    <div className="footer-copy-right">
                                        <p>
                                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                            Copyright © All rights reserved | This template is made with{" "}
                                            <i className="fa fa-heart" aria-hidden="true" /> by{" "}
                                            <a href="https://colorlib.com" target="_blank">
                                                Colorlib
                                            </a>
                                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4">
                                    {/* Footer Social */}
                                    <div className="footer-social f-right">
                                        <a href="#">
                                            <i className="fab fa-twitter" />
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                        <a href="#">
                                            <i className="fas fa-globe" />
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-instagram" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer End*/}
            </footer>
            {/* Scroll Up */}
            <div id="back-top">
                <a title="Go to Top" href="#">
                    {" "}
                    <i className="fas fa-level-up-alt" />
                </a>
            </div>
        </>
    )
}

export default Footer