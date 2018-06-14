import { DynamicButton } from "./dynamic-button";
import { UgoTreeNode } from "../components/tools/ugo-check-tree/ugo-tree-node";
import * as _ from "lodash";

export interface ITreeContainer{
    treeConfig:TreeManager;
}

export class TreeManager {
    isRequired:boolean = false;
    isLoading:boolean = false;
    isEdit:boolean = false;
    tree: UgoTreeNode[];
    editValue: any;
    canShowWaitingFn = this.showWaiting;
    canShowSelectionFn = this.showSelection;
    canShowPlaceHolderFn = this.showPlaceHolder;
    canShowTreeFn= this.showTree;
    editBtn:DynamicButton = {key:'fermer',caption:'',faClass: 'fas fa-minus',    btnClass: 'btn btn-secondary check-list-200',    title: 'Réduire et revenir en consultation...'};
    consultBtn:DynamicButton = {key:'ouvrir',caption:'',faClass: 'fas fa-ellipsis-h',    btnClass: 'btn btn-secondary',    title: 'Agrandir et activer la modification...'};
    onSwitchMode:()=>void;
    
    constructor(switchFn :any) {
        this.onSwitchMode = switchFn;
    }

    hasValue() {
        return this.editValue && this.editValue !== null && ('' + this.editValue).length > 0;
    }
    isBtnDisable() {
        return this.isLoading;
    }
    showWaiting() {
        return this.isLoading;
    }
    showSelection() {
        return !this.isLoading && !this.isEdit && this.hasValue();
    }
    showPlaceHolder() {
        return !this.isLoading && !this.isEdit && !this.hasValue();
    }
    showTree() {
        return !this.isLoading && this.isEdit;
    }

    static searchNodeAndDo(id, source, doFn) {
        if (source){
            var n = UgoTreeNode.findTreeNodeByPredicate(source, x => x && x.id == id);
            if (!_.isUndefined(n))
                return doFn && doFn(n);
        }
    }

    static toggleTreeEdit(config:TreeManager, forceValue:boolean = undefined) {
        if (!_.isUndefined(forceValue)) {
            config.isEdit = forceValue;
        } else {
            config.isEdit = !config.isEdit;
        }
    }

}
