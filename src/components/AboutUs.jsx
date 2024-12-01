import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import images from "../utils/index";

// Helper function to observe visibility of elements
const useOnScreen = (options) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, options);

        const element = document.querySelector(`#${options.targetId}`);
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [options]);

    return isVisible;
};

const AboutUs = () => {
    const [paragraph1Visible, setParagraph1Visible] = useState(false);
    const [paragraph2Visible, setParagraph2Visible] = useState(false);
    const [paragraph3Visible, setParagraph3Visible] = useState(false);

    // Use hooks to set visibility states
    const isParagraph1Visible = useOnScreen({
        targetId: "paragraph1",
        rootMargin: "0px 0px -100px 0px",
    });
    const isParagraph2Visible = useOnScreen({
        targetId: "paragraph2",
        rootMargin: "0px 0px -100px 0px",
    });
    const isParagraph3Visible = useOnScreen({
        targetId: "paragraph3",
        rootMargin: "0px 0px -100px 0px",
    });

    useEffect(() => {
        setParagraph1Visible(isParagraph1Visible);
        setParagraph2Visible(isParagraph2Visible);
        setParagraph3Visible(isParagraph3Visible);
    }, [isParagraph1Visible, isParagraph2Visible, isParagraph3Visible]);

    return (
        <Container maxWidth="lg" className="mb-5" id="about-us">
            <hr />
            <Box className="text-center mb-3 mt-5">
                <Typography
                    variant="h2"
                    className="mb-3 pt-5"
                    style={{ fontFamily: "Lobster" }}
                >
                    About Us
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Learn more about our story, mission, and values.
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className="p-3">
                        <img
                            src={images.aboutImage}
                            alt="Placeholder Image"
                            className="img-fluid rounded"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className="p-3">
                        <Typography variant="h5" className="mb-2">
                            Our Story
                        </Typography>
                        <Typography
                            id="paragraph1"
                            variant="body1"
                            paragraph
                            style={{
                                opacity: paragraph1Visible ? 1 : 0,
                                transition: "opacity 0.5s ease-in-out",
                            }}
                        >
                            We started our journey with a simple mission: to
                            bring people together and create memorable
                            experiences. With a passion for quality, service,
                            and a dedication to making every interaction
                            special, we built our foundation on trust,
                            innovation, and community.
                        </Typography>
                        <Typography
                            id="paragraph2"
                            variant="body1"
                            paragraph
                            style={{
                                opacity: paragraph2Visible ? 1 : 0,
                                transition: "opacity 0.5s ease-in-out 0.2s",
                            }}
                        >
                            From our humble beginnings, we’ve grown into a team
                            that thrives on collaboration, creativity, and the
                            desire to make a positive impact. Our commitment to
                            excellence is reflected in everything we do, whether
                            it's providing top-notch service or supporting local
                            initiatives.
                        </Typography>
                        <Typography
                            id="paragraph3"
                            variant="body1"
                            style={{
                                opacity: paragraph3Visible ? 1 : 0,
                                transition: "opacity 0.5s ease-in-out 0.4s",
                            }}
                        >
                            We believe in a future where every person feels
                            valued and every experience leaves a lasting
                            impression. Join us as we continue to build a legacy
                            of trust, warmth, and unforgettable moments.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <hr />
        </Container>
    );
};

export default AboutUs;
