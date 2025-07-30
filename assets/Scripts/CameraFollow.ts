import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {

    @property(Node)
    player: Node = null;

    update() {
        if (this.player) {
            this.node.position = this.player.position;
            this.node.position.add(new Vec3(0, 35, 25));
        }
    }
}
