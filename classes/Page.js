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

    _renderFn = (html)=>{ return new Promise((resolve, reject)=>{ resolve(html); }); };

    constructor(identifier, html = null){
        this._id = identifier
        if(html == null){
            html = this.id + ".html";
        }

        this._htmlfile = html;

        fs.readFile(`./templates/${this._id}/${this._htmlfile}`, (err, data) => {
            if(err){
                this._htmlstring = "Server error";
                return;
            }
            this._htmlstring = data.toString();
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

    _preRender(){

    }

    render(){
        return new Promise(async (resolve, reject)=>{
            let html = "";
            const rendered = await this._renderFn(this._htmlstring);
            try{
                if(this._layout){
                    fs.readFile(`./layouts/${this._layout}.html`, (err, data) => {
                        if(err){ throw err; }
                        html += data.toString();
                        html = html.replace('{%layout_content%}', rendered);
                        resolve(html)
                    });
                }
            }catch(e){
                html = html.replace('{%layout_content%}', rendered);
                resolve(html);
            }
        });
    }

    static insertData(to = "", what = {}){
        let string = to;
        const data = what;

        const regexp = new RegExp('({%.*%})');
        const matches = regexp.exec(to);
        if(matches == null) return;
        matches.forEach((match) => {
            try{
                const keys = match.replace('{%', '').replace('%}', '').split(".");
                let currentValue = data;
                let keysString = "";
                keys.forEach((key, depth) => {
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