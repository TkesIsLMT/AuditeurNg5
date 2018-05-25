import { TypeElement } from "../../../../enums/type-element.enum";
import { UgoNode } from "../../../../utils/ugo-node";

export class ElementBase extends UgoNode {
    constructor(type:TypeElement){
        super();
        this.TypeElement = type;
        switch (type) {
            case TypeElement.MenuItem:
                this.Libelle = "Nouveau menu...";
                break;
            default:
                break;
        }
    }
    private _id:number;
    get Id():number{ return this._id;
    }
    set Id(value:number) {
        this._id = value;
        this.nodeId = value;
    }
    ElementParentId?: number;
    Libelle:string;
    ModeleId:number;
    Ordre:number;
    TypeElement:TypeElement;
}

