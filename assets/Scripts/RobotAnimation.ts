import { _decorator, Component, SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RobotAnimation')
export class RobotAnimation extends Component {
    @property(SkeletalAnimation)
    skelAnim: SkeletalAnimation = null;

    state: string = "";

    playAnim(animName: string, speed: number) {
        if (animName != this.state){
            if (this.skelAnim) {
                let state = this.skelAnim.getState(animName);
                state.speed = speed/11;
                this.skelAnim.play(animName);
                this.state = animName;
            }
        }
    }
}
