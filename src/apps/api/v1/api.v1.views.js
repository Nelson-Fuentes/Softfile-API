import pkg from '../../../../package.json';

import { Request, Response } from 'express';
/**
 * @param {Resquest} request
 * @param {Response} response 
 */
export const api_view = (resquest, response) => {
    response.json({
        name: pkg.name,
        version: "0.1.0",
        description: pkg.description,
        author: pkg.author
    });
}