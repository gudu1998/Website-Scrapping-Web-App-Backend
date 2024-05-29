import axios from "axios";
import * as cheerio from "cheerio";
import * as dotenv from "dotenv";
import WebsiteScrap, {
  IWebsiteScrapModel,
} from "../models/website-scrap.model";
import mongoose from "mongoose";
import puppeteer from "puppeteer";
import * as path from "path";

dotenv.config();

export class WebsiteScrapBLL {
  async saveWebsiteDetails(websiteData: any) {
    try {
      const { websiteUrl } = websiteData;
      const concatWebsiteUrl = `https://` + `${websiteUrl}`;
      const response = await axios.get(concatWebsiteUrl);
      const htmlContent = response.data;
      const $ = cheerio.load(htmlContent);
      const titleName = websiteUrl.split(".")[0];

      const facebookRegex =
        /https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]+/g;
      const instagramRegex =
        /https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9(\.\?)?]+/g;
      const linkedinRegex =
        /https?:\/\/(www\.)?linkedin\.com\/[a-zA-Z0-9(\.\?)?]+/g;
      const twitterRegex = /https?:\/\/(www\.)?x\.com\/[a-zA-Z0-9(\.\?)?]+/g;

      const facebookUrl = htmlContent.match(facebookRegex) || [];
      const instagramUrl = htmlContent.match(instagramRegex) || [];
      const linkedinUrl = htmlContent.match(linkedinRegex) || [];
      const twitterUrl = htmlContent.match(twitterRegex) || [];

      const logo =
        $('link[rel*="icon"]').attr("href") ||
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content") ||
        $('img[src*="logo"]').attr("src") ||
        $('link[rel*="icon"]').attr("href");

      let title =
        $('meta[property="og:site_name"]').attr("content") ||
        $('meta[name="application-name"]').attr("content") ||
        $("title").text();

      const description =
        $('meta[name="description"]').attr("content") ||
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $("p").first().text();

      let delimiter = "";
      if (title.includes(":")) {
        delimiter = ":";
      } else if (title.includes("|")) {
        delimiter = "|";
      }

      if (delimiter) {
        title = title.split(delimiter)[0].trim();
      }

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(concatWebsiteUrl, { waitUntil: "networkidle2" });
      const screenshotPath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "images",
        `${titleName}.png`
      );
      let screenShotPathUrl = process.env.LOCAL_PATH + `${titleName}.png`;
      await page.screenshot({ path: screenshotPath });
      await browser.close();

      const savedWebsiteDetails: IWebsiteScrapModel = await new WebsiteScrap({
        title,
        desc: description,
        facebookUrl:
          facebookUrl.length == 0
            ? `https://www.facebook.com/${titleName}`
            : facebookUrl[0],
        instagramUrl:
          instagramUrl.length == 0
            ? `https://www.instagram.com/${titleName}`
            : instagramUrl[0],
        linkedinUrl:
          linkedinUrl.length == 0
            ? `https://www.linkedin.com/${titleName}`
            : linkedinUrl[0],
        twitterUrl:
          twitterUrl.length == 0
            ? `https://www.x.com/${titleName}`
            : twitterUrl[0],
        logo,
        websiteUrl,
        screenShotPath: screenShotPathUrl,
      }).save();

      return savedWebsiteDetails;
    } catch (error) {
      throw new Error(
        `method : saveWebsiteDetails class: WebsiteScrapBLL Error: ${error}`
      );
    }
  }

  async fetchWebsiteDetails(): Promise<IWebsiteScrapModel[]> {
    try {
      const websiteDetails = await WebsiteScrap.find({ activeStatus: 1 });
      return websiteDetails;
    } catch (error) {
      throw new Error(
        `method : fetchWebsiteDetails class: WebsiteScrapBLL Error: ${error}`
      );
    }
  }

  async fetchWebsiteDetailsById(
    websiteScrapId: any
  ): Promise<IWebsiteScrapModel> {
    try {
      const websiteDetails = await WebsiteScrap.findById({
        _id: websiteScrapId,
      });
      return websiteDetails;
    } catch (error) {
      throw new Error(
        `method : fetchWebsiteDetailsById class: WebsiteScrapBLL Error: ${error}`
      );
    }
  }

  async deleteWebsiteDetails(websiteScrapId: any) {
    try {
      const websiteScrapIds: string[] = JSON.parse(
        websiteScrapId["websiteScrapIds"]
      );
      const objectIds = websiteScrapIds.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      const result = await WebsiteScrap.updateMany(
        { _id: { $in: objectIds } },
        { $set: { activeStatus: 0, updatedAt: Date.now() } }
      );

      return result;
    } catch (error) {
      throw new Error(
        `method : deleteWebsiteDetails class: WebsiteScrapBLL Error: ${error}`
      );
    }
  }
}
