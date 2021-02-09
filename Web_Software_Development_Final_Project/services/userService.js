import { executeQuery } from "../database/database.js";

const register_user_service = async(email, password, hash, verification) => {
  const data = {
    logs: []
  };

  if (password !== verification) {
    data.logs.push('The entered passwords did not match, registration failed!');
    return data;
  }

  if (password.length < 4) {
    data.logs.push('Password must contain at least 4 characters!');
    return data;
  }

  const res1 = await executeQuery("SELECT * FROM users WHERE email = $1", email);
  if (res1 && res1.rowCount > 0) {
    data.logs.push('This email is already registrated, you can login directly!');
    return data;
  }
  
  const res2 = await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
  if (res2 && res2.rowCount > 0) {
    data.logs.push('Registration successful!');
    return data;
  }
}

export { register_user_service };
