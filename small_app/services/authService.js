import { executeQuery } from "../database/database.js";

const auth_user_service = async(email) => {
    const res = await executeQuery("SELECT * FROM small_app_users WHERE email = $1;", email);
    return res;
}

export { auth_user_service };