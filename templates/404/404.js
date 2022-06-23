import Page from "../../classes/Page.js"

export const HomePage = function(){
    const page = new Page("404");

    page.layout = "main";

    page.metadata = {
        title: "404 - Page Not Found",
        description: "Error page not found try navigating to https://pwner.io/",
        image: "/static/assets/logo.png"
    }

    page.renderFn = function(html, request){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //get sum data etc
                html = Page.insertData(html);
                resolve(html);
            }, 241);
        });
    }

    return page; 
};
