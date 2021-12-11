import React, { useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@mui/material';
import Form from './Form/Form.js';
import List from './List/List.js';
import { ExpensetrackerContext } from '../../context/context.js';
import InfoCard from '../InfoCard.js';

function Main() {
    const { balance } = useContext(ExpensetrackerContext);
    return (
        <Card sx={{height:'78vh'}}>
            <CardHeader title="Expense Tracker" subheader="Powered By Speechly" />
            <CardContent>
                <Typography align="center" variant="h5">
                    Total Balance ${balance}
                </Typography>
                <Typography align="center" variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                    <InfoCard />
                </Typography>
                <Divider />
                <Form />
            </CardContent>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>

        </Card>
    )
}

export default Main
