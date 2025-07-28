import { _decorator, Component, Node, Vec3, find, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pointer')
export class Pointer extends Component {

    @property
    distance: number = 100; // расстояние от игрока до указателя

    @property(Node)
    target: Node = null;

    @property(Node)
    player: Node = null;

    update() {
        this.FindTarget();
        if (this.target) {
            // Получаем позиции в мировых координатах
            let targetPos = this.target.worldPosition;
            let dir = new Vec3;
            Vec3.subtract(dir, this.target.position, this.player.position);
            dir.y = 0;
            dir.normalize();
            dir.multiplyScalar(5);
            let newPos = new Vec3;
            Vec3.add(newPos, this.player.position, dir);
            newPos.y = 1;
            this.node.setPosition(newPos);

            const targetAngle = Math.atan2(dir.x, dir.z); // atan2(dx, dz)
            // Создаем вращение вокруг Y
            const quat = new Quat();
            Quat.fromEuler(quat, 0, targetAngle * 180 / Math.PI, 0);
            
            // Легко сглаживаем поворот (не обязательно, можно плавно)
            this.node.setRotation(quat);
        }
    }

    private FindTarget(){
        this.target = find('Exp');
    }
}
