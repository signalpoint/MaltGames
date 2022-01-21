# Audio

Used TuxGuitar to compose generic sounds, exported to wav, converted to mp3.

- success.mp3 (used a fade in/out with ffmpeg because of guitar sound "click")
- correct.mp3
- question.mp3

```
ffmpeg -i color-picker--success.wav -vn -ar 44100 -ac 2 -b:a 192k -filter_complex "afade=d=0.5, areverse, afade=d=0.5, areverse" success.mp3
ffmpeg -i color-picker--correct.wav -vn -ar 44100 -ac 2 -b:a 192k correct.mp3
ffmpeg -i color-picker--incorrect.wav -vn -ar 44100 -ac 2 -b:a 192k incorrect.mp3
ffmpeg -i color-picker--question.wav -vn -ar 44100 -ac 2 -b:a 192k question.mp3
scp -R *.mp3 games/color-picker/media/
```
