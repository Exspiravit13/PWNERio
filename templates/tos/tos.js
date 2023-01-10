import Page from "../../classes/Page.js"

export const tos = function(){
    const page = new Page("tos");

    page.layout = "main";

    page.metadata = {
        title: "Login",
        description: "Login to gain access to your PWMNER account",
        image: "/static/assets/logo.png"
    }

    return page; 
}