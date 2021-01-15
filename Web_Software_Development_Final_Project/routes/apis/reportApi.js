import { report_morning_service, report_evening_service } from "../../services/reportService.js";
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
    const sleep_duration = params.get('sleep_duration');
    const sleep_quality = params.get('sleep_quality');
    const generic_mood = params.get('generic_mood');
    const time_sports = params.get('time_sports');
    const time_study = params.get('time_study');
    const eating_quality = params.get('eating_quality');

    if (user) {
        if (date && sleep_duration && sleep_quality && generic_mood) {
            if (sleep_duration >= 0 && sleep_duration <= 24 && sleep_quality >= 1 && sleep_quality <= 5 && generic_mood >= 1 && generic_mood <= 5) {
                const res1 = report_morning_service(user.email, date, sleep_duration, sleep_quality, generic_mood);
                console.log(res1);
                data.logs.push("Last record is inserted successfully, you can continue!");
            } else {
                data.logs.push("Wrong data format!");
            }
        } 
        if (date && time_sports && time_study && eating_quality && generic_mood) {
            if (time_sports >= 0 && time_sports <= 24 && time_study >= 0 && time_study <= 24 && eating_quality >= 1 && eating_quality <= 5 && generic_mood >= 1 && generic_mood <= 5) {
                report_evening_service(user.email, date, time_sports, time_study, eating_quality, generic_mood);
                data.logs.push("Last record is inserted successfully, you can continue!");
            } else {
                data.logs.push("Wrong data format!");
            }
        }
        render('report.ejs', data);
    } else {
        response.status = 404;
    }
};

export { report_api };