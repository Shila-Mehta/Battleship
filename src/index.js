import { ThemeManager } from "./Components/ThemeManager";
import { GameService } from "./Services/GameServices";
import "./Styles/main.css";


document.addEventListener('DOMContentLoaded',()=>{
ThemeManager.applyRandomTheme();

 document.querySelector('.legend-toggle').addEventListener('click',()=>{
    document.querySelector('.legend-panel').classList.toggle('hidden');

  })

 document.querySelector('.guide-book').addEventListener('click',()=>{
    document.querySelector('.guide-container').classList.toggle('hidden');
 })


 document.getElementById('theme-toggle').addEventListener('click',()=>{
    ThemeManager.toggleDarkLight();
})

GameService.startGame();


})




