import { _decorator, Component, Node, Vec3,RigidBody,ICollisionEvent,ParticleSystem,Quat   } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Rocket')
export class Rocket extends Component {

    @property(ParticleSystem)
    particleSystem: ParticleSystem = null;

    speed: number = 50;
    dir: Vec3 = new Vec3(1,0,0);

    protected start(): void {
        const rigidBody = this.getComponent(RigidBody);
        rigidBody.useCCD = true;
        //this.particleSystem.play();
    }

    update(deltaTime: number) {
        this.dir.normalize(); 
        const move = this.dir.multiplyScalar(this.speed * deltaTime);
        this.node.setPosition(this.node.position.add(move));
    }

    private updateRotation() {
        // Ось "вперёд" локальной модели — X (1,0,0)
        // Нужно найти вращение от (1,0,0) к this.dir
        const forward = new Vec3(1, 0, 0);
        const rotation = new Quat();
        Quat.rotationTo(rotation, forward, this.dir);
        this.node.setRotation(rotation);
    }

    public SetDir(dir: Vec3) {
        this.dir = dir;
    }
}
