import Page from "../../classes/Page.js"

export const HomePage = function(){
    const page = new Page("home");

    page.layout = "main";

    page.metadata = {
        title: "PWNER.IO",
        description: "PWNER.IO is the latest up and coming cyber marketplace for all your pwning needs!",
        image: "/static/assets/logo.png"
    }

    page.renderFn = function(html, request){
        return new Promise((resolve, reject) => {
            html = Page.insertData(html);
            resolve(html);
        });
    }

    return page; 
};
