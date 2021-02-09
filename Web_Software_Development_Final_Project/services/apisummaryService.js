import { executeQuery } from "../database/database.js";

const apisummary_7days_service = async() => {
    const apisummary_7days_info = {};
    const res1 = await executeQuery("select round(AVG(sleep_duration)::numeric, 2) as avg_sleep_duration from morning where current_date - date <= 7;");
    apisummary_7days_info.avg_sleep_duration_weekly = res1.rowsOfObjects()[0]["avg_sleep_duration"];
    const res2 = await executeQuery("select round(AVG(time_sports)::numeric, 2) as avg_time_sports from evening where current_date - date <= 7;");
    apisummary_7days_info.avg_time_sports_weekly = res2.rowsOfObjects()[0]["avg_time_sports"];
    const res3 = await executeQuery("select round(AVG(time_study)::numeric, 2) as avg_time_study from evening where current_date - date <= 7;");
    apisummary_7days_info.avg_time_study_weekly = res3.rowsOfObjects()[0]["avg_time_study"];
    const res4 = await executeQuery("select round(AVG(sleep_quality)::numeric, 2) as avg_sleep_quality from morning where current_date - date <= 7;");
    apisummary_7days_info.avg_sleep_quality_weekly = res4.rowsOfObjects()[0]["avg_sleep_quality"];
    const res5 = await executeQuery("Select round((t1.avg + t2.avg)/2::numeric, 2) as avg_generic_mood from (select round(AVG(generic_mood)::numeric, 2) as avg from morning where current_date - date <= 7) t1, (select round(AVG(generic_mood)::numeric, 2) as avg from evening where current_date - date <= 7) t2;");
    apisummary_7days_info.avg_generic_mood_weekly = res5.rowsOfObjects()[0]["avg_generic_mood"];
    return apisummary_7days_info;
}

const apisummary_1day_service = async(date) => {
    const apisummary_1day_service = {};
    const res1 = await executeQuery("select round(AVG(sleep_duration)::numeric, 2) as avg_sleep_duration from morning where date = ($1);", date);
    apisummary_1day_service.avg_sleep_duration_dayly = res1.rowsOfObjects()[0]["avg_sleep_duration"];
    const res2 = await executeQuery("select round(AVG(time_sports)::numeric, 2) as avg_time_sports from evening where date = ($1);", date);
    apisummary_1day_service.avg_time_sports_dayly = res2.rowsOfObjects()[0]["avg_time_sports"];
    const res3 = await executeQuery("select round(AVG(time_study)::numeric, 2) as avg_time_study from evening where date = ($1);", date);
    apisummary_1day_service.avg_time_study_dayly = res3.rowsOfObjects()[0]["avg_time_study"];
    const res4 = await executeQuery("select round(AVG(sleep_quality)::numeric, 2) as avg_sleep_quality from morning where date = ($1);", date);
    apisummary_1day_service.avg_sleep_quality_dayly = res4.rowsOfObjects()[0]["avg_sleep_quality"];
    const res5 = await executeQuery("Select round((t1.avg + t2.avg)/2::numeric, 2) as avg_generic_mood from (select round(AVG(generic_mood)::numeric, 2) as avg from morning where date = ($1)) t1, (select round(AVG(generic_mood)::numeric, 2) as avg from evening where date = ($2)) t2;", date, date);
    apisummary_1day_service.avg_generic_mood_dayly = res5.rowsOfObjects()[0]["avg_generic_mood"];
    return apisummary_1day_service;
}
export { apisummary_7days_service, apisummary_1day_service };