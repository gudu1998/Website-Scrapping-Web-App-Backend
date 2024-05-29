import { Router } from 'express';
import { deleteWebsiteDetails, fetchWebsiteDetails, fetchWebsiteDetailsById, saveWebsiteDetails } from '../controllers/website-scrap.controller';

const websiteScrapRouter = Router();

websiteScrapRouter.post('/', saveWebsiteDetails);
websiteScrapRouter.get('/', fetchWebsiteDetails);
websiteScrapRouter.get('/websiteid/:id', fetchWebsiteDetailsById);
websiteScrapRouter.get('/delete', deleteWebsiteDetails);

export default websiteScrapRouter;
