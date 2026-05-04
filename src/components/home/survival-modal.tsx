import { SPONSOR_ADS } from "./sponsor-ads";

type SurvivalModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SurvivalModal({ isOpen, onClose }: SurvivalModalProps) {
  if (!isOpen) return null;

  const ad = SPONSOR_ADS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="retro-window w-full max-w-lg animate-in fade-in zoom-in duration-200 shadow-2xl">
        <div className="retro-titlebar flex justify-between items-center">
          <span>생존_축하_메시지.exe</span>
          <button onClick={onClose} className="retro-title-button hover:bg-red-500 hover:text-white transition-colors" aria-label="닫기">
            ×
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="mb-4 text-6xl">🎉</div>
          <h2 className="mb-2 text-2xl font-black text-blue-800">[생존 성공] 골든타임을 확보하셨습니다!</h2>
          <p className="mb-6 text-slate-700 font-medium">과제 지옥에서 탈출한 당신, 이제 남는 시간에 우리 동아리/학과 굿즈 구경 어떠세요?</p>
          
          <a 
            href={ad.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block rounded-lg border-2 border-dashed border-blue-400 bg-blue-50 p-4 transition-all hover:bg-blue-100 hover:border-blue-500"
          >
            <div className="mb-1 text-sm font-bold text-blue-600">{ad.advertiser}</div>
            <div className="mb-2 text-lg font-black text-slate-900">{ad.headline}</div>
            <div className="text-sm text-slate-600">{ad.body}</div>
            <div className="mt-4 retro-button bg-yellow-400 text-black border-black border-2 inline-block px-6 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]">
              기프트투데이 구경하기 ➡️
            </div>
          </a>
          
          <button 
            onClick={onClose}
            className="mt-4 text-sm text-slate-500 underline hover:text-slate-800"
          >
            괜찮습니다, 남은 시간에 진짜 과제를 하겠습니다.
          </button>
        </div>
      </div>
    </div>
  );
}
