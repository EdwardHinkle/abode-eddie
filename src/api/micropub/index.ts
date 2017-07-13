import * as express from 'express';
import * as micropub from 'micropub-express';
import * as moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';
import { convertSavedJsonToMarkdown } from './convert';
import { convertMicropubToJekyll } from './handle';

const config = require('../../../abodeConfig.json');

export let micropubRouter = express.Router();

// Routes
// micropubRouter.get('/local', convertSavedJsonToMarkdown);
micropubRouter.use('/', micropub({
    tokenReference: {
        me: config.micropub.authenticationEndpoint,
        endpoint: config.micropub.tokenEndpoint
    },
    handler: convertMicropubToJekyll
}));

// Support Functions
function micropubHandler(micropubDocument, req) {
    console.log('Micropub Retrieved');
    const writeJson = JSON.stringify(micropubDocument, null, 2);

    fs.writeFile(path.join(__dirname, '../../log-files/' + moment().unix() + '.json'), writeJson, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log('The file was saved!');
    });

    return Promise.resolve().then(function () {
        return { url: 'https://eddiehinkle.com/404' };
    });

}