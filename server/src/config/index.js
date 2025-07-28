import dotenv from "dotenv";

dotenv.config();

export const { NODE_ENV, PORT, dbUser, dbPassword, dbCluster } = process.env;

export const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
