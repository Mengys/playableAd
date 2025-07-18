import { _decorator, Component, Vec3, Vec2, Node, Quat, math } from 'cc';
import { RobotAnimation } from './RobotAnimation';
const { ccclass, property } = _decorator;

@ccclass('Character')
export class Character extends Component {
    @property(Node)
    joystick: Node = null;

    @property(Node)
    model: Node = null;

    speed: number = 15;
    moveDir: Vec2 = new Vec2(0, 0);

    onLoad() {
        this.joystick.on('JoystickMove', this._onJoystickMove, this);
    }

    _onJoystickMove(dir: Vec2) {
        this.moveDir = dir;
    }

    start() {
        if (this.model) {
            const characterComp = this.model.getComponent(RobotAnimation);
            if (characterComp) {
                characterComp.playAnim("Robot_Turn"); // вызываем нужную анимацию
            }
        }
    }

    update(deltaTime: number) {
        const characterComp = this.model.getComponent(RobotAnimation);
        if (this.moveDir.lengthSqr() > 0.01) {
            if (characterComp) {
                characterComp.playAnim("Robot_Walk"); // вызываем нужную анимацию
            }
            // 1. Двигаем персонажа
            const move = new Vec3(this.moveDir.x, 0, -this.moveDir.y)
                .multiplyScalar(this.speed * deltaTime);
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
        else {
            if (characterComp) {
                characterComp.playAnim("Robot_Turn"); // вызываем нужную анимацию
            }
        }
    }
}