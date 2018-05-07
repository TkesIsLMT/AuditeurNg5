import * as _ from 'lodash';
import { UgoCheckTreeComponent } from './ugo-check-tree.component';

export class UgoTreeNode {
    private isOriginalStateSave:boolean = false;
    id: string;
    label: string;
    value: any;
    visible: boolean;
    checked: boolean;
    expanded: boolean;
    checkable:boolean;
    expandable:boolean;
    originalExpandState: boolean = undefined;
    originalCheckState:boolean = undefined;
    childs: UgoTreeNode[] = [];
    parent: UgoTreeNode;
    nodeClass:string = '';

    constructor(id:string, label:string, value:any = undefined, visible:boolean = true, checked:boolean = false, expanded:boolean = false, checkable:boolean = true, expandable:boolean = true){
        this.id = id;
        this.label = label;
        this.value = value;
        this.visible = visible;
        this.checked = checked;
        this.expanded = expanded;
        this.checkable = checkable;
        this.expandable = expandable;
    }
    


    static foreachTreeNodeAction(starting:UgoTreeNode[] | UgoTreeNode, action:(UgoTreeNode)=>void, asc: boolean = false) {
        var fn = asc ? UgoTreeNode.foreachTreeNodeActionAscendant : UgoTreeNode.foreachTreeNodeActionDescendant;

        if (_.isArray(starting)) {
            UgoTreeNode.foreachTabTreeNodeAction(starting, action, fn);
        }
        else {
            fn(starting, action);
        }
    }

    static foreachTreeNodeActionAscendant(startingNode:UgoTreeNode, action) {
        if (startingNode) {
            action(startingNode);
            UgoTreeNode.foreachTreeNodeActionAscendant(startingNode.parent, action);
        }
    }

    static foreachTreeNodeActionDescendant(startingNode:UgoTreeNode, action:(UgoTreeNode)=>void) {
        action(startingNode);
        if (startingNode.childs) {
            UgoTreeNode.foreachTabTreeNodeAction(startingNode.childs, action, UgoTreeNode.foreachTreeNodeActionDescendant);
        }
    }

    static foreachTabTreeNodeAction(tab:UgoTreeNode[], action:(UgoTreeNode)=>void, fn:(UgoTreeNode, any) => void) {
        _.each(tab, (el) => fn(el, action));
    }

    static findTreeNodeByPredicate(node: UgoTreeNode | UgoTreeNode[], predicate :(UgoTreeNode) => boolean): UgoTreeNode {
        let rst:UgoTreeNode;
        if (_.isArray(node)) {
            //on traite le tableau de racine initial ici
            for (var i = 0; i < node.length; i++) {
                rst = this.findTreeNodeByPredicate(node[i], predicate);
                if (!_.isUndefined(rst))
                    i = node.length;
            }
        } else {
            //une racine ou une branche
            if (predicate(node)) {
                rst = node;
            } else if (node.childs) {
                rst = this.findTreeNodeByPredicate(node.childs, predicate);
            }
        }
        return rst;
    }

    addChild(child:UgoTreeNode) :UgoTreeNode{
        if (!this.childs){
            this.childs = [];
        }
        if (_.find(this.childs,['id',child.id])){
            throw "La collection contient déjà un élément avec cet id";
        }
        child.parent = this;
        this.childs.push(child);
        return child;
    }

    /**
     * Permet de mémoriser l'état du noeud.
     * @param force Permet de forcer la sauvegarde même si elle a déjà été faite
     */
    setOriginalState(force:boolean = false) : boolean{
        if (!this.isOriginalStateSave || force) {
            this.originalExpandState = this.expanded;
            this.originalCheckState = this.checked;
            this.isOriginalStateSave = true;
            return true;
        }
        return false;
    }
}