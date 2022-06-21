import Page from "../../classes/Page.js"

const page = new Page("home");
page.layout = "main";

page.renderFn = function(html){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //get sum data etc
            const data = {
                something: "yes"
            };
            html = Page.insertData(html, data);
            resolve(html);
        }, 241);
    });
}

export const HomePage = page;;
