import Page from "../../classes/Page.js"

export const login = function(){
    const page = new Page("login");

    page.layout = "login";

    page.metadata = {
        title: "Login",
        description: "Login to gain access to your PWMNER account",
        image: "/static/assets/logo.png"
    }

    return page; 
}