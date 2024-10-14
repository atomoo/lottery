'use client';

import {Canvas, FabricImage, Group, Image, Rect, Textbox} from 'fabric';
import {LotteryItem} from '../type';

export class Lottery2D {

    data: LotteryItem[] = [];
    fabric: Canvas;
    group: Group = new Group();
    layout = {
        col: 5,
        row: 5,
        gap: 10,
        padding: 20,
        width: 0,
    };
    timer: number = 0;
    count = 0;
    processing = false;

    constructor(canvas: HTMLCanvasElement) {
        this.fabric = new Canvas(canvas, {enableRetinaScaling: true, hoverCursor: 'pointer'});
        this.setLayout();
        // this.bindEvent();
    }

    bindEvent() {
        this.fabric.on('mouse:down', (options) => {
            const item = options.target;
            console.log(options,item);
        });
    }

    setData(data: LotteryItem[]) {
        this.data = data;
    }

    setLayout() {
        const min = Math.min(this.fabric.getWidth(), this.fabric.getHeight());
        const {padding, gap, col} = this.layout;
        const itemWidth = (min - padding * 2 - (col - 1) * gap) / col;
        this.layout.width = itemWidth;
    }

    finish(resultIndex: number) {
        console.log(this.data[resultIndex]);
        console.log(this.fabric.getObjects()[0].left, this.fabric.getObjects()[0].top);
        for (const item of this.group.getObjects()) {
            const children = (item as Group).getObjects();
            const text = children.find(child => child.type === 'textbox') as Textbox;
            if (text.text === this.data[resultIndex].title) {
                (item as Group).clone().then(g => {
                    const {x, y} = this.fabric.getCenterPoint();
                    const {x: itemX, y: itemY} = item.getCenterPoint();
                    g.set({left: itemX, top: itemY, fill: 'red', selectable: false});
                    g.scale(0.1);
                    console.log(this.group.left,this.group.top, '||', g.getX(), g.getY(), '||', g.left, g.top);
                    this.fabric.add(g);
                    this.fabric.renderAll();
                    setTimeout(() => {
                        g.animate(
                            {left: x - g.width / 2, top: y - g.width / 2,scaleX: 1, scaleY: 1},
                            {onChange: this.fabric.renderAll.bind(this.fabric), duration: 1000}
                        );
                    }, 0);
                    this.processing = false;
                    g.on('mousedown', () => {
                        this.fabric.remove(g);
                    });
                }).catch(err => console.log(err));
                break;
            }
        }
    }

    start() {
        if (this.processing) {
            return;
        }
        const g = this.fabric.getObjects().at(0) as Group | undefined;
        if (g) {
            this.count++;
            this.processing = true;
            if (this.count > 3) {
                const maimai = document.getElementById('maimai') as  HTMLImageElement | null;
                if (maimai) {
                    FabricImage.fromURL(maimai.src).then(img => {
                        if (img) {
                            const {x, y} = this.fabric.getCenterPoint();
                            img.set({left: x - img.width / 2, top: y - img.height / 2, subTargetCheck: true, selectable: false});
                            this.fabric.add(img);
                            this.fabric.renderAll();
                        }
                    }).catch(console.error);
                }
                return;
            }
            const result = Math.floor(Math.random() * this.data.length);
            const items = g.getObjects();
            let cur = 0;
            this.timer = window.setInterval(() => {
                items.forEach(item => {
                    const rect = (item as Group).getObjects()
                        .find(child => child.type === 'rect');
                    rect?.set({fill: 'white'});
                    const text = (item as Group).getObjects()
                        .find(child => child.type === 'textbox') as Textbox;
                    text.set({fill: 'green'});
                });
                // FIXME: 优化
                for (const item of items) {

                    const children = (item as Group).getObjects();
                    const text = children.find(child => child.type === 'textbox') as Textbox;
                    if (text.text === this.data[cur % this.data.length].title) {
                        text.set({fill: 'white'});
                        const rect = children.find(child => child.type === 'rect');
                        rect?.set({fill: 'green'});
                    }
                }
                this.fabric.renderAll();
                if (cur === this.data.length * 5 + result ) {
                    window.clearInterval(this.timer);
                    this.timer = 0;
                    this.finish(result);
                    return;
                }
                cur += 1;
            }, 100);
        }
    }

    renderCenterBtn(group: Group) {
        const {width} = this.layout;

        const center = group.getCenterPoint();
        const centerGroup  = new Group([], {selectable: false,hoverCursor: 'pointer'});
        centerGroup.add(new Rect({
            width, height: width,
            fill: 'transparent',
            left: center.x - width / 2,
            top: center.y - width / 2,
            rx: 4, ry: 4,
            stroke: 'green',
            strokeWidth: 2,
        }));
        centerGroup.add(new Textbox('Go', {
            left: center.x - 25,
            top: center.y - 25,
            fill: 'green',
            hoverCursor: 'pointer',
            moveCursor: 'pointer',
        }));
        centerGroup.on('mousedown', () => {
            this.start();
        });
        return centerGroup;
    }

    getCurrentData(curRow: number, curCol: number) {
        const {row, col} = this.layout;
        if (curRow === 0) {
            return this.data[curCol];
        }
        if (curRow > 0 && curRow < row - 1) {
            if (curCol === 0) {
                return this.data.at(curRow * -1);
            }
            if (curCol === col - 1) {
                return this.data.at(col + curRow - 1);
            }
        }
        return this.data.at((row - 1) * -1 - curCol);
    }

    renderItem(item: LotteryItem) {
        const {width} = this.layout;
        const rect = new Rect({
            width,
            height: width,
            fill: 'transparent',
            stroke: 'gray',
            borderColor: 'green',
            rx: 4,
            ry: 4,
        });
        const text = new Textbox(item.title, {
            fill: 'green',
            fontSize: 14,
            textAlign: 'center',
            splitByGrapheme: true,
            width,
        });
        text.set({
            left:  width / 2 - text.width / 2,
            top:  width / 2 - text.height /2,
        });
        const itemGroup = new Group([rect, text], {hoverCursor: 'pointer', evented: true});
        return itemGroup;
    }

    renderData() {
        const {col, row, gap, width} = this.layout;
        const groupW = width * col + (col - 1) * gap;
        const groupH = width * row + (row - 1) * gap;
        const top = (this.fabric.getHeight() - groupH) / 2;
        const left = (this.fabric.getWidth() - groupW) / 2;
        const group = new Group([], {selectable: false, subTargetCheck: true});
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (i > 0 && i < col - 1 && j > 0 && j < row - 1) {
                    continue;
                }
                const cur = this.getCurrentData(i,j);
                if (cur) {
                    const left = j * (width + gap);
                    const top = i * (width + gap);
                    const itemGroup = this.renderItem(cur);
                    itemGroup.set({
                        left, top,
                    });
                    group.add(itemGroup);
                }
            }
        }

        group.add(this.renderCenterBtn(group));
        group.set({
            left, top,
        });
        this.group = group;
        this.fabric.add(group);
    }
    reset() {
        this.fabric.clear();
    }
}
