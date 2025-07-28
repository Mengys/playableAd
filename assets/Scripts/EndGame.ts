import { _decorator, Component, Node } from 'cc';
import super_html_playable from "./super-html/super_html_playable";
const { ccclass, property } = _decorator;

@ccclass('EndGame')
export class EndGame extends Component {
    onEndClick() {
        super_html_playable.game_end();
    }
}
