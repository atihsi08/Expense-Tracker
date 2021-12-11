import React from 'react';
import ReactDom from 'react-dom';
import App from './App.js';
import { Provider } from './context/context.js';
import { SpeechProvider } from "@speechly/react-client";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';

const theme = createTheme();

ReactDom.render(
    <SpeechProvider appId="d8005499-601b-488c-a6b8-1b2e6d7f0be8" language="en-US">
        <ThemeProvider theme={theme}>
            <Provider>
                <App />
            </Provider>
        </ThemeProvider>
    </SpeechProvider>
    , document.getElementById('root'));