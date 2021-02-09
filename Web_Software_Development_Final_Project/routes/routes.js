import { Router } from "../deps.js";

import { landing_api } from "./apis/landingApi.js";

import { register_user_controller } from "./controllers/userController.js";
import { register_user_api } from "./apis/userApi.js";

import { auth_user_controller } from "./controllers/authController.js";
import { auth_user_api, auth_user_logout } from "./apis/authApi.js";

import { report_controller } from "./controllers/reportController.js";
import { report_api } from "./apis/reportApi.js";

import { summary_api } from "./apis/summaryApi.js";

import { apisummary_7days_api, apisummary_1day_api } from "./apis/apisummaryApi.js";

const router = new Router();

router.get('/', landing_api);

router.get('/auth/registration', register_user_controller);
router.post('/auth/registration', register_user_api);

router.get('/auth/login', auth_user_controller);
router.post('/auth/login', auth_user_api);

router.post('/auth/logout', auth_user_logout);

router.get('/behavior/reporting', report_controller);
router.post('/behavior/reporting', report_api);

router.get('/behavior/summary', summary_api);

router.get('/api/summary', apisummary_7days_api);
router.get('/api/summary/:year/:month/:day', apisummary_1day_api);

export { router };