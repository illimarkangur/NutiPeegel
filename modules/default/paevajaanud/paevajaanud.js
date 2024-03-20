Module.register("paevajaanud", {

    // vaikimisi config
    defaults: {
        textColor: "white",
        dates:[
          // sisesta kuupäev formaadis 'dd/MM/yyyy'
            {name:"Aasta 2025", date:"01/01/2025"}, 
            {name:"Aasta 2026", date:"01/01/2026"}
        ]
      },
  
      getDaysLeft: function (i) {
          const date = Date.now(); 

          dates = [
            {name:"Aasta 2025", date:"01/01/2025"}, 
            {name:"Aasta 2026", date:"01/01/2026"}
        ];

          var formattedDate = dateFormat(dates[i].date)
          // leiab tuleviku kuupäeva millisekundites
          const targetDate = new Date(formattedDate);
          // leiab ajavahemiku millisekundites
          const difference = targetDate - date; 
          // tagastab päevade arvu, jagades ajavahet millisekundite arvuga ühes päevas
          return Math.round(difference/(1000 * 60 * 60 * 24)) 
      },
  
      //võtab configis kirjutatud dd/MM/yyyy formati ja tõstab selle ümber MM/dd/yyyy formaati, mis on Date() funktsioonis vajalik
      dateFormat: function (date) {
  
        const dd = date.split('/')[0]; 
        const mm = date.split('/')[1]; 
        const yyyy = date.split('/')[2];
  
        const formattedDate = mm + '/' + dd + '/' + yyyy;
        return formattedDate
      },

    // mooduli elemendid ja stiil
    getDom: function () {
      dates = [
          {name:"Aasta 2025", date:"01/01/2025"}, 
          {name:"Aasta 2026", date:"01/01/2026"}
      ];
      var wrapper = document.createElement("div");
      wrapper.style.color = this.config.textColor;

      var name = dates[0].name;
      var countdowntext = document.createTextNode(name + ": " + getDaysLeft(0) + " päeva.");
      wrapper.appendChild(countdowntext);

      /*
      //teeb uue rea iga kuupäeva puhul
      for (let i of this.config.dates) {
          var countdownSpan = document.createElement("span");

          var countdowntext = document.createTextNode(this.config.dates[i].name + ": " + getDaysLeft(i) + " päeva.");
          countdownSpan.appendChild(countdowntext);
          
          var br = document.createElement("br");
          countdownSpan.appendChild(br)

          wrapper.appendChild(countdownSpan);
        }
        */


      return wrapper;
    }
  });