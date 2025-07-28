import { _decorator, Component, Node, Vec3,RigidBody,ICollisionEvent} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Exp')
export class Exp extends Component {

    protected start(): void {
        const rigidBody = this.getComponent(RigidBody);
        rigidBody.useCCD = true;
    }
}
