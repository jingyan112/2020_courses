import { executeQuery } from "../database/database.js";

const report_morning_service = async(email, date, sleep_duration, sleep_quality, generic_mood) => {
    await executeQuery("INSERT INTO morning (email, date, sleep_duration, sleep_quality, generic_mood) VALUES ($1, $2, $3, $4, $5);", email, date, sleep_duration, sleep_quality, generic_mood);
}

const report_evening_service = async(email, date, time_sports, time_study, eating_quality, generic_mood) => {
    await executeQuery("INSERT INTO evening (email, date, time_sports, time_study, eating_quality, generic_mood) VALUES ($1, $2, $3, $4, $5, $6);", email, date, time_sports, time_study, eating_quality, generic_mood);
}

export { report_morning_service, report_evening_service };