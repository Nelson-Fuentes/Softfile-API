import express from 'express';
import app from './app.module'

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server listen on port', 3000)
})