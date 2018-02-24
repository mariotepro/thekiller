$nameArray = ["Felix", "Velasco","Agus", "Nunci", "Marimar", "Nachi", "Gus", "Mabel", "David", "Espeso"];
$things = ["Lápiz", "Sartén","Estuche", "Cuaderno", "Rotulador", "Cómic", "Pañal", "Zapatilla Izquierda", "Juguete", "Cazo"];

$(window).ready(function() {
	$("#form1").submit(function(e){
		return false;
	});
	printValues();
	$('#button').click(function() { 	isTextBoxEmpty(); });
	$(document).keypress(function(e) {
		if(e.which == 13) {
			isTextBoxEmpty();
		}
	});
	$('#assignb').click(function() { 	
		if (enoughThings())  assignValues();
	 });
});

function getValues() {
	$radio = $('input[name="group1"]:checked').val();
	$aux = $('#text').val();

	if ($radio === "name")		$nameArray.push($aux);
	else 						$things.push($aux);

	printValues();

	$('#text').val("");
	$('#text').focus();
};

function printValues() {

	$tlen = $things.length;
	$nlen = $nameArray.length;

	if ($nlen > 0) {
		$nlist = "<ul>";
		for (i = 0; i < $nlen; i++) {
			$nlist += "<li>" + $nameArray[i] + "</li>";
		}
		$nlist += "</ul>";
		$('#nlist').html($nlist);
	}

	if ($tlen > 0) {
		$tlist = "<ul>";
		for (i = 0; i < $tlen; i++) {
			$tlist += "<li>" + $things[i] + "</li>";
		}
		$tlist += "</ul>";
		$('#tlist').html($tlist);
	}
}

function isTextBoxEmpty() {
	if ($('#text').val().length > 0)  getValues();
}

function assignValues() {
	//Vaciamos la tabla y ponemos sus títulos
	$('#mlist').empty();
	$('#mlist').html("<thead><tr><th>Asesino</th><th>Mata a</th><th>Con</th></tr></thead>");
	$tlen = $things.length;
	$nlen = $nameArray.length;
	//Copiamos los arrays, como los vamos a borrar, mejor usar un array auxiliar que borrar el original
	$naaux = $nameArray.slice(0);
	$taaux = $things.slice(0);
	$prevName = "";

	//Asignamos, mostramos y eliminamos los elementos para que no se vuelvan a usar
	for ($i = 0; $i < $nlen ; $i++) {
		$choosenName 	= Math.floor( Math.random() * $naaux.length);
		$choosenThing 	= Math.floor( Math.random() * $taaux.length);

		if ($prevName == "") 		$('#mlist').append("<tr><th id='firstBlood'></th><th>"+ $naaux[$choosenName] +"</th><th>" + $taaux[$choosenThing] + "</th></tr>");
		else 						$('#mlist').append("<tr><th>" + $prevName + "</th><th>" + $naaux[$choosenName] + "</th><th>" + $taaux[$choosenThing] + "</th></tr>");

		//Guardamos el nombre para la siguiente:
		$prevName = $naaux[$choosenName];
		//Que el último que salga, sea matado por el primero
		if ($i == ($nlen - 1)) $('#firstBlood').append($naaux[$choosenName]);

		//Eliminamos los elementos
		$naaux.splice($choosenName,1);
		$taaux.splice($choosenThing,1);
	}
};

function enoughThings() {
	if ($things.length >= $nameArray.length) return true;
	else Materialize.toast('No tengo suficientes objetos para todos', 4000)
}