import { _decorator, Component, Node, AudioSource, SpriteFrame,Sprite, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {

    @property(Node)
    soundButton: Node = null;

    @property(SpriteFrame)
    soundOn: SpriteFrame;

    @property(SpriteFrame)
    soundOff: SpriteFrame;

    IsSoundEnabled: boolean = true;

    public StopAudio(){
        this.getComponent(AudioSource).pause();
        this.soundButton.getComponent(Sprite).spriteFrame = this.soundOff;
        this.soundButton.getComponent(Button).normalSprite = this.soundOff;
    }

    public StartAudio(){
        this.getComponent(AudioSource).play();
        this.soundButton.getComponent(Sprite).spriteFrame = this.soundOn;
        this.soundButton.getComponent(Button).normalSprite = this.soundOn;
    }

    public ToggleSound(){
        this.IsSoundEnabled = !this.IsSoundEnabled;
        if (this.IsSoundEnabled){
            this.StartAudio();
        } else {
            this.StopAudio();
        }
    }
}
