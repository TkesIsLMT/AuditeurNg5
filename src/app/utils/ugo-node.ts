import * as _ from 'lodash';

export abstract class UgoNode{
    constructor(id:any = 0){
        this.nodeId = id;
    }
    nodeId:any;
    parent: UgoNode;
    childs: UgoNode[];
    value: any;

    addChild<T extends UgoNode>(child:T) :T{
        if (!this.childs){
            this.childs = [];
        }
        if (child.nodeId === 0){
            child.nodeId = this.childs.length;
        }
        if (_.find(this.childs,['nodeId',child.nodeId])){
            throw "La collection contient déjà un élément avec ce nodeId";
        }
        child.parent = this;
        this.childs.push(child);
        return child;
    }
    
}