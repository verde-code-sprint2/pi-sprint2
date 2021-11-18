create database agricobook;

use agricobook;

create table tbl_usuario (
id_Usuário int primary key auto_increment,
CNPJ char(14) not null
); 

create table tbl_plantio (
id_Plantio int primary key auto_increment,
nome_Plantio varchar(40)
)auto_increment 200;

create table tbl_insumo (
id_Insumo int primary key auto_increment,
id_Usuário int,
tipoInsumo varchar(60),
nome_Insumo varchar(40)
)auto_increment 300;

create table tbl_safra(
id_Safra int primary key auto_increment,
data_Plantio date,
data_Colheita date,
id_Plantio int
)auto_increment 400;

create table tbl_lider (
id_lider int primary key auto_increment,
id_Usuário int,
nome_lider varchar(50)
)auto_increment 1000;

create table tbl_propriedade (
id_Propriedade int primary key auto_increment,
id_lider int,
idSafra int
)auto_increment 500;

create table tbl_funcionário (
id_Funcionário int primary key auto_increment,
nome_funcionário varchar(50),
id_lider int
)auto_increment 600;

insert into tbl_funcionário (nome_funcionário, id_lider)
values ("vanderlei", 1);