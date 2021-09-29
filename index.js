
const express = require("express");
const cors = require("cors");
const { response } = require("express");

const server = express();

server.use(cors());
server.use(express.json());

class Pessoa {
    constructor(nome, email, senha, usuario) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.usuario = usuario;
    }
    apresentar() {

    }
}

var pessoas = new Array
pessoas.push(new Pessoa("Marcos ", "marcos@gmail.com","123456","marquinhos"));
pessoas.push(new Pessoa("Tadeu", "tadeu@gmail.com","654321","ta_123"));
pessoas.push(new Pessoa("Maria", "maria@gmail.com","aeiour","mari"));
pessoas.push(new Pessoa("Joana", "joana@gmail.com","abcdef","jo"));

server.use(
    (req, res, next) => {
        console.time("Request");
        console.log(`Método: ${req.method}; URL: ${req.url}; `);
        next(); //direciona para a requisição correta
    }
);

server.get(
    '/pessoas',
    (req, res) => {
        return res.status(200).json(pessoas);

    }
);



server.post(
    '/pessoas',
    (req, res) => {
        const pessoa = req.body;
        pessoas.push(new Pessoa(pessoa.nome,"n", pessoa.email, pessoa.senha, pessoa.usuario));
        return res.status(201).json({ mensagem: "Pessoa adicionada" })
    }

);

server.put(
    '/pessoas/:index',
    (req, res)=>{
        let antes = req.params.index;        
        pessoas[req.params.index]=req.body;
        return res.status(200).json({
            mensagen:"Pessoa foi atualizada",
            antes_era:antes,
            agora_esta:pessoas[req.params.index]
        }
        )
    }
);

server.delete(
    '/pessoas/:index',
    (req, res) =>{
        pessoas.splice(req.params.index,1);
        return res.status(200).json({deletou:"SIM"})
    }
);


server.listen(4000);