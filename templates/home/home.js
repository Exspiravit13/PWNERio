import Page from "../../classes/Page.js"

const page = new Page("home");

page.layout = "main";

page.metadata = {
    title: "PWNER.IO",
    description: "PWNER.IO is the latest up and coming cyber marketplace for all your pwning needs!",
    image: "/static/assets/logo.png"
}

page.renderFn = function(html){
    return new Promise((resolve, reject) => {
        page.load().then(()=>{
            setTimeout(() => {
                //get sum data etc
                const data = {
                    something: "yes"
                };

                html = Page.insertData(html, data);
                resolve(html);
            }, 241);
        });
    });
}

export const HomePage = page;
