import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ExpBar1')
export class ExpBar1 extends Component {

    @property({ type:[SpriteFrame]})
    bars: SpriteFrame[] = [];

    i: number = 0;

    public AddExp(){
        if (this.i < this.bars.length){
            this.node.getComponent(Sprite).spriteFrame = this.bars[this.i];
            this.i++;
        }
    }

    public Full(){
        for (let i = 0; i < this.bars.length; i++){
            this.node.getComponent(Sprite).spriteFrame = this.bars[ this.bars.length];
        }
    }
}
