const CHARS = 79;
const dataAtual = new Date();
const dataThelemica = document.getElementById("data-thelemica");

const url = `https://codex-belphegor.github.io/sois-luas/${dataAtual.getFullYear()}.json`

function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

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

		const annoCycle = romanize(Math.floor((dataAtual.getFullYear() - 1904) / 22));
		let annoTrunfo = '';

		if(mes >= 3 && dia >= 20 ) {
			annoTrunfo = romanize((dataAtual.getFullYear() - 1904) % 22).toLowerCase();
		}else{
			annoTrunfo = romanize(((dataAtual.getFullYear() - 1904) % 22) - 1).toLowerCase();
		}

		const ANNO = `Anno ${annoCycle}:${annoTrunfo}`;
		const SOL = `Sol ${solLua.sol.grau}°${solLua.sol.minutos}'${solLua.sol.segundos}" ${solLua.sol.signo}`;
		const LUA = `Lua ${solLua.lua.grau}°${solLua.lua.minutos}'${solLua.lua.segundos}" ${solLua.lua.signo}`;
		const DIA = pegarDiaEmLatim(dataAtual.getDay());

		const texto = `${ANNO}, ${SOL}, ${LUA}, ${DIA}.`;

		dataThelemica.innerHTML = "<u>"+texto+"</u>" + (' '.repeat(CHARS - texto.length-9));
	});

let clicked = false;
dataThelemica.addEventListener("click", () => {
	if(!clicked) {
		clicked = true;
		navigator.clipboard.writeText(dataThelemica.innerText).then(() => {
			const texto = dataThelemica.innerHTML;
			dataThelemica.innerHTML = "<b style='color:green'>Copiado com sucesso!</b>"+' '.repeat(50);
			setTimeout(() => {
				dataThelemica.innerHTML = texto;
				clicked = false;
			}, 2000);
		},() => {});
	}
})
