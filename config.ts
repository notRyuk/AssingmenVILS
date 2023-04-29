import { config } from "dotenv";

config()

const DB_USERNAME = process.env.DB_USERNAME || ""
const DB_PASSWORD = process.env.DB_PASSWORD || ""

export const DB_URL = ((process.env.DB_URL || "").replace("<username>", DB_USERNAME)).replace("<password>", DB_PASSWORD)
export const PORT = +(process.env.PORT as string) || 6969