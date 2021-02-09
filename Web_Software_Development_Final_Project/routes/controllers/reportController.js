const report_controller = async({session, render, response}) => {
    const user = await session.get('user');
    const data = {
        user: '',
        logs:[],
        login: 1
    }
    if (user) {
        data.user = user.email;
        render('report.ejs', data);
    }
    else {
        response.status = 404;
    }
};

export { report_controller };