import { CategorieService } from "./categorie.service";
import { GlobalInfo } from "../../../services/global-info.service";
import { ReferentielPaginatorDataSource } from "../../tools/data-source/referentiel-paginator-data-source";
import { ReferentielBaseService } from "../../tools/referentiel-utils/referentiel-base-service";

export class CategorieDataSource extends ReferentielPaginatorDataSource {
    dataService: ReferentielBaseService;
    
    constructor(private catSrv:CategorieService,private glo: GlobalInfo) {
        super(glo);
        this.dataService = catSrv;
    }

}