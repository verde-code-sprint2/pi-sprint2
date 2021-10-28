create database agrotis;
use agrotis;

create table planta (
id_planta int primary key auto_increment,
nome_planta varchar(45),
temp_min decimal(4,2),
temp_max decimal (4,2),
altitude int,
umidade int
);

insert into planta values 
(null,'Café Arábica',17.00,23.00,45,45),
(null,'Café Robusto',17.00,23.00,35,60);


create table usuario(
id_usuario int primary key auto_increment,
senha varchar(50),
email varchar (45),
fk_lider int
) auto_increment = 30;
alter table usuario add foreign key(fk_lider) references usuario(id_usuario);

insert into usuario values
(null,'101215','Agricultor@bandtec.com.br', null),
(null,'202122','gerente@bandtec.com.br', null);

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
nome_insumo varchar(45),
data_aplicacao date
)auto_increment = 20;

insert into insumo values 
(null,'Adubo','2021-07-05'),
(null,'Semente','2021-05-12');

create table lote (
id_lote int primary key auto_increment,
n_lotes int,
hectares int,
altitude int,
fk_propriedade int, 
foreign key (fk_propriedade) references propriedade (id_propriedade),
fk_planta int,
foreign key (fk_planta) references planta (id_planta),
fk_insumo int,
foreign key (fk_insumo) references insumo (id_insumo)
)auto_increment = 40;

insert into lote values 
(null,1,380,1000,10,1,20),
(null,2,320,900,11,2,21);

create table sensores (
id_sensores int primary key auto_increment,
tipo_sensor varchar (45),
fk_lote int,
foreign key (fk_lote) references lote (id_lote)
)auto_increment=50;

insert into sensores values 
(null,'DHT11',40),
(null,'DHT11',41);

create table safra (
id_safra int primary key auto_increment,
qtd_colheita decimal(4,2),
data_plantio date,
data_colheita date,
fk_lote int,
foreign key (fk_lote) references lote (id_lote)
)auto_increment=60;

insert into safra values
(null,15.00,'2021-10-20','2021-12-29',40),
(null,14.00,'2021-08-19','2021-10-23',41);

create table sensorlogs(
id_sensorlogs int primary key auto_increment,
data_sensor date,
umidade int,
temperatura decimal (4,2),
fk_sensores int,
foreign key (fk_sensores) references sensores (id_sensores)
)auto_increment=70;

insert into sensorlogs values 
(null,'2021-07-27',50,23.00,50),
(null,'2021-04-19',40,20.00,51);

create table safra_funcionario(
id_safrafuncionario int primary key auto_increment,
data_colheita date,
fk_safra int,
foreign key (fk_safra) references safra (id_safra), 
fk_usuario int,
foreign key (fk_usuario) references usuario (id_usuario)
)auto_increment=80;


insert into safra_funcionario values 
(null,'2021-10-08',60,30),
(null,'2021-04-27',61,31);

select * from planta;
select * from propriedade;
select * from insumo;
select * from usuario;
select * from lote;
select * from  sensores;
select * from  safra;
select * from  sensorlogs;
select * from  safra_funcionario;




select * from sensorlogs 
join sensores on sensores.id_sensores = sensorlogs.fk_sensores 
join lote on sensores.fk_lote = lote.id_lote; -- onde cada sensorlog está localizado em cada lote 


select * from safra_funcionario  -- qual o lote o usuario está responsavel
join safra on safra_funcionario.fk_safra = safra.id_safra 
join usuario on safra_funcionario.fk_usuario = usuario.id_usuario
join lote on safra.fk_lote = lote.id_lote;

select id_sensorlogs, umidade, temperatura, data_sensor, tipo_sensor, n_lotes, altitude from sensorlogs join sensores on sensorlogs.fk_sensores = sensores.id_sensores -- todos os logs do lote onde o id do lote é = 40
join lote on sensores.fk_lote = lote.id_lote where lote.id_lote = 40;  