import mongoose = require("mongoose");
import { eModel } from "../enum/model.enum";

export interface IWebsiteScrapModel {
  title: string;
  desc: string;
  screenshot: string;
  logo: string;
  facebookUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  address: string;
  emailAddress: string;
  phoneNo: string;
  websiteUrl: string;
  screenShotPath: string;
  createdAt: Date;
  updatedAt?: Date;
  activeStatus: Number;
}

const websiteScrapSchema = new mongoose.Schema<IWebsiteScrapModel>({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  screenshot: {
    type: String,
  },
  logo: {
    type: String,
  },
  facebookUrl: {
    type: String,
  },
  linkedinUrl: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
  instagramUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  screenShotPath: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  activeStatus: {
    type: Number,
    default: 1,
  },
});

const WebsiteScrap = mongoose.model<IWebsiteScrapModel>(
  eModel.WebsiteScrap,
  websiteScrapSchema
);

export default WebsiteScrap;
