create database Agrotis;
use agrotis;

create table planta (
id_planta int primary key auto_increment,
nome_planta varchar(45),
temp_min varchar (45),
temp_max varchar (45),
altitude varchar (45),
umidade varchar (45)
);



create table propriedade (
id_propriedade int primary key auto_increment,
nome varchar (45),
cnpj varchar(45),
fk_usuario int, 
foreign key (fk_usuario) references usuario (id_usuario)
)auto_increment = 10;




create table insumo (
id_insumo int primary key auto_increment,
tipo_insumo varchar(45),
data_aplicacao date
)auto_increment = 20;


create table usuario(
id_usuario int primary key auto_increment,
senha varchar(50),
cargo varchar (45)
) auto_increment = 30;


create table lote (
id_lote int primary key auto_increment,
n_lotes varchar (45),
hectares varchar (45),
altitude varchar (45),
fk_propriedade int, 
foreign key (fk_propriedade) references propriedade (id_propriedade),
fk_planta int,
foreign key (fk_planta) references planta (id_planta),
fk_insumo int,
foreign key (fk_insumo) references insumo (id_insumo)
)auto_increment = 40;


create table sensores (
id_sensores int primary key auto_increment,
tipo_sensor varchar (45),
fk_lote int,
foreign key (fk_lote) references lote (id_lote)
)auto_increment=50;


create table safra (
id_safra int primary key auto_increment,
qtd_colheita int,
data_plantio date,
data_colheita date,
fk_lote int,
foreign key (fk_lote) references lote (id_lote)
)auto_increment=60;


create table sensorlogs(
id_sensorlogs int primary key auto_increment,
data_sensor varchar(45),
umidade varchar(45),
temperatura varchar (45),
fk_sensores int,
foreign key (fk_sensores) references sensores (id_sensores)
)auto_increment=70;