/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu id
2 Obter o endereco do usuario pelo id
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: "Matheus",
      dataNascimento: new Date(),
    });
  }, 1000);
}

//passar o callback sempre como ultimo parametro
function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "1199002",
      ddd: 11,
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: "zero",
    });
  }, 2000);
}

function resolverUsuario(erro, usuario) {
  console.log("usuario", usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
  // null || "" || 0 === false
  if (error) {
    console.error("DEU RUIM em USUARIO", error);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error("DEU RUIM em TELEFONE", error);
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error("DEU RUIM em ENDERECO", error);
        return;
      }

      console.log(`
        nome: ${usuario.nome}
        endereco: ${endereco.rua},${endereco.numero}
        telefone: ${telefone.ddd},${telefone.telefone}
      `);
    });
  });
});
