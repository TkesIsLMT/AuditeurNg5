import { ReferentielData } from "../../tools/referentiel-utils/referentiel-data";
import { UniteTravail } from "../unite-travail/unite-travail";
import { ElementBase } from "./conception/element-base";

export class ModeleDetail implements ReferentielData {
    constructor(Id=undefined, Code='',Libelle=''){
        this.Id = Id;
        this.Code = Code;
        this.Libelle = Libelle;
        this.IsEnable = true;
        this.Elements=[];
    }
    Id: number;
    Code: string;
    Libelle: string;
    IsEnable: boolean;

    UniteTravailId:number;
    UniteTravail?:UniteTravail;
    UniteLibelle?:string;

    Elements:ElementBase[];
}
