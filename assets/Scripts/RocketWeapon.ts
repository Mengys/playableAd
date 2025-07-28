import { _decorator, Component, Node, Prefab, instantiate,AudioSource, } from 'cc';
import { Rocket } from './Rocket';

const { ccclass, property } = _decorator;

@ccclass('RocketWeapon')
export class RocketWeapon extends Component {

    @property(Prefab)
    rocketPrefab: Prefab = null;
    
    @property(Node)
    firePointRight: Node = null;  // точка появления пули (например, прикрепленная к оружию)

    @property(Node)
    firePointLeft: Node = null;  // точка появления пули (например, прикрепленная к оружию)

    @property(AudioSource)
    audioSource: AudioSource = null;

    fireCooldown: number = 0.5;
    private _timeSinceLastShot: number = 0;
    stop: boolean = false;

    right: boolean = true;

    update(deltaTime: number) {
        if (this.stop) return;
        this._timeSinceLastShot += deltaTime;
        if (this._timeSinceLastShot >= this.fireCooldown) {
            
            if (this.right){
                this.fireRocket(this.firePointRight);
            } else {
                this.fireRocket(this.firePointLeft);
            }
            this.right = !this.right;

            this._timeSinceLastShot = 0;
        }
    }

    private fireRocket(firePoint : Node) {
        if (!this.rocketPrefab || !firePoint) {
            console.warn('Bullet prefab or fire point not assigned!');
            return;
        }
        this.audioSource.play();
        const bullet = instantiate(this.rocketPrefab);
        bullet.setPosition(firePoint.worldPosition);
        // Добавляем пулю в сцену (например, в Canvas или отдельный слой)
        this.node.parent.addChild(bullet);

        // Здесь можно добавить скрипт движения пули — например bullet.getComponent(Bullet).startMove();
        bullet.getComponent(Rocket).SetDir(firePoint.forward);
    }

    public StopFire(){
        this.stop = true;
    }

    public StartFire(){
        this.stop = false;
    }
}


