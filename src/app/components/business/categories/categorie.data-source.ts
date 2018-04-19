import { SynthesePaginatorDataSource } from "../../tools/synthese-paginator-data-source";
import { CategorieService } from "./categorie.service";
import { GlobalInfo } from "../../../services/global-info.service";
import { SyntheseService } from "../../../shared/synthese/synthese-service";

export class CategorieDataSource extends SynthesePaginatorDataSource {
    dataService: SyntheseService;
    
    constructor(private catSrv:CategorieService,private glo: GlobalInfo) {
        super(glo);
        this.dataService = catSrv;
    }

}