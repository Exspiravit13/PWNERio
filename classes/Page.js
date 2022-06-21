import fs from 'fs'

export default class {
    _id;
    _htmlfile;
    _htmlstring = "";
    _data = {};
    _layout = "main";
    _metadata = {
        title: "title",
        description: "description",
        image: "image"
    };

    _renderFn = (html, request)=>{ return new Promise((resolve, reject)=>{ resolve(html); }); };

    constructor(identifier){
        //This should be the name of the folder and the html file too
        this._id = identifier
        this._htmlfile = this.id + ".html";
    }

    load(){
        /**
            We make a promise out of the fs readFile callback so we can async/await or use Promise.then
            Load all possibly heavy duty tasks related to page here
        */
        return new Promise((resolve, reject) => {
            fs.readFile(`./templates/${this._id}/${this._htmlfile}`, (err, data) => {
                if(err){
                    this._htmlstring = "";
                    return;
                }
                this._htmlstring = data.toString();
                resolve();
            });
        });
    }

    get id(){
        return this._id;
    }

    set renderFn(fn){
        this._renderFn = fn;
    }

    set layout(v){
        this._layout = v;
    }

    
    set metadata(v){
        this._metadata = v;
    }

    _preRender(){

    }

    render(request){
        return new Promise(async (resolve, reject)=>{
            let html = "";
            /* We do the render function which should be defined at implementation of the class */
            const rendered = await this._renderFn(this._htmlstring, request);
            try{
                /* Check if we have a layout, and a valid one */
                if(this._layout){
                    fs.readFile(`./layouts/${this._layout}.html`, (err, data) => {
                        if(err){ throw err; }
                        html += data.toString();
                        html = html.replace('{%layout_content%}', rendered);

                        /* We insert our metadata into our layout (this is where <head> tag and nav should be i guess) */
                        Object.keys(this._metadata).forEach((key) => {
                            const value = this._metadata[key];
                            html = html.replace(`{%meta.${key}%}`, value);
                        });

                        resolve(html)
                    });
                }else{
                    resolve(html);
                }
            }catch(e){
                /* Just give back the plain rendered html if for some reason our layout couldn't load */
                resolve(rendered);
            }
        });
    }

    static insertData(string = "", data = {}){
        /* Get every instance where we possibly want to insert variables */
        const regexp = new RegExp('({%.*%})');
        const matches = regexp.exec(string);
        if(matches == null) return;
        matches.forEach((match) => {
            try{
                /*
                    We match the whole thing because javascript regexp is weird and returns duplicate stuff that were not in a capturing group
                    So we have to replace the {%...%}
                */
                const keys = match.replace('{%', '').replace('%}', '').split(".");
                let currentValue = data;
                let keysString = "";            //This is just for having a little bit more informative error messages
                keys.forEach((key, depth) => {
                    /* We go through our input object ($data) so we can have nested object as input */
                    keysString += "." + key;
                    if(!currentValue || !currentValue[key]){ throw new Error("Could not insert data because value with key \"" + keysString.substring(1) + "\" was not found"); }
                    currentValue = currentValue[key];
                });
                string = string.replace(match, currentValue);
            }catch(e){
                console.log(e);
            }
            
        });
        return string;
    }

}