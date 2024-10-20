import {Lottery2DView} from '@/components/lottery/2d';


export default function Home() {
    return (
        <div className="h-screen font-[family-name:var(--font-geist-sans)]">
            <Lottery2DView />
            {/* <div className="fixed bottom-0 right-0 text-gray-100">Data from L</div> */}
        </div>
    );
}
