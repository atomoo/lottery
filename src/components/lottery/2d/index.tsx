'use client';

import {useLayoutEffect, useRef} from 'react';
import Image from 'next/image';

import {Lottery2D} from '@/components/lottery/2d/draw';
import mc from '@/public/images/m.jpeg';

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
                {title: '吉祥馄饨', tip: ''},
                {title: '阿平牛杂', tip: ''},
                {title: '杨国福', tip: ''},
                {title: '德克士', tip: ''},
                {title: '蜀蜀的粉', tip: ''},
                {title: '米村拌饭', tip: ''},
                {title: '岐俏俏肉夹馍', tip: ''},
                {title: '醉面', tip: ''},
                {title: '豫缘虾道', tip: ''},
                {title: '郁弟淮南牛肉汤', tip: ''},
                {title: '澳门猪扒包', tip: ''},
                {title: '腾万家隆江猪脚饭', tip: ''},
                {title: '福状元粥焖面', tip: ''},
                {title: '蓉亭食贝', tip: ''},
                {title: '沙朗阿甘', tip: ''},
                {title: '杨掌柜辣椒炒肉', tip: ''},
            ]);
            lottery.current.renderData();
        },
        []
    );

    return (
        <>
            <Image hidden unoptimized src={mc} alt='麦麦'  width={450} height={600} id="maimai" />
            <div className="bg-white w-full h-full">
                <canvas ref={canvasRef}></canvas>
            </div>
        </>
    );
}
