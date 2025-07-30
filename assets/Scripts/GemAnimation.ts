import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GemAnimation')
export class GemAnimation extends Component {
    @property({ tooltip: "Высота подъёма объекта" })
    public amplitude: number = 100;

    private elapsedTime: number = 0;
    private duration: number = 2; // полный цикл: подъем + опускание
    private startPos: Vec3 = new Vec3();

    start () {
        // Запоминаем начальную позицию объекта
        this.startPos = this.node.getPosition();
    }

    update (deltaTime: number) {
        this.elapsedTime += deltaTime;
        // Считаем нормализованное время от 0 до 1 за полный цикл
        let t = (this.elapsedTime % this.duration) / this.duration;
        // Сдвигаем фазу, чтобы подъем занял 1 секунду, а опускание следующую секунду
        // Значение синуса меняется от 0 до 1 и обратно по синусоиде за duration
        let offsetY = this.amplitude * Math.sin(t * Math.PI); // sin(0..pi) от 0 к 1 и обратно к 0

        // Обновляем позицию объекта по оси Y с учетом смещения
        this.node.setPosition(this.startPos.x, this.startPos.y + offsetY, this.startPos.z);
    }
}


