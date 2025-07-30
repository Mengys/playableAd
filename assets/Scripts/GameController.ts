import { _decorator, Component, Node, AudioClip, AudioSource,find } from 'cc';
import { ARWeapon } from './ARWeapon';
import { Enemy } from './Enemy';
import { Joystick } from './Joystcik';
import { Character } from './Character';
import { RocketWeapon } from './RocketWeapon';
import { ExpBar1 } from './ExpBar1';
import { AudioController } from './AudioController';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({ type:[Node]})
    enemies: Node[] = [];

    @property(Node)
    player: Node = null;

    @property(Node)
    hand: Node = null;

    @property(Node)
    tutorial: Node = null;

    @property(Node)
    joystick: Node = null;

    @property(Node)
    pointer: Node = null;

    @property(Node)
    expBar1: Node = null;

    @property(Node)
    expBar2: Node = null;

    @property({ type:[Node]})
    buttons: Node[] = [];

    @property(AudioSource)
    audioSource: AudioSource = null;

    @property( AudioClip)
    upgradeAudio: AudioClip = null;

    currentBar: Node;
    exp: number = 0;
    kills: number = 0;
    wave: number = 1;
    isARWeapon: boolean = true;
    audioController: AudioController = null;

    start() {
        this.audioController = find("AudioController").getComponent(AudioController);
        for (let i = 0; i < this.enemies.length; i++){
            this.enemies[i].active = false;
        }
        this.player.getComponent(ARWeapon).StopFire();
        this.player.getComponent(RocketWeapon).StopFire();
        this.joystick.active = false;
        for (let i = 0; i < this.buttons.length; i++){
            this.buttons[i].active = false;
        }
        this.buttons[0].active = true;
        this.buttons[1].active = true;
        //this.pointer.active = false;
        this.tutorial.active = false;
        this.currentBar = this.expBar1;
        this.currentBar.active = true;
    }

    public StartFirstWave(){
        for (let i = 0; i < 7; i++){
            this.enemies[i].active = true;
            this.enemies[i].getComponent(Enemy).Init();
        }
        this.hand.active = false;
        this.player.getComponent(ARWeapon).StartFire();
        this.joystick.active = true;
        this.buttons[0].active = false;
        this.buttons[1].active = false;
        if (this.audioController.IsSoundEnabled){
            this.audioSource.clip = this.upgradeAudio;
            this.audioSource.play();
        }
        this.tutorial.active = true;
    }

    public AddExp(){
        this.exp++;
        this.currentBar.getComponent(ExpBar1).AddExp();
        if (this.exp >= 10 && this.wave == 1) {
            this.wave = 2;
            this.exp = 10;
            this.StartChoseReward();
        }
        if (this.exp >= 20 && this.wave == 2) {
            this.StartChoseReward2();
        }
    }

    public AddKill(){
        this.kills++;
        if (this.kills == 7) {
            //this.pointer.active = true;
        }
        if (this.kills == 17) {
            //this.pointer.active = true;
        }
    }

    public StartChoseReward(){
        this.currentBar.getComponent(ExpBar1).Full();
        let exps = this.findNodesByName(this.node.getParent(),"Exp");
        for (let i = 0; i < exps.length; i++) {
            exps[i].destroy();
        }

        for (let i = 0; i < 7; i++){
            this.enemies[i].destroy();
        }

        this.player.getComponent(ARWeapon).StopFire();
        this.player.getComponent(RocketWeapon).StopFire();
        this.joystick.getComponent(Joystick).Reset();
        this.joystick.active = false;
        this.buttons[2].active = true;
        this.buttons[3].active = true;
        //this.pointer.active = false;
    }

    public SpeedUp(){
        this.StartSecondWave();
        this.player.getComponent(Character).SetSpeed(25);
    }

    public Rockets(){
        this.isARWeapon = false;
        this.StartSecondWave();
    }

    public StartSecondWave(){
        for (let i = 7; i < 17; i++){
            this.enemies[i].active = true;
            this.enemies[i].getComponent(Enemy).Init();
        }
        if(this.isARWeapon){
            this.player.getComponent(ARWeapon).StartFire();
        } else {
            this.player.getComponent(RocketWeapon).StartFire();
        }
        if (this.audioController.IsSoundEnabled){
            this.audioSource.clip = this.upgradeAudio;
            this.audioSource.play();
        }
        this.joystick.active = true;
        this.buttons[2].active = false;
        this.buttons[3].active = false;
        this.currentBar.active = false;
        this.currentBar = this.expBar2;
        this.currentBar.active = true;
    }

    public StartChoseReward2(){
        this.currentBar.getComponent(ExpBar1).Full();
        let exps = this.findNodesByName(this.node.getParent(),"Exp");
        for (let i = 0; i < exps.length; i++) {
            exps[i].destroy();
        }
        for (let i = 7; i < 17; i++){
            this.enemies[i].destroy();
        }
        //this.pointer.active = false;
        this.player.getComponent(ARWeapon).StopFire();
        this.player.getComponent(RocketWeapon).StopFire();
        this.joystick.getComponent(Joystick).Reset();
        this.joystick.active = false;
        this.buttons[4].active = true;
        this.buttons[5].active = true;
    }

    findNodesByName(root: Node, targetName: string, result: Node[] = []): Node[] {
        if (root.name === targetName) {
            result.push(root);
        }
        for (const child of root.children) {
            this.findNodesByName(child, targetName, result);
        }
        return result;
    }
}
