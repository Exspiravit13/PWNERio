import Page from "../../classes/Page.js"

export const NotFound = function(){
    const page = new Page("404");

    page.layout = "main";

    page.metadata = {
        title: "404 - Page Not Found",
        description: "Error page not found try navigating to https://pwner.io/",
        image: "/static/assets/logo.png"
    }

    return page; 
};
