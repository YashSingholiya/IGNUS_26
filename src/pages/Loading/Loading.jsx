import React from "react";

export default function Loading({ message = "Loading...", hint = "" }) {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            <div className="relative z-10 w-[90%] max-w-sm p-6 rounded-2xl bg-white/10 border border-white/20 shadow-2xl flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full border-4 border-white/20 border-t-4 border-t-[#FFD966] animate-spin" />
                <h3 className="text-lg font-semibold text-white">{message}</h3>
                {hint ? <p className="text-sm text-white/70 text-center">{hint}</p> : null}

                <div className="w-36 h-2 rounded-full bg-white/10 overflow-hidden mt-2">
                    <div className="h-full bg-gradient-to-r from-[#FFD966] to-[#FFA726] animate-[progress_2.5s_linear_infinite]" style={{ width: '55%' }} />
                </div>
            </div>

            <style>{`@keyframes progress{0%{transform:translateX(-100%)}50%{transform:translateX(0)}100%{transform:translateX(100%)}}`}</style>
        </div>
    );
}
