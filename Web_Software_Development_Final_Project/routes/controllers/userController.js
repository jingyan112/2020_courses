const register_user_controller = async({render}) => {
    const data = {
        logs: []
    };
    render('user.ejs', data);
};

export { register_user_controller };