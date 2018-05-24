import { GlobalInfo } from "../../../services/global-info.service";
import { ReferentielPaginatorDataSource } from "../../tools/data-source/referentiel-paginator-data-source";
import { ReferentielBaseService } from "../../tools/referentiel-utils/referentiel-base-service";
import { ModeleService } from "./modele.service";

export class ModeleDataSource extends ReferentielPaginatorDataSource {
    dataService: ReferentielBaseService;
    
    constructor(private catSrv:ModeleService,private glo: GlobalInfo) {
        super(glo);
        this.dataService = catSrv;
    }

}