// const express = require('express');
// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
import express from 'express'
// const cohere = require('cohere-ai');
import { CohereClient } from 'cohere-ai';
// require('dotenv').config();
import { configDotenv } from 'dotenv';
import cors from 'cors'

configDotenv();
const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.COHERE_API_KEY)
app.use(cors())

// const co = new cohere.CohereClient(CO_API_KEY)
// cohere.init(process.env.COHERE_API_KEY)

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
})
app.use(bodyParser.json());
app.use(express.json())

app.post('/refactor', async (req, res) => {
    try {
        const { code, language } = req.body;

        if (!code || !language) {
            return res.status(400).json({ error: 'Code and language are required.' });
        }

        const prompt = `Refactor the following ${language} code:\n\n${code}\n\n`;

        const response = await cohere.generate({
            model: 'command',
            prompt: prompt,
            maxTokens: 1000,
            temperature: 0.7,
            // stopSequences: ["\n"]
        });


        const refactoredCode = response.generations[0].text;

        const codeRegex = /```(?:javascript|python|java|c\+\+|c|any_other_language)\n([\s\S]*?)\n```/g;
        const codeMatches = refactoredCode.match(codeRegex);

        if (codeMatches && codeMatches.length > 0) {
            const extractedCode = codeMatches[0];

            const codeWithoutDelimiters = extractedCode.replace(/```/g, '');

            // console.log(codeWithoutDelimiters);
            res.status(200).json({ refactoredCode: codeWithoutDelimiters });
        }
    } catch (error) {
        console.error('Error in refactoring code:', error.message);
        res.status(500).json({ error: 'Failed to refactor the code.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
