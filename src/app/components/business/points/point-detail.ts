import { ReferentielData } from "../../tools/referentiel-utils/referentiel-data";
import { CategorieDetail } from "../categories/categorie-detail";

export class PointDetail implements ReferentielData {
    constructor(Id = 0, Code='', Libelle=''){
        this.Id = Id;
        this.Code = Code;
        this.Libelle = Libelle;
    }
    Id: number;
    Code: string;
    Libelle: string;

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
