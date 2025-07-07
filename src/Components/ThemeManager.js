import { ColorThemes } from "../Data/ColorThemes"


export  const ThemeManager={

currentTheme:null,
isDarkMode:false, // default to light

  applyRandomTheme(){

    // randomly picking the index for theme in themeList
    const randomTheme=Math.floor(Math.random()*ColorThemes.length);

    this.currentTheme=ColorThemes[randomTheme];

    // light mode default
    this.isDarkMode=false;
    this.applyTheme();

  },


toggleDarkLight(){
  this.isDarkMode=!this.isDarkMode;
  this.applyTheme();

},


applyTheme(){
// html element 
  const root=document.documentElement;

     const themeVars=this.isDarkMode? this.currentTheme.dark:this.currentTheme.light;
        for(const [key,value]  of Object.entries(themeVars)){
          root.style.setProperty(key,value);

        }

      //update toggle emoji
      document.getElementById('theme-toggle').textContent=this.isDarkMode?"☀️" : "🌙";


}

}
  