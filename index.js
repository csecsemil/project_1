
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