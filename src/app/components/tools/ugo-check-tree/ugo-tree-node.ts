import * as _ from 'lodash';

// export interface IUgoTreeNode{
//     id:string;
//     label:string;
//     value?:any;
//     visible?:boolean;
//     checked?:boolean;
//     expanded?:boolean;
//     originalExpandState?:boolean;
//     originalCheckState?:boolean;
//     parent?:IUgoTreeNode;
//     childs?:IUgoTreeNode[];
//     nodeClass?:string;
// }

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