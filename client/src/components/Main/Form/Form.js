import React, { useState, useContext, useEffect } from 'react';
import { TextField, Grid, MenuItem, Typography, Button, FormControl, InputLabel, Select } from '@mui/material';
import { ExpensetrackerContext } from '../../../context/context.js';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../../../constants/categories.js';
import { formatDate } from '../../../utils/formatDate.js';
import { useSpeechContext } from "@speechly/react-client";
import CustomizedSnackbar from '../../Snackbar/Snackbar.js';

const initialState = {
    amount: '',
    type: 'Income',
    category: '',
    date: formatDate(new Date()),
}

function Form() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useContext(ExpensetrackerContext);
    const { segment } = useSpeechContext();
    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() };
        setOpen(true);
        addTransaction(transaction);
        setFormData(initialState);
    }

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' });
            }
            else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' });
            }
            else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            }
            else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState);
            }
            segment.entities.forEach((e) => {
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                        if (incomeCategories.map(category => category.type).includes(category)) {
                            setFormData({ ...formData, type: 'Income', category: category });
                        }
                        else if (expenseCategories.map(category => category.type).includes(category)) {
                            setFormData({ ...formData, type: 'Expense', category: category });
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value });
                        break;
                    default:
                        break;
                }
            })
            if (segment.isFinal && formData.type && formData.category && formData.amount && formData.date) {
                createTransaction();
            }
        }
    }, [segment]);

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && <>{segment.words.map(w => w.value).join(' ')}</>}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {
                            selectedCategories.map((category) => (
                                <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth variant="standard" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth variant="standard" value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
            </Grid>
            <Button variant="outlined" color="primary" fullWidth style={{ margin: '10px 0 0 15px' }} onClick={createTransaction}>CREATE</Button>
        </Grid>
    )
}

export default Form
