import React, {useState, useEffect, useRef} from "react";

export default function MicRecorder({ onTranscript }){
  const [recording, setRecording] = useState(false);
  const streamRef = useRef(null);
  const recRef = useRef(null);
  const chunks = useRef([]);

  useEffect(()=> {
    return ()=> {
      if (streamRef.current) streamRef.current.getTracks().forEach(t=>t.stop());
    };
  },[]);

  async function start(){
    if (!streamRef.current){
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = s;
      } catch (e) {
        return alert("Microphone denied");
      }
    }
    chunks.current = [];
    const rec = new MediaRecorder(streamRef.current);
    recRef.current = rec;
    rec.ondataavailable = e => chunks.current.push(e.data);
    rec.onstop = async () => {
      // simple local mock: notify transcript update
      const newBlock = "This is a recorded sample segment.";
      onTranscript?.(t => (t ? t + "\n" + newBlock : newBlock));
    };
    rec.start();
    setRecording(true);
  }
  function stop(){
    recRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-sm text-slate-300">{ recording ? "Recording..." : "Microphone ready" }</div>
      <div>
        {!recording ?
          <button onClick={start} className="px-4 py-2 rounded bg-neon-cyan text-black">Record</button> :
          <button onClick={stop} className="px-4 py-2 rounded bg-rose-500">Stop</button>
        }
      </div>
    </div>
  );
}
