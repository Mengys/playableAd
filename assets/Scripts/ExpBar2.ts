import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ExpBar2')
export class ExpBar1 extends Component {

    @property(SpriteFrame)
    empty: SpriteFrame = null;
    @property(SpriteFrame)
    full: SpriteFrame = null;

    @property({ type:[Node]})
    bars: Node[] = [];

    i: number = 0;

    public AddExp(){
        this.bars[this.i].getComponent(Sprite).spriteFrame = this.full;
        this.i++;
    }
}
