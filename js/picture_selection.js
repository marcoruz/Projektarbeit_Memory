// Funktionen zur Bildauswahl
function fruits() {
  const dir = '/img/fruits_picture/';
  console.log(dir);
  // Speichern des ausgewählten Ordnerpfads im Local Storage
  localStorage.setItem('selectedImageType', dir);
  // Neu laden der Seite, um die memory_cards.js mit dem aktualisierten Pfad zu verwenden
  location.reload();
}

function Hardware() {
  const dir = '/img/Hardware_picture/';
  console.log(dir);
  // Speichern des ausgewählten Ordnerpfads im Local Storage
  localStorage.setItem('selectedImageType', dir);
  // Neu laden der Seite, um die memory_cards.js mit dem aktualisierten Pfad zu verwenden
  location.reload();
}
//_________________________________________________________________