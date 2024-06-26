Module.register("paevajaanud", {
  // vaikimisi config
  defaults: {
    textColor: "white",
    dates: [
      // sisesta kuupäev formaadis 'dd/MM/yyyy'
      { name: "Aasta 2025", date: "01/01/2025" },
      { name: "Aasta 2024", date: "01/01/2024" },
    ],
  },

  start: function () {
    var self = this;
    setInterval(function () {
      self.updateDom();
    }, 1000*60*5); //iga 5 min tagant uuendab
  },

  getDaysLeft: function (i) {
    const date = Date.now();
    
    const formattedDate = this.dateFormat(this.config.dates[i].date);
    const targetDate = new Date(formattedDate);
    
    const difference = targetDate - date;
    
    // tagastab päevade arvu, jagades ajavahemiku millisekundite arvuga ühes päevas
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  },

  //võtab configis kirjutatud dd/MM/yyyy formati ja tõstab selle ümber MM/dd/yyyy formaati, mis on Date() funktsioonis vajalik
  dateFormat: function (date) {
    const dd = date.split("/")[0];
    const mm = date.split("/")[1];
    const yyyy = date.split("/")[2];

    const formattedDate = mm + "/" + dd + "/" + yyyy;
    return formattedDate;
  },

  // mooduli elemendid ja stiil
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.style.color = this.config.textColor;

    for (let i in this.config.dates) {
      var days = this.getDaysLeft(i);
      if (days>0) {
        var text = document.createTextNode(
          this.config.dates[i].name + " on " + days + " päeva pärast");
      } else {
        var text = document.createTextNode(
          this.config.dates[i].name + " oli " + Math.abs(days) + " päeva eest");
      }

      wrapper.appendChild(text);

      wrapper.appendChild(document.createElement("br"));
    }
    return wrapper;
  },
});
