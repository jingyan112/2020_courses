import { summary_service } from "../../services/summaryService.js";

const summary_api = async({session, render, response}) => {
    const data = { 
        user: '',
        login: '',
        info: []
     };
    const user = await session.get('user');
    data.user = user.email;
    if (user) {
        const res = await summary_service(user.email);
        if (res && res.rowCount > 0) {
            data.info = res.rowsOfObjects();
            console.log(data.info)
        }
        data.login = 1;
        render('summary.ejs', data);  
    } else {
        response.status = 404;
    }

};

export { summary_api };