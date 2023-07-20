// Hier werden die Karten abgelegt

export default {
  // Anzahl der Bilder
  amount: 20,

  getCards() {
    // Abrufen des ausgewählten Ordnerpfads aus dem Local Storage
    const selectedImageType = localStorage.getItem('selectedImageType');
    let dir = selectedImageType;

    let cards = [];
    for (let i = 1; i <= this.amount; i++) {
      cards.push({
        id: i,
        img: `${dir}${i < 10 ? '0' : ''}${i}.jpg`,
      });
    }
    return cards;
  },
};
