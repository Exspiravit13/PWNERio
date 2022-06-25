import Page from "../../classes/Page.js"

export const login = function(){
    const page = new Page("login");

    page.layout = "main";

    page.metadata = {
        title: "PWNER.IO - Login",
        description: "PWNER.IO is the latest up and coming cyber marketplace for all your pwning needs!",
        image: "/static/assets/logo.png"
    }

    page.renderFn = function(html, request){
        return new Promise((resolve, reject) => {
            resolve(html);
        });
    }

    return page; 
};
