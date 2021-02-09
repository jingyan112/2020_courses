import { executeQuery } from "../database/database.js";

const summary_service = async(email) => {
    const summary_info = {};
    const res1 = await executeQuery("select round(AVG(sleep_duration)::numeric, 2) as avg_sleep_duration from morning where current_date - date <= 7 and email = ($1);", email);
    if (res1 && res1.rowCount > 0) {
        summary_info.avg_sleep_duration_weekly = res1.rowsOfObjects()[0]["avg_sleep_duration"];
    } else {
        summary_info.avg_sleep_duration_weekly = 0;
    }
    const res2 = await executeQuery("select round(AVG(time_sports)::numeric, 2) as avg_time_sports from evening where current_date - date <= 7 and email = ($1);", email);
    if (res2 && res2.rowCount > 0) {
        summary_info.avg_time_sports_weekly = res2.rowsOfObjects()[0]["avg_time_sports"];
    } else {
        summary_info.avg_time_sports_weekly = 0;
    }
    const res3 = await executeQuery("select round(AVG(time_study)::numeric, 2) as avg_time_study from evening where current_date - date <= 7 and email = ($1);", email);
    if (res3 && res3.rowCount > 0) {
        summary_info.avg_time_study_weekly = res3.rowsOfObjects()[0]["avg_time_study"];
    } else {
        summary_info.avg_time_study_weekly = 0;
    }
    const res4 = await executeQuery("select round(AVG(sleep_quality)::numeric, 2) as avg_sleep_quality from morning where current_date - date <= 7 and email = ($1);", email);
    if (res4 && res4.rowCount > 0) {
        summary_info.avg_sleep_quality_weekly = res4.rowsOfObjects()[0]["avg_sleep_quality"];
    } else {
        summary_info.avg_sleep_quality_weekly = 0;
    }
    const res5 = await executeQuery("Select round((t1.avg + t2.avg)/2::numeric, 2) as avg_generic_mood from (select round(AVG(generic_mood)::numeric, 2) as avg from morning where current_date - date <= 7 and email = ($1)) t1, (select round(AVG(generic_mood)::numeric, 2) as avg from evening where current_date - date <= 7 and email = ($2)) t2;", email, email);
    if (res5 && res5.rowCount > 0) {
        summary_info.avg_generic_mood_weekly = res5.rowsOfObjects()[0]["avg_generic_mood"];
    } else {
        summary_info.avg_generic_mood_weekly = 0;
    }

    const res6 = await executeQuery("select round(AVG(sleep_duration)::numeric, 2) as avg_sleep_duration from morning where current_date - date <= 30 and email = ($1);", email);
    if (res6 && res6.rowCount > 0) {
        summary_info.avg_sleep_duration_monthly = res6.rowsOfObjects()[0]["avg_sleep_duration"];
    } else {
        summary_info.avg_sleep_duration_monthly = 0;
    }
    const res7 = await executeQuery("select round(AVG(time_sports)::numeric, 2) as avg_time_sports from evening where current_date - date <= 30 and email = ($1);", email);
    if (res7 && res7.rowCount > 0) {
        summary_info.avg_time_sports_monthly = res7.rowsOfObjects()[0]["avg_time_sports"];
    } else {
        summary_info.avg_time_sports_monthly = 0;
    }
    const res8 = await executeQuery("select round(AVG(time_study)::numeric, 2) as avg_time_study from evening where current_date - date <= 30 and email = ($1);", email);
    if (res8 && res8.rowCount > 0) {
        summary_info.avg_time_study_monthly = res8.rowsOfObjects()[0]["avg_time_study"];
    } else {
        summary_info.avg_time_study_monthly = 0;
    }
    const res9 = await executeQuery("select round(AVG(sleep_quality)::numeric, 2) as avg_sleep_quality from morning where current_date - date <= 30 and email = ($1);", email);
    if (res9 && res9.rowCount > 0) {
        summary_info.avg_sleep_quality_monthly = res9.rowsOfObjects()[0]["avg_sleep_quality"];
    } else {
        summary_info.avg_sleep_quality_monthly = 0;
    }
    const res10 = await executeQuery("Select round((t1.avg + t2.avg)/2::numeric, 2) as avg_generic_mood from (select round(AVG(generic_mood)::numeric, 2) as avg from morning where current_date - date <= 30 and email = ($1)) t1, (select round(AVG(generic_mood)::numeric, 2) as avg from evening where current_date - date <= 30 and email = ($2)) t2;", email, email);
    if (res10 && res10.rowCount > 0) {
        summary_info.avg_generic_mood_monthly = res10.rowsOfObjects()[0]["avg_generic_mood"];
    } else {
        summary_info.avg_generic_mood_monthly = 0;
    }
    return summary_info;
}

export { summary_service };

