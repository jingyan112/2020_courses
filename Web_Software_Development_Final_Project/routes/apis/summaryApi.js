import { summary_service } from "../../services/summaryService.js";

const summary_api = async({session, render, response}) => {
    const data = { };
    const user = await session.get('user');
    data.user = user.email;
    if (user) {
        const res = await summary_service(user.email);
        data.avg_sleep_duration_weekly = res.avg_sleep_duration_weekly;
        data.avg_time_sports_weekly = res.avg_time_sports_weekly;
        data.avg_time_study_weekly = res.avg_time_study_weekly;
        data.avg_sleep_quality_weekly = res.avg_sleep_quality_weekly;
        data.avg_generic_mood_weekly = res.avg_generic_mood_weekly;
    
        data.avg_sleep_duration_monthly = res.avg_sleep_duration_monthly;
        data.avg_time_sports_monthly = res.avg_time_sports_monthly;
        data.avg_time_study_monthly = res.avg_time_study_monthly;
        data.avg_sleep_quality_monthly = res.avg_sleep_quality_monthly;
        data.avg_generic_mood_monthly = res.avg_generic_mood_monthly;

        data.login = 1;
    
        render('summary.ejs', data);  
    } else {
        response.status = 404;
    }

};

export { summary_api };