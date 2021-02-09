import { landing_yesterday_service, landing_today_service } from "../../services/landingService.js";

const landing_api = async({render}) => {
    const data = {
        yesterday_mood: '',
        today_mood: '',
        logs: ''
    }
    data.yesterday_mood = await landing_yesterday_service();
    data.today_mood = await landing_today_service();
    console.log("---------")
    console.log(data.yesterday_mood);
    console.log(data.today_mood);
    if (data.yesterday_mood && data.today_mood) {
        if (data.yesterday_mood > data.today_mood) {
            data.logs = "Things are looking gloomy today!";
        } else {
            data.logs = "Things are looking bright today!";
        }
    } else {
        data.logs = "No enough data to show the mood trend!";
    }
    render('landing.ejs', data);
}

export { landing_api };