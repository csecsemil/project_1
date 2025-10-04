let szam = 7

function change(){
    szam = document.getElementById("Salat").value
    console.log(szam)
    if (szam == 6){
        document.getElementById("asd").style.display = "none"
    } else {
        document.getElementById("asd").style.display = "block"
    }

}





<script>
    // 1. Definiáljuk a termékek árát (egységár)
    const AR_HUS = 50;
    const AR_PARADICSOM = 20;
    const AR_ZSEMLE = 10;
    const AR_SALATA = 5;

    // 2. A fő számítási függvény
    function kalkulacio() {
        // Alap költségvetés (amit nem állítunk át)
        const ALAP_PENZ = 6000;
        let teljesKoltseg = 0; // Itt gyűjtjük össze az aktuális kosár árát

        // 3. Lekérjük a beviteli mezők aktuális mennyiségét
        
        // Zsemle alul (számláló ID: zsemle_alul)
        const zsemleAlulMennyiseg = parseInt(document.getElementById('zsemle_alul').value);
        teljesKoltseg += zsemleAlulMennyiseg * AR_ZSEMLE;
        
        // Hús (számláló ID: hus)
        const husMennyiseg = parseInt(document.getElementById('hus').value);
        teljesKoltseg += husMennyiseg * AR_HUS; // Ár: 50 Ft
        
        // Saláta (számláló ID: salata)
        const salataMennyiseg = parseInt(document.getElementById('salata').value);
        teljesKoltseg += salataMennyiseg * AR_SALATA;
        
        // Paradicsom (számláló ID: paradicsom)
        const paradicsomMennyiseg = parseInt(document.getElementById('paradicsom').value);
        teljesKoltseg += paradicsomMennyiseg * AR_PARADICSOM;
        
        // Zsemle felül (számláló ID: zsemle_felul)
        const zsemleFelulMennyiseg = parseInt(document.getElementById('zsemle_felul').value);
        teljesKoltseg += zsemleFelulMennyiseg * AR_ZSEMLE;

        // 4. Kiszámoljuk a maradék pénzt
        const maradekPenz = ALAP_PENZ - teljesKoltseg;

        // 5. Frissítjük a kijelzőt (a "penzosszeg" ID-jű span tartalmát)
        document.        function getVal(id){
          return Number(document.getElementById(id)?.value) || 0;
        } maradekPenz;

        // 6. Opcionális: Színjelzés, ha túlmentünk a kereten
        const penzElem = document.getElementById('penzosszeg');
        if (maradekPenz < 0) {
            penzElem.style.color = 'red'; // Piros, ha mínuszban vagyunk
        } else {
            penzElem.style.color = 'black';
        }
    }
</script>