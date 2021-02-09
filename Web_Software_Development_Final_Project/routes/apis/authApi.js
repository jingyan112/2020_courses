import { bcrypt } from "../../deps.js";
import { auth_user_service } from "../../services/authService.js";

const auth_user_api = async({request, session, render}) => {
    const data = {
        logs:[],
        login: 0
    };
    const body = request.body();
    const params = await body.value;
    const email = params.get('email');
    const password = params.get('password');

    const res = await auth_user_service(email);
    if (res.rowCount === 0) {
        data.logs.push("Invalid email or password!");
        render('auth.ejs', data);
        return;
    }
    const userObj = res.rowsOfObjects()[0];
    const hash = userObj.password;
    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        data.logs.push("Invalid email or password!");
        render('auth.ejs', data);
        return;
    }
    await session.set('authenticated', true);
    data.logs.push("Login Successfully!");
    data.login = 1;
    render('auth.ejs', data);
    await session.set('user', {
        id: userObj.id,
        email: userObj.email
    });
}

const auth_user_logout = async({session, render}) => {
    const data = {
        logs:[],
        login: 0
    };
    if (session != null){
        await session.set('authenticated', false);
        await session.set('user', {
            id: "",
            email: ""
        });
    }
    render("auth.ejs",data)
}

export { auth_user_api, auth_user_logout }; 