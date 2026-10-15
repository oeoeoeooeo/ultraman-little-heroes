"""Rebuild all cheers locally on macOS. No network, API or credentials.

Run with --prepare, generate the nine AIFF files using the printed say commands,
then --mix. This keeps each spoken line separate from its musical accent.
"""
import argparse
import array
import json
import math
from pathlib import Path
import shlex
import subprocess
import tempfile
import wave

ROOT = Path(__file__).resolve().parent.parent
WORK = Path(tempfile.gettempdir()) / 'ultraman-voice-v150'
RATE = 24000
LINES = {
    'welcome': ('小英雄，出發囉！[[slnc 240]] 光之力量，啟動！', 208),
    'correct': ('答對了！[[slnc 300]] 太棒了，你觀察得很仔細！', 195),
    'transform': ('變身！[[slnc 240]] 光之力量，全開！', 205),
    'ready': ('小英雄，準備好了！[[slnc 230]] 一起守護地球！', 205),
    'beam': ('光之力量！[[slnc 260]] 發射！', 205),
    'rescue': ('救援隊，出動！[[slnc 240]] 把溫暖的光，送給好朋友！', 205),
    'kindness': ('友善之光！[[slnc 240]] 耶！我們一起幫助了好朋友！', 200),
    'victory': ('耶！任務成功！[[slnc 280]] 擊個掌，你們超棒！', 205),
    'challenge': ('注意囉！[[slnc 250]] 小挑戰來了，仔細看！', 200),
}


def pcm(path, samples):
    data = array.array('h', (round(max(-1, min(1, x))*32767) for x in samples))
    with wave.open(str(path), 'wb') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(RATE)
        f.writeframes(data.tobytes())


def accent(notes, duration=.43):
    out = [0.0] * round(duration*RATE)
    for j, hz in enumerate(notes):
        start = .03+j*.065
        for i in range(round(.21*RATE)):
            t = i/RATE
            at = round(start*RATE)+i
            if at >= len(out):
                break
            env = min(1, t/.009)*math.exp(-t*19)*min(1, (.21-t)/.025)
            out[at] += .15*env*(math.sin(2*math.pi*hz*t)+.22*math.sin(4*math.pi*hz*t))
    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--prepare', action='store_true')
    parser.add_argument('--mix', action='store_true')
    args = parser.parse_args()
    WORK.mkdir(exist_ok=True)
    if args.prepare:
        for name, (line, speed) in LINES.items():
            text = WORK / (name+'.txt')
            text.write_text(line)
            print(shlex.join(['say', '-v', 'Flo (中文（台灣）)', '-r', str(speed), '-f', str(text), '-o', str(WORK/(name+'.aiff'))]))
    if not args.mix:
        return
    report = []
    for name in LINES:
        raw = WORK/(name+'-speech.wav')
        subprocess.run(['ffmpeg','-v','error','-y','-i',str(WORK/(name+'.aiff')),
                        '-af','loudnorm=I=-18:TP=-3:LRA=7,afade=t=in:d=0.015',
                        '-ar',str(RATE),'-ac','1',str(raw)],check=True)
        with wave.open(str(raw),'rb') as f:
            speech = array.array('h', f.readframes(f.getnframes()))
        # Only transformation / beam get a launch accent. No accent talks over words.
        intro = accent([330,495,660],.38) if name in ['transform','beam'] else []
        tail = accent([523,659,784,1047] if name in ['victory','correct'] else [659,988])
        samples = [0.0]*round(.13*RATE)+intro
        if intro:
            samples += [0.0]*round(.13*RATE)
        samples += [x/32768 for x in speech]+[0.0]*round(.18*RATE)+tail+[0.0]*round(.13*RATE)
        mixed=WORK/(name+'-mixed.wav')
        pcm(mixed,samples)
        target=ROOT/'assets'/('voice-'+name+'.mp3')
        subprocess.run(['ffmpeg','-v','error','-y','-i',str(mixed),'-ar',str(RATE),'-ac','1','-b:a','64k',str(target)],check=True)
        report.append({'id':name,'seconds':round(len(samples)/RATE,3),'peakDB':round(20*math.log10(max(abs(x) for x in samples)),2),'bytes':target.stat().st_size})
    (WORK/'report.json').write_text(json.dumps(report,indent=2))
    print(json.dumps(report,indent=2))


if __name__ == '__main__':
    main()
