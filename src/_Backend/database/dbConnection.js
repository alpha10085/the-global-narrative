import mongoose from "mongoose";

// constant models
import UserModel from "./models/constant/user.model";
import { SingleTypeModel } from "./models/constant/singleType";
import fileModel from "./models/constant/file.model";
import { errorLogModel } from "./models/constant/errorLog.model";
import { systemLogger } from "@/utils/consoleProxy";
import analyticsModel from "./models/constant/analytics.model";
import RateLimitModel from "./models/constant/rateLimit.model";

// collections
import { clientModel } from "./models/clients.model";
import { faqModel } from "./models/faq.model";
import { interviewModel } from "./models/interviews.model";
import { interviewCategoryModel } from "./models/interviewsCategory.model";
import { newsModel } from "./models/news.model";
import { newsCategoryModel } from "./models/newsCategory.model";
import { testimonialModel } from "./models/testimonial.model";
import { serviceModel } from "./models/service.model";

// pages
import { aboutUsPageModel } from "./models/pages/about.model";
import { clientsPageModel } from "./models/pages/clientsPage.model";
import { contactUsPageModel } from "./models/pages/contactUs.model";
import { landingModel } from "./models/pages/landing.model";
import { newsPageModel } from "./models/pages/newsPage.model";
import { servicesPageModel } from "./models/pages/services.model";

// componants
if (!process.env.DB_URL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.DB_URL, opts);
  }

  try {
    cached.conn = await cached.promise;
    systemLogger("Database connected");
    return cached.conn;
  } catch (error) {
    console.error("Database connection failed", error.message);
    throw new Error("Failed to connect to the database");
  }
};

export default connectDB;
