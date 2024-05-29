import { Router } from 'express';
import websiteScrapRouter from './website-scrap.routes';

const router = Router();

router.use('/website-scrap', websiteScrapRouter);

export default router;
