import { _decorator, Component, Node, Prefab, instantiate,AudioSource,find } from 'cc';
import { Bullet } from './Bullet';
import { AudioController } from './AudioController';

const { ccclass, property } = _decorator;

@ccclass('ARWeapon')
export class ARWeapon extends Component {

    @property(Prefab)
    bulletPrefab: Prefab = null;
    
    @property(Node)
    firePointRight: Node = null;  // точка появления пули (например, прикрепленная к оружию)

    @property(Node)
    firePointLeft: Node = null;  // точка появления пули (например, прикрепленная к оружию)

    @property(AudioSource)
    audioSource: AudioSource = null;

    fireCooldown: number = 0.15;
    private _timeSinceLastShot: number = 0;
    stop: boolean = false;

    right: boolean = true;
    audioController: AudioController = null;

    protected start(): void {
        this.audioController = find("AudioController").getComponent(AudioController);
    }   

    update(deltaTime: number) {
        if (this.stop) return;
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
        if (this.audioController.IsSoundEnabled){
            this.audioSource.play();
        }
        const bullet = instantiate(this.bulletPrefab);
        bullet.setPosition(firePoint.worldPosition);
        // Добавляем пулю в сцену (например, в Canvas или отдельный слой)
        this.node.parent.addChild(bullet);

        // Здесь можно добавить скрипт движения пули — например bullet.getComponent(Bullet).startMove();
        bullet.getComponent(Bullet).SetDir(firePoint.forward);
    }

    public StopFire(){
        this.stop = true;
    }

    public StartFire(){
        this.stop = false;
    }
}


