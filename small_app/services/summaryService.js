import { executeQuery } from "../database/database.js";

const summary_service = async(email) => {
    const res1 = await executeQuery("select * from small_app_report where email = ($1);", email);
    return res1;
}

export { summary_service };

