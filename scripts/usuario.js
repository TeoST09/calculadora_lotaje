const welcome = document.getElementById('welcomeModal')
const welcomeInput = document.getElementById('welcomeName')
const welcomeEntrar = document.getElementById('welcomeEntrar')
const nombre = document.getElementById('userNameDisplay')

class Usuario{
    constructor(nombre){
        this.nombre = localStorage.getItem('usuario')
    }
    
    get obtenerNombre(){
        return this.nombre 
    }

    iniciar(){
        if(!this.obtenerNombre){
             welcome.removeAttribute('hidden') 
        }else{
            welcome.setAttribute('hidden', '')
        }
    }

    crear(){
        const nombreIngresado = welcomeInput.value.trim()
        if(nombreIngresado !== ""){
            localStorage.setItem('usuario', nombreIngresado)
            nombre.textContent = localStorage.getItem('usuario')
            welcome.setAttribute('hidden', '')
        }
    }

    mostrar(){
        if(this.obtenerNombre){
            nombre.textContent = this.obtenerNombre
        }
    }
}

let usuario = new Usuario ()
usuario.iniciar() 
usuario.mostrar()

welcomeEntrar.addEventListener('click', function(){
    usuario.crear()
}) 