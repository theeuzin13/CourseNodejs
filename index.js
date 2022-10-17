/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu id
2 Obter o endereco do usuario pelo id
*/

// importamos um modulo interno do node.js
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  //quando der algum problema-> reject(ERRO)
  //quando sucess -> RESOLV
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: "Matheus",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

//passar o callback sempre como ultimo parametro
function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "1199002",
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: "zero",
    });
  }, 2000);
}

// primeiro passo adicionar a palavra async -> automaticamente ela retrnará uma Promise
main();
async function main() {
  try {
    console.time("medida-promise");
    const usuario = await obterUsuario();
    /*const telefone = await obterTelefone(usuario.id);
    const endereco = await obterEnderecoAsync(usuario.id);*/

    //usa se o promise.all so quando uma funcao nao depender da outra
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);
    const endereco = resultado[1];
    const telefone = resultado[0];

    console.log(`
            Nome: ${usuario.nome}
            Telefone: ${telefone.ddd}, ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `);
    console.timeEnd("medida-promise");
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

/*
const usuarioPromise = obterUsuario();
// para manipular o sucesso usamos a funcao .then
// para manipular erro usamos o .catch
// usuario -> telefone -> telefone
usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then(function (resultado) {
    console.log(`
        Nome: ${resultado.usuario.nome}
        Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
        Telefone:(${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `);
  })
  .catch(function (error) {
    console.error("DEU RUIM", error);
  });
  */

/*obterUsuario(function resolverUsuario(error, usuario) {
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
  });*/
