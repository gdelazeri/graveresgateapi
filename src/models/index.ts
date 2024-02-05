import { DataSource } from "typeorm";
import { DATABASE_PASSWORD } from "../config/environment";
import { User } from "./user.model";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: DATABASE_PASSWORD,
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
})
