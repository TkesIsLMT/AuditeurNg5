import { ReferentielData } from "../../tools/referentiel-utils/referentiel-data";
import { UniteTravail } from "../unite-travail/unite-travail";

export class ModeleDetail implements ReferentielData {
    constructor(Id=undefined, Code='',Libelle=''){
        this.Id = Id;
        this.Code = Code;
        this.Libelle = Libelle;
        this.IsEnable = true;
    }
    Id: number;
    Code: string;
    Libelle: string;
    IsEnable: boolean;

    UniteTravailId:number;
    UniteTravail?:UniteTravail;
    UniteLibelle?:string;
}
