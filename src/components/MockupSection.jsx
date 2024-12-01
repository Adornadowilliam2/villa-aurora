import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import images from "../utils/index";
const MockupSection = () => {
    useEffect(() => {
        // Create an observer to observe the image and the typography
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add the appropriate animation class when elements come into view
                        if (entry.target.classList.contains("pose-image")) {
                            entry.target.classList.add("rotate-on-scroll");
                        } else if (
                            entry.target.classList.contains("bounce-text")
                        ) {
                            entry.target.classList.add("bounce-on-scroll");
                        }
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when at least 50% of the element is visible
            }
        );

        // Select the image and typography elements
        const image = document.querySelector(".pose-image");
        const text = document.querySelector(".bounce-text");

        if (image) {
            observer.observe(image);
        }
        if (text) {
            observer.observe(text);
        }

        // Cleanup observer on component unmount
        return () => {
            if (image) {
                observer.unobserve(image);
            }
            if (text) {
                observer.unobserve(text);
            }
        };
    }, []);

    return (
        <section className="mockup-section section-padding">
            <Box className="section-overlay"></Box>
            <Box className="container">
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                    }}
                >
                    <Box>
                        <Typography
                            variant="h2"
                            className="mb-3 text-white bounce-text"
                            style={{ fontFamily: "Lobster" }}
                        >
                            Puro drawing parin ba?
                        </Typography>
                        <Typography>
                            Arat na! Beat the Summer Heat{" "}
                            <FontAwesomeIcon icon={faSun} />
                        </Typography>
                        <a
                            href="https://www.facebook.com/VAPRII/"
                            className="trans-scale text-white"
                        >
                            <strong className="text-black">
                                For inquiries, please check our Facebook page
                                for details.
                            </strong>
                        </a>
                    </Box>
                    <Box>
                        <img
                            src={images.pose}
                            className="pose-image"
                            alt="Pose"
                            width="300px"
                        />
                    </Box>
                </Box>
            </Box>
        </section>
    );
};

export default MockupSection;
