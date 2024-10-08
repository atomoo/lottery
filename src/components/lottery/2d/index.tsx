'use client';

import {useLayoutEffect, useRef} from 'react';
import {Lottery2D} from '@/components/lottery/2d/draw';

export function Lottery2DView() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lottery = useRef<Lottery2D>();

    useLayoutEffect(
        () => {
            const canvas = canvasRef.current;
            if (!canvas || lottery.current) {
                return;
            }
            const parent = canvas.parentElement!;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            lottery.current = new Lottery2D(canvas);
            lottery.current.setData([
                {title: '1', tip: ''},
                {title: '2', tip: ''},
                {title: '3', tip: ''},
                {title: '4', tip: ''},
                {title: '5', tip: ''},
                {title: '6', tip: ''},
                {title: '7', tip: ''},
                {title: '8', tip: ''},
                {title: '9', tip: ''},
                {title: '10', tip: ''},
                {title: '11', tip: ''},
                {title: '12', tip: ''},
                {title: '13', tip: ''},
                {title: '14', tip: ''},
                {title: '15', tip: ''},
                {title: '16', tip: ''},
            ]);
            lottery.current.renderData();
        },
        []
    );

    return (
        <div className="bg-white w-full h-full">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
