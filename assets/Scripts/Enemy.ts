import { 
    _decorator, 
    Component, 
    Node, 
    Vec3, 
    Quat, 
    RigidBody, 
    ICollisionEvent, 
    BoxCollider, 
    ITriggerEvent, 
    find, 
    SkeletalAnimation, 
    random, 
    randomRange, 
    Prefab, 
    instantiate,
     } from 'cc';
import { GameController } from './GameController';

const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property(Node)
    player: Node = null;

    @property(Prefab)
    exp: Prefab = null;

    @property(Prefab)
    blood: Prefab = null;

    @property(SkeletalAnimation)
    skelAnim: SkeletalAnimation = null;

    @property(Prefab)
    deathSound: Prefab = null;

    gameController: Node = null;
    speed: number = 10;
    health: number = 6;

    protected start(): void {
        console.log("start");
        this.gameController = find('GameController');
        let state = this.skelAnim.getState("RummerBag_Attack");
        state.speed = randomRange(0.8, 1.2);
        this.skelAnim.play("RummerBag_Attack");
    }

    public Init(){

        const rigidBody = this.getComponent(RigidBody);
        rigidBody.useCCD = true;


        let collider = this.node.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
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
    
    private onTriggerEnter (event: ITriggerEvent) {
        if (event.otherCollider.node.name == "Rocket"){
            this.health = 0;
        } else {
            this.health--;
        }
        event.otherCollider.node.destroy();
        if (this.health == 0){
            this.onDeath();
        }
    }

    private onDeath(){
        this.gameController.getComponent(GameController).AddKill();
        const deathSound = instantiate(this.deathSound);
        this.node.parent.parent.addChild(deathSound);
        const blood = instantiate(this.blood);
        blood.position = this.node.position;
        this.node.parent.parent.addChild(blood);
        const exp = instantiate(this.exp);
        this.node.parent.parent.addChild(exp);
        exp.position = this.node.position;
        this.node.destroy();
    }
}
