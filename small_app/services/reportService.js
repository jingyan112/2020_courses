import { executeQuery } from "../database/database.js";

const report_service = async(email, date, Whether_Using_Allowance) => {
    await executeQuery("INSERT INTO small_app_report (email, date, Whether_Using_Allowance) VALUES ($1, $2, $3);", email, date, Whether_Using_Allowance);
}

export { report_service };