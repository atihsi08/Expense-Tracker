import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { useStyles } from './styles.js';
import { useTransactions } from '../../useTransactions.js';

function Details({ title }) {
    const classes = useStyles();
    const { total, chartData } = useTransactions(title);
    return (
        <div>
            <Card className={title === "Income" ? classes.income : classes.expense} sx={{ height: '64vh' }}>
                <CardHeader title={title} />
                <CardContent>
                    <Typography variant="h5">${total}</Typography>
                    <div style={{ height: '46vh' }}>
                        <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details
