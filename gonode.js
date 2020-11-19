
class GoNode {
    constructor() {
        this._name = "";
        this._attrset = new Set();
        this._attr = {};
        this._children = {};
    }

    GetName() {
        return this._name;
    }

    GetAttrSet() {
        return this._attrset;
    }

    GetAttr() {
        return this._attr;
    }

    GetChildren() {
        return this._children;
    }

    UnionAttr(mset) {
        for (let elem of mset) {
            this._attrset.add(elem);
        }
    }

    SetName(name) {
        this._name = name;
    }

    SetAttr(name, type) {
        this._attrset.add(name);
        this._attr[name] = type;
    }

    PushChild(name, node) {
        var temp = this._children[name];
        if (typeof(temp) == undefined || temp == null) {
            this._children[name] = node;
        } else {
            var attrmap = node.GetAttr();
            for (let key in attrmap) {
                temp.SetAttr(key, attrmap[key]);
            }
        }
        
    }
}

exports.GoNode = GoNode;