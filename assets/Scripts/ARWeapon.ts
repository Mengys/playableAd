import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Bullet } from './Bullet';

const { ccclass, property } = _decorator;

@ccclass('ARWeapon')
export class ARWeapon extends Component {

    @property(Prefab)
    bulletPrefab: Prefab = null;
    
    @property(Node)
    firePointRight: Node = null;  // точка появления пули (например, прикрепленная к оружию)

    @property(Node)
    firePointLeft: Node = null;  // точка появления пули (например, прикрепленная к оружию)

    fireCooldown: number = 0.5;
    private _timeSinceLastShot: number = 0;

    right: boolean = true;

    update(deltaTime: number) {
        this._timeSinceLastShot += deltaTime;
        if (this._timeSinceLastShot >= this.fireCooldown) {
            
            if (this.right){
                this.fireBullet(this.firePointRight);
            } else {
                this.fireBullet(this.firePointLeft);
            }
            this.right = !this.right;

            this._timeSinceLastShot = 0;
        }
    }

    private fireBullet(firePoint : Node) {
        if (!this.bulletPrefab || !firePoint) {
            console.warn('Bullet prefab or fire point not assigned!');
            return;
        }
        const bullet = instantiate(this.bulletPrefab);
        bullet.setPosition(firePoint.worldPosition);
        // Добавляем пулю в сцену (например, в Canvas или отдельный слой)
        this.node.parent.addChild(bullet);

        // Здесь можно добавить скрипт движения пули — например bullet.getComponent(Bullet).startMove();
        bullet.getComponent(Bullet).SetDir(firePoint.forward);
    }
}


