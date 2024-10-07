'use client';

import {Canvas, Group, Rect, FabricText} from 'fabric';
import {LotteryItem} from '../type';

export class Lottery2D {

    data: LotteryItem[] = [];
    fabric: Canvas;
    layout = {
        col: 5,
        row: 5,
        gap: 10,
        padding: 20,
        width: 0,
    };

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

    start() {
        const g = this.fabric.getObjects().at(0) as Group | undefined;
        if (g) {
            const items = g.getObjects();
            let cur = 0;
            if (cur < items.length - 2) {
                setInterval(() => {
                    if (cur < items.length - 2) {
                        (items[cur] as Group).getObjects()[0].set({stroke: 'green'});
                        this.fabric.renderAll();
                        cur++;
                    }
                }, 1000);
            }
        }
    }

    renderCenterBtn(group: Group) {
        const {width} = this.layout;

        const center = group.getCenterPoint();
        const centerGroup  = new Group([], {hoverCursor: 'pointer'});
        centerGroup.add(new Rect({
            width, height: width,
            fill: 'transparent',
            left: center.x - width / 2,
            top: center.y - width / 2,
            rx: 4, ry: 4,
            stroke: 'green',
            strokeWidth: 2,
        }));
        centerGroup.add(new FabricText('Go', {
            left: center.x - 25,
            top: center.y - 25,
            fill: 'green',
            fontSize: 50,
            hoverCursor: 'pointer',
            moveCursor: 'pointer',
        }));
        centerGroup.on('mousedown', () => {
            this.start();
        });
        return centerGroup;
    }

    renderItem() {
        const {col, row, gap, width} = this.layout;
        const groupW = width * col + (col - 1) * gap;
        const grouH = width * row + (row - 1) * gap;
        const top = (this.fabric.getHeight() - grouH) / 2;
        const left = (this.fabric.getWidth() - groupW) / 2;
        const group = new Group([], {selectable: false, subTargetCheck: true});

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (i > 0 && i < col - 1 && j > 0 && j < row - 1) {
                    continue;
                }
                const left = j * (width + gap);
                const top = i * (width + gap);
                const rect = new Rect({
                    width,
                    height: width,
                    fill: 'transparent',
                    stroke: 'gray',
                    borderColor: 'green',
                    rx: 4,
                    ry: 4,
                });
                const text = new FabricText(`${i},${j}`, {
                    fill: 'green',
                });
                text.set({
                    left:  width / 2 - text.width / 2,
                    top:  width / 2 - text.height /2,
                });
                const itemGroup = new Group([rect, text], {hoverCursor: 'pointer', left, top, evented: true});
                group.add(itemGroup);
            }
        }

        group.add(this.renderCenterBtn(group));
        group.set({
            left, top,
        });
        this.fabric.add(group);
    }
    reset() {
        this.fabric.clear();
    }
}
