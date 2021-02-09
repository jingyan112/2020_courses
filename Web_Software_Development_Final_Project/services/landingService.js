import { executeQuery } from "../database/database.js";

const landing_yesterday_service = async() => {
    const yesterday_res = await executeQuery("Select round((t1.avg + t2.avg)/2::numeric, 2) as avg from (select round(AVG(generic_mood)::numeric, 2) as avg from morning where current_date - date = 1) t1, (select round(AVG(generic_mood)::numeric, 2) as avg from evening where current_date - date = 1) t2;");
    if (yesterday_res && yesterday_res.rowCount > 0) {
        const yesterday_data = yesterday_res.rowsOfObjects()[0]["avg"];
        console.log(yesterday_data);
        return yesterday_data;
    } else {
        return '';
    }
}

const landing_today_service = async() => {
    const today_res = await executeQuery("Select round((t1.avg + t2.avg)/2::numeric, 2) as avg from (select round(AVG(generic_mood)::numeric, 2) as avg from morning where current_date - date = 0) t1, (select round(AVG(generic_mood)::numeric, 2) as avg from evening where current_date - date = 0) t2;");
    if (today_res && today_res.rowCount > 0) {
        const today_data = today_res.rowsOfObjects()[0]["avg"];
        console.log(today_data);
        return today_data;
    } else{
        return '';
    }
}
export { landing_yesterday_service, landing_today_service };