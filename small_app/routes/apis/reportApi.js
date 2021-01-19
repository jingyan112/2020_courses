import { report_service } from "../../services/reportService.js";
const report_api = async({request, render, session, response}) => {
    const data = {
        user: '',
        logs: [],
        login: 1
    }
    const body = request.body();
    const params = await body.value;
    const user = await session.get('user');
    data.user = user.email;
    const date = params.get('date');
    const Whether_Using_Allowance = params.get('Whether_Using_Allowance');

    if (user) {
        report_service(user.email, date, Whether_Using_Allowance);
        data.logs.push("Last record is inserted successfully, you can continue!");
        render('report.ejs', data);
    }
    else {
        response.status = 404;
    }
};

export { report_api };