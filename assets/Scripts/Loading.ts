import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {

    timer: number = 3;

    update(deltaTime: number) {
        this.timer -= deltaTime;
        if (this.timer < 0){
            this.node.destroy();
        }
    }
}
