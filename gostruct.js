class GoStruct {
    constructor(node) {
        this._gonode = node;
        this._gotext = "";
    }

    GetGoText() {
        return this._gotext;
    }

    Parse() {
        if (this._gonode == null) {
            return null;
        }

        this._parse(this._gonode, upLetter(this._gonode.GetName()))
    }

    _parse(node, path) {
        var content = "";

        var attrmap = node.GetAttr();
        for (var key in attrmap) {
            content += this.ContentAttrTemplate(key, attrmap[key]);
        }

        var childmap = node.GetChildren();
        for (var key in childmap) {
            this._parse(childmap[key], path + upLetter(key));
            content += this.ContentItemTemplate(key, path + upLetter(key))
        }

        this._gotext += this.StructTemplate(path, false, content);
    }

    StructTemplate(name, sub, content) {
        var Name = upLetter(name);
        return `type Xml${Name}${sub ? 'Item' : ''} struct {\n${content}}\n`
    }

    ContentAttrTemplate(name, type) {
        var Name = upLetter(name);
        return `${Name} ${type} \`xml:"${name},attr"\`\n`
    }

    ContentItemTemplate(name, path) {
        var Name = upLetter(name);
        return `${Name} []Xml${path} \`xml:"${name}"\`\n`
    }
}

exports.GoStruct = GoStruct;

function upLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}