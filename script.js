class Klausimas {
    constructor(tekstas, pasirinkimai, atsakymas) {
        this.tekstas = tekstas;
        this.pasirinkimai = pasirinkimai;
        this.atsakymas = atsakymas;
    }
}

class Kvizas {
    constructor(klausimai) {
        this.klausimai = klausimai;
        this.taskai = 0;
        this.dabartinisKlausimoIndeksas = 0;
    }

    gautiDabartiniKlausima() {
        return this.klausimai[this.dabartinisKlausimoIndeksas];
    }

    patikrintiAtsakyma(vartotojoAtsakymas) {
        const dabartinisKlausimas = this.gautiDabartiniKlausima();
        if (vartotojoAtsakymas === dabartinisKlausimas.atsakymas) {
            this.taskai++;
        }
    }

    pereitiPrieKitoKlausimo() {
        this.dabartinisKlausimoIndeksas++;
    }

    arKvizasBaigtas() {
        return this.dabartinisKlausimoIndeksas === this.klausimai.length;
    }
}

class UI {
    static rodytiElementa(elementoId) {
        document.getElementById(elementoId).style.display = "block";
    }

    static slėptiElementa(elementoId) {
        document.getElementById(elementoId).style.display = "none";
    }

    static nustatytiElementoTeksta(elementoId, tekstas) {
        document.getElementById(elementoId).textContent = tekstas;
    }

    static kurtiMygtuka(id, tekstas) {
        const mygtukas = document.createElement("button");
        mygtukas.id = id;
        mygtukas.textContent = tekstas;
        return mygtukas;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const pradetiMygtukas = document.getElementById("start-button");
    const klausimoKonteineris = document.getElementById("question-container");

    let kvizas;

    pradetiMygtukas.addEventListener("click", function () {
        UI.slėptiElementa("start-container");
        UI.rodytiElementa("question-container");

        kvizas = new Kvizas([
            new Klausimas("Kam naudingos morkos?", ["Niekam", "Hitleriui", "Kepenims", "Odai"], "Odai"),
            new Klausimas("Kam naudingi obuoliai?", ["Širdžiai", "Kojoms", "Delfinams", "Virškinimui"], "Virškinimui"),
            new Klausimas("Kokias ligas padeda gydyti agrastai?", ["Cukrini diabetą", "Kepenų cirozę", "Nemiga", "Vėžį"], "Cukrini diabetą"),
            new Klausimas("Kokio vitamino gausu apelsinuose?", ["Vitamino E", "Vitamino A", "Vitamino C", "Vitamino B"], "Vitamino C"),
            new Klausimas("Kokiais dalykais yra turtingi arbūzai?", ["Vitaminais", "Mineralais", "Antioksidantais", "Visi teisingi"], "Visi teisingi"),
        ]);

        rodytiKlausima();
    });

    
    klausimoKonteineris.addEventListener("click", function (ivykis) {
        const pasirinkimas = ivykis.target.textContent;

        if (pasirinkimas) {
            kvizas.patikrintiAtsakyma(pasirinkimas);
            kvizas.pereitiPrieKitoKlausimo();

            if (!kvizas.arKvizasBaigtas()) {
                rodytiKlausima();
            } else {
                alert(`Klausimynas baigtas. Jūsų rezultatas: ${kvizas.taskai} teisingi atsakymai(i).`);
                atnaujintiKviza();
            }
        }
    });

    function rodytiKlausima() {
        const dabartinisKlausimas = kvizas.gautiDabartiniKlausima();
        UI.nustatytiElementoTeksta("question-title", dabartinisKlausimas.tekstas);

        const pasirinkimuKonteineris = document.getElementById("options-container");
        pasirinkimuKonteineris.innerHTML = "";

        dabartinisKlausimas.pasirinkimai.forEach((pasirinkimas) => {
            const mygtukas = UI.kurtiMygtuka("option-button", pasirinkimas);
            pasirinkimuKonteineris.appendChild(mygtukas);
        });
    }

    function atnaujintiKviza() {
        kvizas = null;
        UI.slėptiElementa("question-container");
        UI.rodytiElementa("start-container");
    }
});
