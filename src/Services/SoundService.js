import  playSound  from "../assets/sounds/play.mp3";
import   hitSound from "../assets/sounds/hit.wav"


 export  const SoundService={

         //sounds
        gameplay:new Audio(playSound) ,
        gamehit: new Audio(hitSound),

        playStartSound(){
          this.gameplay.play();
          this.gameplay.loop=true;

        },

        playStopSound(){
         this.gameplay.pause();

        },

        playHitSound(){
           this.gamehit.play();

        },

        playStopHitSound(){
            this.gamehit.pause();

        }

    

}