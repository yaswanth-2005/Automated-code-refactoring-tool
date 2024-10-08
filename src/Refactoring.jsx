import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Refactoring = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [refactoredCode, setRefactoredCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const headingRef = useRef(null);
    const buttonRef = useRef(null);
    const outputRef = useRef(null);
    const inputRef = useRef(null);
    const selectRef = useRef(null);
    const labelRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
        );
        gsap.fromTo(
            labelRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
        );
        gsap.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, delay: 1, duration: 1, ease: 'power4.out' }
        );
        gsap.fromTo(
            inputRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, delay: 1, duration: 1, ease: 'power4.out' }
        );
        gsap.fromTo(
            selectRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, delay: 1, duration: 1, ease: 'power4.out' }
        );
    }, []);

    const handleRefactor = async () => {
        if (!code.trim()) {
            setError('Please enter some code to refactor.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/refactor', {
                code,
                language,
            });
            toast.success("Code refactored!");
            setRefactoredCode(response.data.refactoredCode);


            gsap.fromTo(outputRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power4.out' });
        } catch (err) {
            setError('Failed to refactor the code. Please try again.');
            console.error(err);
            toast.error("Refactoring Failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div><Toaster /></div>
            <div className="app-container">
                <IconButton
                    onClick={() => navigate('/')}
                    style={{ position: 'absolute', top: '10px', left: '10px', color: '#000' }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <h1 ref={headingRef}>Automated Code Refactoring Tool</h1>

                <label ref={labelRef} htmlFor="language">Choose Language:</label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    ref={selectRef}
                    className="language-select"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                </select>

                <textarea
                    className="code-input"
                    ref={inputRef}
                    rows="10"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here..."
                />

                <button
                    ref={buttonRef}
                    className="refactor-btn"
                    onClick={handleRefactor}
                    disabled={loading}
                >
                    {loading ? 'Refactoring...' : 'Refactor Code'}
                </button>

                {error && <p className="error">{error}</p>}
                {refactoredCode ? (
                    <>
                        <div className="output-container" ref={outputRef}>
                            <h3>Refactored Code:</h3>
                            <button
                                className='clear-btn'
                                onClick={() =>
                                    navigator.clipboard.writeText(refactoredCode).then(() => toast.success("copied!"))
                                }
                            >
                                Copy
                            </button>
                            <pre className="code-output">{refactoredCode}</pre>
                            <button className='clear-btn' onClick={() => setRefactoredCode('')}>Clear</button>
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Refactoring;
