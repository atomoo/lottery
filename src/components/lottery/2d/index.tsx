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
            lottery.current.renderItem();
        },
        []
    );

    return (
        <div className="bg-white w-full h-full">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
