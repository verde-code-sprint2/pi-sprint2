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

insert into planta values 
(null,'Café Arábica','17','23','45 m','45%'),
(null,'Café Robusto','17','23','35 m','60%');

create table propriedade (
id_propriedade int primary key auto_increment,
nome varchar (45),
cnpj varchar(45),
fk_usuario int, 
foreign key (fk_usuario) references usuario (id_usuario)
)auto_increment = 10;

insert into propriedade values 
(null,'Fazenda do Carmo','487.770.078.16','30'),
(null,'Grupo Bom futuro','586.950.128.03','31');



create table insumo (
id_insumo int primary key auto_increment,
tipo_insumo varchar(45),
data_aplicacao date
)auto_increment = 20;

insert into insumo values 
(null,'Adubo','2021-07-05'),
(null,'Semeste','2021-05-12');

create table usuario(
id_usuario int primary key auto_increment,
senha varchar(50),
cargo varchar (45)
) auto_increment = 30;

insert into usuario values
(null,'101215','Agricultor'),
(null,'202122','gerente');

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

insert into lote values 
(null,'101','380 H','1.000M','10',1,20),
(null,'102','320 H','900M','11',2,21);

create table sensores (
id_sensores int primary key auto_increment,
tipo_sensor varchar (45),
fk_lote int,
foreign key (fk_lote) references lote (id_lote)
)auto_increment=50;

insert into sensores values 
(null,'THT11',40),
(null,'THT11',41);

create table safra (
id_safra int primary key auto_increment,
qtd_colheita int,
data_plantio date,
data_colheita date,
fk_lote int,
foreign key (fk_lote) references lote (id_lote)
)auto_increment=60;

insert into safra values
(null,15,'2021-10-20','2021-12-29',40),
(null,14,'2021-08-19','2021-10-23',41);

create table sensorlogs(
id_sensorlogs int primary key auto_increment,
data_sensor varchar(45),
umidade varchar(45),
temperatura varchar (45),
fk_sensores int,
foreign key (fk_sensores) references sensores (id_sensores)
)auto_increment=70;

insert into sensorlogs values 
(null,2021-07-27,'50%',23,50),
(null,2021-04-19,'40%',20,51);

select * from planta;
select * from propriedade;
select * from insumo;
select * from usuario;
select * from lote;
select * from sensores;
select * from safra;
select * from sensorlogs;
