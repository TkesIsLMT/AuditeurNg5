export class ClickManager{
    private isClicked: boolean = false;
    private isClickCancel: boolean = false;
    private delay: number = 250;

    private clickAction: (param:any)=>void;
    private dblClickAction: (param:any)=>void;

    constructor(click:(p:any)=>void, dblClick:(p:any)=>void, delay:number = 250){
        this.clickAction = click;
        this.dblClickAction = dblClick;
    }

    private reset(){
        this.isClickCancel = false;
        this.isClicked = false;
    }

    click(param:any){
        if (this.isClicked) {
            this.isClickCancel = true;
            return;
        }
        this.isClicked = true;
        setTimeout(() => {
            if (this.isClickCancel) {
                return this.reset();
            }
    
            this.clickAction(param);
            this.reset();
        }, this.delay);
    
    }

    dblClick(param:any) {
        setTimeout(() => {
            this.dblClickAction(param)
        });
}

}
