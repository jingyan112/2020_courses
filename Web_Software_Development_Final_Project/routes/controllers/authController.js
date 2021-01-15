const auth_user_controller = async({render}) => {
    const data = {
        logs:[], 
        login: false
    }
    render('auth.ejs', data);
};

export { auth_user_controller };