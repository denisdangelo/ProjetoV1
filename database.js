/**
 * Modulo de conexão com banco de dados
 * Uso do framework mongoose
 */

//importaçãop do mongoose
const mongoose = require('mongoose')

//configuração do banco de dados

//ao final da url definir o nome do banco de dados
//Exemplo 'mongodb+srv://admin:123Senac@cluster0.zbct0.mongodb.net/dbclientes'
//aqui será usado um banco local
const url = 'mongodb+srv://denisagotec:u5RHATzaMdgIVhP5@cluster0.qfhlm.mongodb.net/dbprojeto' //ip ou link, autenticação, nome do banco

//validação (evitar a abertura de várias conexões)
let conectado = false

//Metodo (função) para conectar ao banco
const conectar = async () => {
    //se não estiver conectado
    if(!conectado){
        //conectar com o banco de dados
        try {
            await mongoose.connect(url)
            conectado = true //setar a variavel em true
            console.log('MongoDB conectado')
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

//Metodo (função) para desconectar ao banco
const desconectar = async () => {
        //se estiver conectado
    if(conectado){
            //desconectar com o banco de dados
        try {
            await mongoose.disconnect()
            conectado = false //setar a variavel em false
            console.log('MongoDB desconectado')
            return true
        } catch (error) {
            console.log(error)
            return false
            }
    }
}

module.exports = {conectar, desconectar}