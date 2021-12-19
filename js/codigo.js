

const url="https://pokeapi.co/api/v2/pokemon/";
var espera=3000;
var pkmns= 0;


function buscarPkmn(){

    let nom=document.getElementById("nomPkmn").value;
    let nomPkmn=[...nom.matchAll(/[a-z0-9]/g) ].join('');

    if (nomPkmn.length>0){

        let pkmn = new Pockemon(nomPkmn)

        setTimeout(() => {
            pkmn.buscar()        
        }, espera);
        
        if (espera>0) {
            espera=espera-=500;
        }

    }
    document.getElementById("nomPkmn").value="";
}


function borrarFila(){

    let fila=document.getElementById(this.id.substr(3))
    fila.remove();
}


class Pockemon {

constructor(nom){
    
    this.txtnom=nom;

    let tabla=document.getElementById("tblPkmn");
    this.fila  = document.createElement("tr");

    this.img = this.agregarCelda("...");
    this.nombre = this.agregarCelda("Buscando a " + nom +"...");
    this.tipo = this.agregarCelda();
    this.exp  = this.agregarCelda();
    this.altura = this.agregarCelda();
    this.peso = this.agregarCelda();
    this.hab = this.agregarCelda();
    this.bye = this.agregarCelda("..");

    tabla.appendChild(this.fila);    

    pkmns++;
    this.fila.id="Fila"+pkmns;
}

agregarCelda(txt="¿?"){

    let celda = document.createElement("td");
    let valor = document.createTextNode(txt);
    celda.appendChild(valor);
    this.fila.appendChild(celda);

    return celda;
}

buscar(){

    let urlPkmn=`${url}${this.txtnom}`;

    fetch(urlPkmn)
    .then(resp => resp.json())
    .then(resp => this.listar(resp))
    .catch(resp => this.mostrarError());
}

listar(jpkmn){

    let imagen=document.createElement("img");
    imagen.src=jpkmn.sprites.other.dream_world.front_default;
    imagen.width=50;
    imagen.height=50;
    this.img.innerHTML="";
    this.img.appendChild(imagen);

    this.nombre.innerHTML = jpkmn.id + "-" +jpkmn.name;
    this.tipo.innerHTML = jpkmn.types.map( e => {return e.type.name}).join();
    this.exp.innerHTML  = jpkmn.base_experience;
    this.altura.innerHTML = jpkmn.height;
    this.peso.innerHTML = jpkmn.weight;
    this.hab.innerHTML = jpkmn.abilities.map( e => {return e.ability.name}).join();

    this.agregarBye();

}

mostrarError(){

    let texto="XXXXXXXXXX";

    this.img.innerHTML="¡NO EXISTE!";
    this.nombre.innerHTML=this.txtnom;
    this.tipo.innerHTML = this.enmascarar(); 
    this.exp.innerHTML  = this.enmascarar(4);
    this.altura.innerHTML = this.enmascarar(4);
    this.peso.innerHTML = this.enmascarar(4);
    this.hab.innerHTML = this.enmascarar();

    this.agregarBye();
}

enmascarar(largo=8){

    let txt=Math.random().toString(2).substring(2,largo+2);
    return txt.replaceAll("0","x").replaceAll("1","X");
}

agregarBye(){

    this.bye.innerHTML="";
    let btn=document.createElement("button");
    btn.innerHTML="¡Bye!"
    btn.id="Btn"+this.fila.id
    btn.onclick=borrarFila;
    this.bye.appendChild(btn);

}

}
