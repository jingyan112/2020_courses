import { apisummary_7days_service, apisummary_1day_service } from "../../services/apisummaryService.js";

const apisummary_7days_api = async({response}) => {
    response.body = await apisummary_7days_service();
}

const apisummary_1day_api = async({params, response}) => {
    const date = params.year + '-' + params.month + '-' + params.day;
    response.body = await apisummary_1day_service(date);
}

export { apisummary_7days_api, apisummary_1day_api };