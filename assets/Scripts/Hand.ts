import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hand')
export class Hand extends Component {

    @property(Node)
    target0: Node = null;

    @property(Node)
    target1: Node = null;

    @property
    speed: number = 2; // Скорость движения (единицы в секунду)

    @property
    waitTime: number = 2; // Время ожидания в секундах на таргете

    private _moveToTarget1: boolean = true;
    private _waiting: boolean = false;
    private _waitTimer: number = 0;

    protected start(): void {
        this.node.setPosition(this.target0.position);
    }

    update(deltaTime: number) {
        if (!this.target0 || !this.target1) return;

        if (this._waiting) {
            // В режиме ожидания уменьшает таймер
            this._waitTimer -= deltaTime;
            if (this._waitTimer <= 0) {
                this._waiting = false;
            }
            return;
        }

        const targetNode = this._moveToTarget1 ? this.target1 : this.target0;
        const currentPos = this.node.position;
        const targetPos = targetNode.position;

        const direction = new Vec3();
        Vec3.subtract(direction, targetPos, currentPos);
        const distanceToTarget = direction.length();

        if (distanceToTarget < 0.01) {
            // Дошли до цели, запускаем таймер ожидания
            this._waiting = true;
            this._waitTimer = this.waitTime;
            this._moveToTarget1 = !this._moveToTarget1; // Меняем цель для следующего движения
            return;
        }

        direction.normalize();

        const moveDistance = this.speed * deltaTime;

        if (moveDistance >= distanceToTarget) {
            this.node.setPosition(targetPos);
            this._waiting = true;
            this._waitTimer = this.waitTime;
            this._moveToTarget1 = !this._moveToTarget1;
        } else {
            const moveDelta = direction.multiplyScalar(moveDistance);
            this.node.setPosition(currentPos.add(moveDelta));
        }
    }
}
