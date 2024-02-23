
class Usuario{
    constructor(nombre, contraseña) {
        // Asignar los valores de los parámetros a los atributos de la instancia
        this.nombre = nombre;
        this.contraseña = contraseña;
      }

      iniciarSesion(usuarioInput, contrasenaInput) {
        // Verificar si las credenciales son válidas
        if (usuarioInput === this.usuario && contrasenaInput === this.contrasena) {
            return true; // Credenciales válidas
        } else {
            return false; // Credenciales inválidas
        }
    }


}

function iniciarSesion() {
    const usuarioInput = document.getElementById("usuarioInput").value;
    const contrasenaInput = document.getElementById("contrasenaInput").value;

    // Verificar las credenciales con el método iniciarSesion de la clase Usuario
    if (usuario1.iniciarSesion(usuarioInput, contrasenaInput)) {
        // Credenciales válidas, redirigir a otra página
        window.location="Webplayer.html";
    } else if (usuario2.iniciarSesion(usuarioInput, contrasenaInput)) {
        // Credenciales válidas para el segundo usuario, redirigir a otra página
        window.location= 'Webplayer.html';
    } else {
        // Credenciales inválidas
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
}

//Crear dos usuarios con sus respectivas contraseñas
const usuario1 = new Usuario("usuario1", "contrasena1");
const usuario2 = new Usuario("usuario2", "contrasena2");

