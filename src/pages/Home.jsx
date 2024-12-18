import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import checkAuth from "../hoc/checkAuth";
import images from "../utils/index";

import {
    faArrowUp,
    faEnvelope,
    faPhone,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navigation from "../../src/components/Navigation";
import BookingForm from "../components/BookingForm";
import MyRating from "../components/MyRating";
import MockupSection from "../components/MockupSection";
import AboutUs from "../components/AboutUs";

function Home() {
    const [scrollVisible, setScrollVisible] = useState(false);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleScrollUpButton = () => {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                setScrollVisible(true);
            } else {
                setScrollVisible(false);
            }
        };

        const handleScroll = () => {
            toggleScrollUpButton();
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const [displayedText, setDisplayedText] = useState("");
    /**
     * Display text one by one
     */
    useEffect(() => {
        const text = "Villa Aurora Private Resort";
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            if (i == text.length - 1) {
                clearInterval(interval);
            }
            i++;
        }, 100);
    }, []);

    return (
        <Box id="homebg">
            <Navigation />
            {/* Navigation */}

            <Box>
                <Button
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        zIndex: "999",
                        color: "white",
                        display: scrollVisible ? "block" : "none",
                    }}
                    id="scroll-to-top"
                    onClick={handleScrollToTop}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </Button>
                {/* Hero Section */}
                <section
                    id="section_1"
                    className="hero-section d-flex justify-content-center align-items-center"
                >
                    <Box className="container">
                        <Box className="row">
                            <Box className="col-lg-8 col-12">
                                <h1
                                    style={{
                                        color: "#fff",
                                        textShadow: "2px 2px 0 black",
                                    }}
                                >
                                    {displayedText}
                                </h1>
                                <Typography
                                    style={{
                                        color: "black",
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                    }}
                                    className="mb-2"
                                >
                                    Don't miss out! Reserve your spot at our
                                    luxurious resort today.
                                </Typography>

                                <a
                                    href="#about-us"
                                    className="custom-btn custom-border-btn custom-btn-bg-white smoothscroll me-2 mb-2"
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "20px",
                                    }}
                                >
                                    About Us
                                </a>

                                <a
                                    href="#section_3"
                                    className="custom-btn smoothscroll mb-2"
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "20px",
                                    }}
                                >
                                    What we have
                                </a>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="custom-block d-lg-flex flex-column justify-content-center align-items-center">
                        <img
                            src={images.bgmockup}
                            className="custom-block-image"
                            alt="Background"
                        />

                        <Typography variant="h4" className="text-white sz-20px">
                            <strong>Reserve your spot at paradise.</strong>
                        </Typography>

                        <a
                            href="#booking-section"
                            className="smoothscroll btn custom-btn-italic mt-3 custom-btn"
                        >
                            Make a Reservation
                        </a>
                    </Box>
                </section>

                {/* Service Section */}
                <section
                    className="service-section section-padding"
                    id="section_2"
                >
                    <Box className="container">
                        <Box className="row">
                            <Box className="col-lg-12 col-12 mx-auto">
                                <Typography
                                    variant="h2"
                                    className="mb-4"
                                    style={{ fontFamily: "Lobster" }}
                                >
                                    Services
                                </Typography>

                                <Box className="border-bottom pb-3 mb-5">
                                    <p>
                                        Perfect place for you to{" "}
                                        <strong>
                                            rest, relax, recharge, and enjoy!
                                        </strong>
                                    </p>
                                    <p>
                                        Also, celebrate birthdays, baptisms,
                                        weddings, reunions, and other special
                                        occasions with us. We are located in
                                        Angono, Rizal.
                                    </p>
                                </Box>
                            </Box>

                            <Box className="col-lg-5 col-12 custom-block-bg-overlay-wrap me-lg-5 mb-5 mb-lg-0">
                                <img
                                    src={images.catering}
                                    className="custom-block-bg-overlay-image"
                                    alt="Catering"
                                />

                                <Box className="service-info d-flex align-items-center flex-wrap">
                                    <p className="mb-0 font-weight-bold">
                                        Birthday
                                    </p>
                                </Box>
                            </Box>

                            <Box className="col-lg-5 col-12 custom-block-bg-overlay-wrap mt-4 mt-lg-0 mb-5 mb-lg-0">
                                <img
                                    src={images.event}
                                    className="custom-block-bg-overlay-image"
                                    alt="Event"
                                />

                                <Box className="service-info d-flex align-items-center flex-wrap">
                                    <p className="mb-0 font-weight-bold">
                                        Wedding
                                    </p>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </section>

                {/* Mockup Section */}
                <MockupSection />

                {/* Features Section */}
                <section
                    className="features-section section-padding"
                    id="section_3"
                >
                    <Box className="container">
                        <Box className="row">
                            <Box className="col-lg-12 col-12">
                                <Typography
                                    variant="h2"
                                    className="mb-5"
                                    style={{ fontFamily: "Lobster" }}
                                >
                                    Features
                                </Typography>
                            </Box>

                            <Box className="col-lg-6 col-12 mb-4">
                                <Box className="features-thumb">
                                    <img
                                        src={images.room}
                                        className="service-image img-fluid"
                                        alt="Event"
                                    />

                                    <Box className="features-info d-flex align-items-end">
                                        <h4 className="mb-0">Bedroom</h4>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="col-lg-6 col-12 mb-4">
                                <Box className="features-thumb">
                                    <img
                                        src={images.karaoke}
                                        className="service-image img-fluid"
                                        alt="Event"
                                    />

                                    <Box className="features-info d-flex align-items-end">
                                        <h4 className="mb-0">Karaoke</h4>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="col-lg-6 col-12 mb-4 mb-lg-0">
                                <Box className="features-thumb">
                                    <img
                                        src={images.billiard}
                                        className="service-image img-fluid"
                                        alt="Event"
                                    />

                                    <Box className="features-info d-flex align-items-end">
                                        <h4 className="mb-0">Billiards</h4>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="col-lg-6 col-12">
                                <Box className="features-thumb">
                                    <img
                                        src={images.kiddiepool}
                                        className="service-image img-fluid"
                                        alt="Event"
                                    />

                                    <Box className="features-info d-flex align-items-end">
                                        <h4 className="mb-0">Kiddiepool</h4>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </section>
                <AboutUs />
                {/* Booking Form */}
                <BookingForm />
                <MyRating />

                {/* Price Section */}
                <section
                    className="price-list-section section-padding"
                    id="section_4"
                >
                    <Box className="container">
                        <Box className="row">
                            {/* Price List */}
                            <Box className="col-lg-8 col-12">
                                <Box className="price-list-thumb-wrap">
                                    <Box className="mb-4">
                                        <Typography
                                            variant="h2"
                                            className="mb-2"
                                            style={{ fontFamily: "Lobster" }}
                                        >
                                            Price List
                                        </Typography>
                                    </Box>

                                    <Box className="price-list-thumb">
                                        <h6 className="price-fontweight-bold">
                                            10 hour stay: P3,000
                                        </h6>
                                    </Box>

                                    <Box className="price-list-thumb ">
                                        <h6 className="price-fontweight-bold">
                                            22 hours stay: P5,000
                                        </h6>
                                    </Box>

                                    {/* New additional price entries */}
                                    <Box className="price-list-thumb ">
                                        <h6 className="price-fontweight-bold">
                                            5 hour stay: P1,500
                                        </h6>
                                    </Box>

                                    <Box className="price-list-thumb ">
                                        <h6 className="price-fontweight-bold">
                                            15 hour stay: P3,750
                                        </h6>
                                    </Box>

                                    <Box className="price-list-thumb ">
                                        <h6 className="price-fontweight-bold">
                                            1 day (24 hours): P6,500
                                        </h6>
                                    </Box>

                                    <Box className="price-list-thumb ">
                                        <h6 className="price-fontweight-bold">
                                            2 hours stay: P1,000
                                        </h6>
                                    </Box>

                                    <Box className="price-list-thumb ">
                                        <h6 className="price-fontweight-bold">
                                            8 hour stay: P2,400
                                        </h6>
                                    </Box>

                                    <Box className="price-list-thumb ">
                                        <h6 className="price-fontweight-bold">
                                            3 hour stay: P1,200
                                        </h6>
                                    </Box>

                                    <Box className="price-list-thumb ">
                                        <h6 className="price-fontweight-bold">
                                            30 hour stay: P7,500
                                        </h6>
                                    </Box>

                                    <Box className="price-list-thumb mb-5">
                                        <h6 className="price-fontweight-bold">
                                            12 hour stay: P4,000
                                        </h6>
                                    </Box>
                                </Box>
                            </Box>

                            {/* ============================== */}
                            <Box className="col-lg-4 col-12 custom-block-bg-overlay-wrap mt-5 mb-5 mb-lg-0 mt-lg-0 pt-3 pt-lg-0">
                                <img
                                    src={images.balcony}
                                    className="custom-block-bg-overlay-image img-fluid"
                                    alt="balcony"
                                />
                            </Box>
                        </Box>
                    </Box>
                </section>

                {/* Contact Section */}
                <section className="contact-section" id="section_5">
                    <Box className="section-padding">
                        <Box className="container">
                            <Box className="row">
                                <Box className="col-lg-6 col-12">
                                    <Typography
                                        variant="h2"
                                        className="mb-3"
                                        style={{ fontFamily: "Lobster" }}
                                    >
                                        Contact Us
                                    </Typography>

                                    <Box>
                                        <Box>
                                            <ul className="list-info">
                                                <li>
                                                    <Link to="tel:+639453200320">
                                                        <FontAwesomeIcon
                                                            icon={faPhone}
                                                            className="text-black margin-right-10"
                                                        />
                                                        0945 3200 320
                                                    </Link>
                                                    <span className="margin-left-10">
                                                        (Globe)
                                                    </span>
                                                </li>
                                                <li>
                                                    <Link to="tel:+639955185002">
                                                        <FontAwesomeIcon
                                                            icon={faPhone}
                                                            className="text-black margin-right-10"
                                                        />
                                                        0995 5185 002
                                                    </Link>
                                                    <span className="margin-left-10">
                                                        (Globe/Viber)
                                                    </span>
                                                </li>
                                                <li>
                                                    <Link to="example@gmail.com">
                                                        <FontAwesomeIcon
                                                            icon={faEnvelope}
                                                            className="text-black margin-right-10"
                                                        />
                                                        villaarurora@gmail.com
                                                    </Link>
                                                    <span className="margin-left-10">
                                                        (Email)
                                                    </span>
                                                </li>
                                            </ul>
                                        </Box>
                                    </Box>

                                    <ul className="social-icon d-flex flex-wrap list-unstyled p-0 m-0">
                                        <li className="social-icon-item me-2 mb-2">
                                            <Link
                                                className="social-icon-link"
                                                to="https://www.facebook.com/profile.php?id=100070173077878"
                                            >
                                                <i className="fab fa-facebook-f"></i>
                                            </Link>
                                        </li>

                                        <li className="social-icon-item me-2 mb-2">
                                            <Link
                                                href="#"
                                                className="social-icon-link"
                                            >
                                                <i className="fab fa-twitter"></i>
                                            </Link>
                                        </li>

                                        <li className="social-icon-item me-2 mb-2">
                                            <Link
                                                href="#"
                                                className="social-icon-link"
                                            >
                                                <i className="fab fa-instagram"></i>
                                            </Link>
                                        </li>

                                        <li className="social-icon-item me-2 mb-2">
                                            <Link
                                                href="#"
                                                className="social-icon-link"
                                            >
                                                <i className="fab fa-youtube"></i>
                                            </Link>
                                        </li>
                                    </ul>

                                    <Box className="col-lg-9 col-12 contact-block-wrap mt-lg-0  pt-4 pt-lg-0 mx-auto">
                                        <Box className="contact-block mt-1">
                                            <Typography
                                                variant="h6"
                                                className="mb-0 text-black"
                                                style={{
                                                    fontFamily: "Quicksand",
                                                }}
                                            >
                                                <Box className="custom-icon">
                                                    <i className="fas fa-store"></i>
                                                </Box>
                                                Open Daily{" "}
                                                <span className="ms-auto">
                                                    10:00 AM - 8:00 PM,{" "}
                                                </span>
                                                <span>
                                                    Located at: Angono,
                                                    Calabarzon, Philippines
                                                </span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="col-lg-5 col-12 mt-5 mt-lg-0 pt-4 pt-lg-0 mx-auto">
                                    <Box className="iframe-container">
                                        <iframe
                                            className="google-map"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.135607282014!2d121.1004689148258!3d14.533207089826607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c75ea60f9533%3A0x5c7ae1dbd8f8ab5a!2sVilla%20Aurora%20Private%20Resort%2C%20G4MR%2B7P2%2C%20Lakeview%20subd%20Baytown%20Coastal%20Road%2C%201930%20Rizal!5e0!3m2!1sen!2sph!4v1647605421232!5m2!1sen!2sph"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            id="google-iframe"
                                        ></iframe>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </section>
            </Box>
        </Box>
    );
}

export default checkAuth(Home);
