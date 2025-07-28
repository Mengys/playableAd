import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ColliderTest')
export class ColliderTest extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onCollisionEnter(other, self) {
        console.log("Столкновение началось с", other.node.name);
    }
}
