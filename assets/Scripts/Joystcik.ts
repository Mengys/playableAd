import { _decorator, Component, Node, input, Input, EventTouch, Vec2, Vec3, UITransform, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Joystick')
export class Joystick extends Component {
    @property(Node)
    ring: Node = null;

    @property(Node)
    dot: Node = null;

    @property(Node)
    tutorial: Node = null;

    @property
    radius: number = 100; // радиус джойстика

    private _dir: Vec2 = new Vec2(0, 0);
    private _isTouching: boolean = false;
    private _ringPosition: Vec3 = new Vec3(0, 0, 0);

    protected start(): void {
        this.ring.active = false;
    }

    onLoad() {
        this.node.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
    }

    _onTouchStart(event: EventTouch) {

        this.ring.active = true;
        this._isTouching = true;
        //this._handleTouch(event);
        const uiPos = event.getUILocation();
        const localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(uiPos.x, uiPos.y));
        console.log(uiPos);
        console.log(new Vec3(uiPos.x, uiPos.y));
        console.log(localPos);
        this.ring.setPosition(localPos);
        this._ringPosition = localPos;
        this.tutorial.active = false;
    }

    _onTouchMove(event: EventTouch) {
        this._handleTouch(event);
    }

    _onTouchEnd(event: EventTouch) {
        this.ring.active = false;
        this._isTouching = false;
        this.dot.setPosition(0, 0, 0);
        this._dir.set(0, 0);
        this.node.emit('JoystickMove', this._dir);
    }

    _handleTouch(event: EventTouch) {
        const uiPos = event.getUILocation();
        const localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(uiPos.x, uiPos.y));
        localPos.subtract(this._ringPosition);
        let dir = new Vec2(localPos.x, localPos.y);
        const len = dir.length();
        if (len > this.radius) {
            dir = dir.normalize().multiplyScalar(this.radius);
        }
        this.dot.setPosition(dir.x, dir.y, 0);
        this._dir = new Vec2(dir.x / this.radius, dir.y / this.radius); // значения от -1 до 1
        this.node.emit('JoystickMove', this._dir);
    }

    getDirection(): Vec2 {
        return this._dir;
    }

    public Reset(){
        this._isTouching = false;
        this.dot.setPosition(0, 0, 0);
        this._dir.set(0, 0);
        this.node.emit('JoystickMove', this._dir);
    }
}
