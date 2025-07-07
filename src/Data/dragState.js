export  const dragState={
   ship:null,


   set(shipData){
    this.ship=shipData;
   },

   clear(){
    this.ship=null;
   },
   get(){
    return this.ship;
   }

}