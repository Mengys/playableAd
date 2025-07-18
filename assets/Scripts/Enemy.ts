import { _decorator, Component, Node, Vec3, Quat, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property(Node)
    player: Node = null;

    speed: number = 10;

    protected start(): void {
        
    }

    update(deltaTime: number) {
        const playerPos = this.player.position;
        const enemyPos = this.node.position;
        const direction = new Vec3();
        Vec3.subtract(direction, playerPos, enemyPos);
        direction.normalize(); 
        const move = direction.multiplyScalar(this.speed * deltaTime);
        this.node.setPosition(this.node.position.add(move));

        // 2. Поворачиваем модель в сторону движения
        // Вычисляем целевой угол (в радианах) вокруг оси Y
        const targetAngle = Math.atan2(move.x, move.z); // atan2(dx, dz)
        // Создаем вращение вокруг Y
        const quat = new Quat();
        Quat.fromEuler(quat, 0, targetAngle * 180 / Math.PI, 0);
            
        // Легко сглаживаем поворот (не обязательно, можно плавно)
        this.node.setRotation(quat);
    }

    public onCollisionEnter(other, self) {
        console.log("Столкновение началось с", other.node.name);
    }
}
