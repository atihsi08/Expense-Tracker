import React, { useRef, useEffect } from 'react';
import Details from './components/Details/Details.js';
import Main from './components/Main/Main.js';
import { Grid } from '@mui/material';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from "@speechly/react-ui";
import { SpeechState, useSpeechContext } from '@speechly/react-client';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


function App() {
    const theme = useTheme();
    const { speechState } = useSpeechContext();
    const main = useRef(null);
    const matches = useMediaQuery(() => theme.breakpoints.up('sm'));
    const matcheMargin = useMediaQuery(() => theme.breakpoints.down('sm'));

    const executeScroll = () => main.current.scrollIntoView();

    useEffect(() => {
        if (speechState === SpeechState.Recording) {
            executeScroll();
        }
    }, [speechState]);
    return (
        <>
            <Grid container spacing={matches ? 2 : 0} alignItems="center" justifyContent="center" style={{ height: '70vh', width: '100vw', padding: 10 }}>
                {matches && <Grid item xs={12} sm={4}>
                    <Details title="Income" />
                </Grid>}
                <Grid ref={main} item xs={12} sm={3} style={{ marginBottom: matcheMargin ? 10 : 0 }}>
                    <Main />
                </Grid>
                {!matches && <Grid item xs={12} sm={4} style={{ marginBottom: matcheMargin ? 10 : 0 }}>
                    <Details title="Income" />
                </Grid>}
                <Grid item xs={12} sm={4}>
                    <Details title="Expense" />
                </Grid>
            </Grid>
            <div style={{ height: '20vh' }}>
                <PushToTalkButtonContainer>
                    <PushToTalkButton />
                    <ErrorPanel />
                </PushToTalkButtonContainer>
            </div>
        </>
    )
}

export default App