import { bcrypt } from "../../deps.js";
import { register_user_service } from "../../services/userService.js";

const register_user_api = async({request, render}) => {
    const data = {
        logs: []
    };
    const body = request.body();
    const params = await body.value;
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');
    const hash = await bcrypt.hash(password); 
    const res = await register_user_service(email, password, hash, verification);
    if (res) {
        data.logs.push(res.logs[0]);
        render('user.ejs', data);
    }
}

export { register_user_api };
