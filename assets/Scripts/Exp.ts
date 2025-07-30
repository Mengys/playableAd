import { _decorator, Component, Node, Vec3,RigidBody,ICollisionEvent} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Exp')
export class Exp extends Component {

    protected start(): void {
        const rigidBody = this.getComponent(RigidBody);
        // rigidBody.useCCD = true;
        rigidBody.setLinearVelocity(new Vec3(this.getRandomFloat(-10,10),5,this.getRandomFloat(-10,10)));
    }

    getRandomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
