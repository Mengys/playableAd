import { _decorator, Component, Vec3, Vec2, Node, Quat, math, RigidBody, BoxCollider,ITriggerEvent,find,AudioSource, } from 'cc';
import { RobotAnimation } from './RobotAnimation';
import { GameController } from './GameController';
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('Character')
export class Character extends Component {
    @property(Node)
    joystick: Node = null;

    @property(Node)
    model: Node = null;
    
    @property(AudioSource)
    audioSource: AudioSource = null;

    speed: number = 20;
    moveDir: Vec2 = new Vec2(0, 0);

    private gameController: GameController | null = null;

    audioController: AudioController = null;

    onLoad() {
        this.joystick.on('JoystickMove', this._onJoystickMove, this);
    }

    _onJoystickMove(dir: Vec2) {
        this.moveDir = dir;
    }

    start() {
        this.audioController = find("AudioController").getComponent(AudioController);
        if (this.model) {
            const robotAnim = this.model.getComponent(RobotAnimation);
            if (robotAnim) {
                robotAnim.playAnim("Robot_Turn", this.speed); // вызываем нужную анимацию
            }
        }

        const gameCtrlNode = find('GameController');
        if (gameCtrlNode) {
            this.gameController = gameCtrlNode.getComponent(GameController);
        }

        this.Init();
    }

    public Init(){
        console.log("INIT")
        const rigidBody = this.getComponent(RigidBody);
        rigidBody.useCCD = true;

        let collider = this.node.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }


    public SetSpeed(speed: number){
        this.speed = speed;
    }

    update(deltaTime: number) {
        const characterComp = this.model.getComponent(RobotAnimation);
        if (this.moveDir.lengthSqr() > 0.01) {
            if (characterComp) {
                characterComp.playAnim("Robot_Walk", this.speed); // вызываем нужную анимацию
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
                characterComp.playAnim("Robot_Turn", this.speed); // вызываем нужную анимацию
            }
        }
    }

    private onTriggerEnter(event: ITriggerEvent){
        console.log("test");
        event.otherCollider.node.destroy();

        if (this.audioController.IsSoundEnabled){
            this.audioSource.play();
        }
        this.gameController.AddExp();
    }
}
