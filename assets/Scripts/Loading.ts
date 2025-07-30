import { _decorator, Component, Node, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {

    timer: number = 3;

    protected start(): void {
        let canvasNode = find("Canvas");
        console.log(canvasNode.getComponent(UITransform).width);
    }

    update(deltaTime: number) {
        this.timer -= deltaTime;
        if (this.timer < 0){
            this.node.destroy();
        }
    }
}
