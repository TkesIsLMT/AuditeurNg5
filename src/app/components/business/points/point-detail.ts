import { ReferentielData } from "../../tools/referentiel-utils/referentiel-data";
import { CategorieDetail } from "../categories/categorie-detail";

export class PointDetail implements ReferentielData {
    constructor(Id = 0, Code='', Libelle='', IsEnable=true){
        this.Id = Id;
        this.Code = Code;
        this.Libelle = Libelle;
        this.IsEnable = IsEnable;
    }
    Id: number;
    Code: string;
    Libelle: string;
    IsEnable: boolean;

    BorneMaximale: number;
    BorneMinimale: number;
    Categorie: CategorieDetail;
    CategorieId: number;
    EstCommentable:boolean;
    EstLiableATL:boolean;
    EstObligatoire:boolean;
    IdPI :string;
    ListeUnite :number[];
    TypePoint: number;
    UniteMesure :string;

}
