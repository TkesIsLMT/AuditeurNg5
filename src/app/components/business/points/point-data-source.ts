import { SynthesePaginatorDataSource } from "../../tools/synthese-paginator-data-source";
import { PointService } from "./point.service";
import { GlobalInfo } from "../../../services/global-info.service";
import { SyntheseService } from "../../../shared/synthese/synthese-service";

export class PointsDataSource extends SynthesePaginatorDataSource {
    dataService: SyntheseService;
    
    constructor(private pointSrv:PointService,private glo: GlobalInfo) {
        super(glo);
        this.dataService = pointSrv;
    }

}
