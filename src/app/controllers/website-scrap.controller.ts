import { Request, Response } from "express";
import { eStatusCode } from "../enum/status-code.enum";
import { WebsiteScrapBLL } from "../bll/website-scrap.bll";
import { eErrorMessage } from "../enum/error-message.enum";

export const saveWebsiteDetails = async (req: Request, res: Response) => {
  try {
    if (!Object.keys(req.body).length) {
      return res
        .status(eStatusCode.BAD_REQUEST)
        .send(eErrorMessage.FieldContent);
    }
    const result = await new WebsiteScrapBLL().saveWebsiteDetails(req.body);
    if (result) {
      return res.status(eStatusCode.OK).send(result);
    } else {
      return res
        .status(eStatusCode.BAD_REQUEST)
        .send(`Failed to save Website Details`);
    }
  } catch (error) {
    res.status(eStatusCode.INTERNAL_SERVER_ERROR).send(`${error}`);
  }
};

export const fetchWebsiteDetails = async (req: Request, res: Response) => {
  try {
    const result = await new WebsiteScrapBLL().fetchWebsiteDetails();
    if (result.length) {
      return res.status(eStatusCode.OK).send(result);
    } else {
      return res.status(eStatusCode.NOT_FOUND).send(eErrorMessage.NoRecord);
    }
  } catch (error) {
    res.status(eStatusCode.INTERNAL_SERVER_ERROR).send(`${error}`);
  }
};

export const fetchWebsiteDetailsById = async (req: Request, res: Response) => {
  try {
    const websiteScrapIds: any = req.params["id"];
    const result = await new WebsiteScrapBLL().fetchWebsiteDetailsById(
      websiteScrapIds
    );
    if (result) {
      return res.status(eStatusCode.OK).send(result);
    } else {
      return res.status(eStatusCode.NOT_FOUND).send(eErrorMessage.NoRecord);
    }
  } catch (error) {
    res.status(eStatusCode.INTERNAL_SERVER_ERROR).send(`${error}`);
  }
};

export const deleteWebsiteDetails = async (req: Request, res: Response) => {
  try {
    const websiteScrapIds: any = req.query;

    const result = await new WebsiteScrapBLL().deleteWebsiteDetails(
      websiteScrapIds
    );
    if (result) {
      return res.status(eStatusCode.OK).send(result);
    } else {
      return res.status(eStatusCode.NOT_FOUND).send(eErrorMessage.NoRecord);
    }
  } catch (error) {
    res.status(eStatusCode.INTERNAL_SERVER_ERROR).send(`${error}`);
  }
};
