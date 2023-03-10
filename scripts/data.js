const CHARS = 79;
const dataAtual = new Date();
const dataSpan = document.getElementById("data");

const url = `https://codex-belphegor.github.io/sois-luas/${dataAtual.getFullYear()}.json`

function pegarDiaEmLatim(dia) {
	switch(dia) {
		case 0:
			return "Dies Solis"
		break;
		case 1:
			return "Dies Lunae"
		break;
		case 2:
			return "Dies Martis"
		break;
		case 3:
			return "Dies Mercurii"
		break;
		case 4:
			return "Dies Jovis"
		break;
		case 5:
			return "Dies Veneris"
		break;
		case 6:
			return "Dies Saturnis"
		break;
	}
}
fetch(url)
	.then((response) => response.json())
	.then((data) => {
		const mes = dataAtual.getMonth()+1;
		const dia = dataAtual.getDate();
		const solLua = data[`${dataAtual.getFullYear()}-${mes < 10 ? '0'+mes : mes}-${dia < 10 ? '0'+dia : dia}`];

		const SOL = `Sol ${solLua.sol.grau}°${solLua.sol.minutos}'${solLua.sol.segundos}" ${solLua.sol.signo}`;
		const LUA = `Lua ${solLua.lua.grau}°${solLua.lua.minutos}'${solLua.lua.segundos}" ${solLua.lua.signo}`;
		const DIA = pegarDiaEmLatim(dataAtual.getDay());

		const texto = `${SOL}, ${LUA}, ${DIA}.`;

		dataSpan.innerHTML = "<u>"+texto+"</u>" + (' '.repeat(CHARS - texto.length-9));
	});

let clicked = false;
dataSpan.addEventListener("click", () => {
	if(!clicked) {
		clicked = true;
		navigator.clipboard.writeText(data.innerText.trim()).then(() => {
			const texto = data.innerHTML;
			dataSpan.innerHTML = "<b style='color:green'>Copiado com sucesso!</b>"+' '.repeat(50);
			setTimeout(() => {
				dataSpan.innerHTML = texto;
				clicked = false;
			}, 2000);
		},() => {});
	}
})
