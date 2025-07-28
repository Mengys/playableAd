import { _decorator, Component, Node, Vec3,RigidBody,ICollisionEvent,ParticleSystem   } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property(ParticleSystem)
    particleSystem: ParticleSystem = null;

    speed: number = 50;
    lifetime: number = 2;
    dir: Vec3 = new Vec3(1,0,0);


    protected start(): void {
        const rigidBody = this.getComponent(RigidBody);
        rigidBody.useCCD = true;
        this.particleSystem.play();
    }

    update(deltaTime: number) {
        this.lifetime -= deltaTime;
        if (this.lifetime < 0){
            this.node.destroy();
        }
        this.dir.normalize(); 
        const move = this.dir.multiplyScalar(this.speed * deltaTime);
        this.node.setPosition(this.node.position.add(move));
    }

    public SetDir(dir: Vec3) {
        this.dir = dir;
    }
}
