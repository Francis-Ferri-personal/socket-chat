var params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
	window.location = "index.html";
	throw new Error("El nombre y sala son necesarios");
} else if (params.get("nombre") === "" || params.get("sala") === "") {
	window.location = "index.html";
	throw new Error("El nombre y sala son necesarios");
}

var usuario = {
	nombre: params.get("nombre"),
	sala: params.get("sala")
};

console.log("ME PASE");
var socket = io();

socket.on("connect", function () {
	console.log("Conectado al servidor");
	socket.emit("entrarChat", usuario, function (resp) {
		console.log("Usuarios conectados", resp);
	});
});

// escuchar
socket.on("disconnect", function () {
	console.log("Perdimos conexión con el servidor");
});

// Enviar información
/* socket.emit(
	"crearMensaje",
	{
		usuario: "Fernando",
		mensaje: "Hola Mundo"
	},
	function (resp) {
		console.log("respuesta server: ", resp);
	}
);
 */
// Escuchar información
socket.on("crearMensaje", function (mensaje) {
	console.log("Servidor:", mensaje);
});

// Escuchar cuando un suario entra o sale del chat
socket.on("listaPersona", function (personas) {
	console.log(personas);
});

// Mensajes privados
socket.on("mensajePrivado", function (mensaje) {
	console.log("Mensaje privado", mensaje);
});
