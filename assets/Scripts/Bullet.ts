import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    speed: number = 50;
    dir: Vec3 = new Vec3(1,0,0);

    update(deltaTime: number) {
        this.dir.normalize(); 
        const move = this.dir.multiplyScalar(this.speed * deltaTime);
        this.node.setPosition(this.node.position.add(move));
    }

    public SetDir(dir: Vec3) {
        this.dir = dir;
    }

    public onCollisionEnter(other, self) {
        console.log("Столкновение началось с", other.node.name);
    }

    public onCollisionStay(other, self){
        console.log("Столкновение началось с", other.node.name);
    }

    public onCollisionExit(other, self){
        console.log("Столкновение началось с", other.node.name);
    }
}


