import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { gsap } from 'gsap';
import './LandingPage.css'

const LandingPage = () => {
    const navigate = useNavigate();

    const titleRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
        );

        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, delay: 0.5, duration: 1, ease: 'power4.out' }
        );

        gsap.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, delay: 1, duration: 1, ease: 'power4.out' }
        );
    }, []);

    return (
        <body>

            <Container className='bg' maxWidth="md" sx={{ mt: 20, textAlign: 'center' }} style={{ background: "none" }}>
                <Box style={{ background: "none", marginBottom: "30px" }}>
                    <Typography
                        ref={titleRef}
                        variant="h2"
                        component="h1"
                        className='gradient-text'
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontFamily: 'Poppins, sans-serif',
                            background: 'linear-gradient(90deg, #FF6F61, #6B3FA0, #29ABE2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            display: 'inline-block',
                        }}
                    >
                        Automated Code Refactoring Tool
                    </Typography>


                    <Typography
                        ref={textRef}
                        variant="body1"
                        marginTop='20'
                        sx={{
                            mb: 4,
                            color: '#333',
                            fontSize: '1.1rem',
                            fontFamily: 'Poppins, sans-serif',
                            lineHeight: '1.6',
                            letterSpacing: '0.02em',
                            maxWidth: '800px',
                            margin: '0 auto',
                        }}
                    >
                        Welcome to the future of coding efficiency! The Automated Code Refactoring Tool helps you instantly optimize your code across multiple languages. Whether you're working with JavaScript, Python, Java, C#, or C++, this tool simplifies the task of making your code cleaner, more efficient, and easier to maintain.
                    </Typography>

                </Box>
                <Button
                    ref={buttonRef}
                    variant="contained"
                    onClick={() => navigate('/refactor')}
                    sx={{
                        px: 4,
                        py: 2,
                        fontSize: '1.2rem',
                        fontFamily: 'Poppins, sans-serif',
                        backgroundColor: '#1976d2',
                        textTransform: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
                        ':hover': {
                            backgroundColor: '#1565c0',
                            transform: 'translateY(-2px)', // Button lifts up on hover
                            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                        },
                        ':active': {
                            backgroundColor: '#0d47a1',
                            transform: 'translateY(2px)', // Button goes down on click
                            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Decrease shadow on click
                        },
                    }}
                >
                    Get Started
                </Button>


            </Container >
        </body>
    );
}

export default LandingPage;
