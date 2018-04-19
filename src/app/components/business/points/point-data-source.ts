import { PointService } from "./point.service";
import { GlobalInfo } from "../../../services/global-info.service";
import { ReferentielBaseService } from "../../tools/referentiel-utils/referentiel-base-service";
import { ReferentielPaginatorDataSource } from "../../tools/data-source/referentiel-paginator-data-source";

export class PointsDataSource extends ReferentielPaginatorDataSource {
    dataService: ReferentielBaseService;
    
    constructor(private pointSrv:PointService,private glo: GlobalInfo) {
        super(glo);
        this.dataService = pointSrv;
    }

}
