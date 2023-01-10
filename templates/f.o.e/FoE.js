import Page from "../../classes/Page.js"

export const PFoE = function(){
    const page = new Page("f.o.e");

    page.layout = "blank";

    page.metadata = {
        title: "F.o.E",
        description: "The group behind PWNER exposing true faces of evil.",
        image: "/static/assets/logo.png"
    }

    page.renderFn = function(html, request){
        return new Promise((resolve, reject) => {
            resolve(html);
        });
    }

    return page; 
};
