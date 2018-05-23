import { ReferentielData } from "../../tools/referentiel-utils/referentiel-data";

export class CategorieDetail implements ReferentielData {
    constructor(Id = 0, Code='', Libelle='', CategorieMereId=null){
        this.Id = Id;
        this.Code = Code;
        this.Libelle = Libelle;
        this.CategorieMereId = CategorieMereId;
    }
    Id: number;
    Code: string;
    Libelle: string;
    IsEnable: boolean;
    CategorieMereId: number;
}
