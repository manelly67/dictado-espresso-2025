import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audio',
  imports: [],
  templateUrl: './audio.html',
  styleUrl: './audio.css',
})
export class Audio {
  @Input() pathToAudio?:string;
  audioError: string | null = null;

  onAudioError() {
    this.audioError = 'The audio file could not be loaded. Please check the file path.';
  }

}
