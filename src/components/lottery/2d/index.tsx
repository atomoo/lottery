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
                {title: '吉祥馄饨', tip: '玉米鲜肉馄饨\n虾仁鲜肉馄饨\n虾仁小馄饨\n高汤小馄饨'},
                {title: '阿平牛杂', tip: '牛仔粉/面\n阿平牛腩粉/面外加一块萝卜\n备注要青椒酱好吃'},
                {title: '杨国福', tip: ''},
                {title: '德克士', tip: '咖喱鸡块饭套餐'},
                {title: '蜀蜀的粉', tip: '肉夹馍+酸辣粉\n麻辣烫+油饼'},
                {title: '米村拌饭', tip: '随便点拌饭都好吃\n招牌肥牛锅+米\n石板肉酱豆腐+米'},
                {title: '岐俏俏肉夹馍', tip: '肉夹馍+酸辣粉'},
                {title: '醉面', tip: '碗杂肉酱面好吃!\n葱油面香!\n红烧牛肉面经典!'},
                {title: '豫缘虾道', tip: '香辣虾单人餐'},
                {title: '郁弟淮南牛肉汤', tip: '他家牛肉汤好吃'},
                {title: '澳门猪扒包', tip: '香煎猪扒菠萝包好吃必点\n黑椒猪扒包\n香煎鸡扒菠萝包\n'},
                {title: '腾万家隆江猪脚饭', tip: '招牌潮汕隆江猪脚\n不用额外点剁椒备注就给\n右上角收藏有额外红包'},
                {title: '福状元粥焖面', tip: '福状元粥扁豆加肉焖面\n皮蛋瘦肉粥'},
                {title: '蓉亭食贝', tip: '牛肉饭套餐\n鱼香肉丝套餐\n蓉派鸡丝凉面(有点辣)'},
                {title: '沙朗阿甘', tip: '自选汉堡+自选小吃\n鲜虾堡+薯条\n德式培根蘑菇堡(强推!!!)\n'},
                {title: '杨掌柜辣椒炒肉', tip: '辣椒炒肉单人餐\n收藏红包\n肉沫茄子套餐\n西红柿土鸡蛋套餐'},
            ]);
            lottery.current.renderData();
        },
        []
    );

    return (
        <>
            <Image hidden unoptimized priority src={mc} alt='麦麦'  width={450} height={600} id="maimai" />
            <div className="bg-white w-full h-full">
                <canvas ref={canvasRef}></canvas>
            </div>
        </>
    );
}
