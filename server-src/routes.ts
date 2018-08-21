import * as express from "express";

// import sub-routers
import { micropubRouter } from './micropub';
import { staticSiteRouter } from './static-site';
import { processRouter } from './process-server';
import { webmentionRouter } from './webmentions';
import { mediaServerRouter } from './media-server';
import { authRouter } from './auth';
import { dynamicRouter } from './dynamic-server';
import {activityPubRouter} from "./activity-pub";
import {resumeRouter} from "./resume";

export let router = express.Router();

router.use('/', activityPubRouter);
router.use('/', resumeRouter);
router.use('/', dynamicRouter);
router.use('/abode', processRouter);
router.use('/micropub', micropubRouter);
router.use('/webmention', webmentionRouter);
router.use('/media', mediaServerRouter);
router.use('/auth', authRouter);
router.use('/', staticSiteRouter);