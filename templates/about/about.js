import Page from "../../classes/Page.js"

export const About = function(){
    const page = new Page("about");

    page.layout = "main";

    page.metadata = {
        title: "PWNER.IO - About",
        description: "PWNER.IO is the latest up and coming cyber marketplace for all your pwning needs!",
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
