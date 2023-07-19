//_______________________________________________________________________________________
// Hier werden die Karten abgelegt
import { myVariable } from './picture_selection.js';
export default   {

  // Standartordnerpfad der Bilder
  dir: myVariable,

  // Anzahl der Bilder
  amount: 16,

  // Funktion zum Aktualisieren des Ordnerpfads
  //updateDir(newDir) {
      //this.dir = newDir;
    //},
  
  

  getCards() {
      let cards = [];
      for (let i=1; i<=this.amount; i++) {
          cards.push({
              id: i,
              img: `${this.dir}${i < 10 ? '0' : ''}${i}.jpg`
          });
      }
      return cards;
  }
}
 
