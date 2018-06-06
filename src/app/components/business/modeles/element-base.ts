import { TypeElement } from "../../../enums/type-element.enum";
import { UgoNode } from "../../../utils/ugo-node";
import * as _ from 'lodash';
import { PointDetail } from "../points/point-detail";
import { ModeleDetail } from "./modele-detail";

export class ElementBase extends UgoNode {
    constructor(type:TypeElement){
        super();
        this.TypeElement = type;
        switch (type) {
            case TypeElement.MenuItem:
                this.Libelle = "Nouveau menu...";
                break;
            case TypeElement.Ligne:
                this.Libelle = "Nouvelle ligne...";
                break;
            default:
                break;
        }
    }

    addChildElement(child:ElementBase):ElementBase{
        this.addChild<ElementBase>(child);
        child.ModeleId = this.ModeleId;
        return child;
    }

    reload(data:ElementBase){
        _.assign(this, data);
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
    ElementsEnfants:ElementBase[];

    /**Pour le type Tableau*/
    Colonnes?:string;

    /**Pour le type SousModele */
    ModeleLieId?:number;
    ModeleLie?:ModeleDetail;

    /**Pour le type Cellule et SchemaPoint*/
    PointControleId?:number;
    PointControle?:PointDetail;
    /**Pour le type Cellule et SchemaPoint*/
    EstCommentable?:boolean;
    /**Pour le type Cellule et SchemaPoint*/
    EstLiableATL?:boolean;
    /**Pour le type Cellule et SchemaPoint*/
    EstObligatoire?:boolean;

    /**Pour le type SchemaPoint*/
    PositionX?:number;
    /**Pour le type SchemaPoint*/
    PositionY?:number;
}

