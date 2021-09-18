
// (Declaração da variavel do sensor LM35 na porta A0)
const int lm35 = A0;

// (Declaração da variavel Temperatura, que coletara os dados de temperatura do sensor)
float temperatura;

// (Declaração da velocidade de transferencia de dados da porta USB, uma vez declarada se mantém assim)
void setup(){
  Serial.begin(9600);
}

// (Código que fará a conversão da leitura de dados do sensor para a tela que funcionará em loop)
void loop(){

//  (Declaração da variavel leitura, que pega os dados da varíavel do sensor, neste caso lm35 )
  int leitura = analogRead(lm35);

/*  (Declaração da varíavel temperatura, que faz o calculo de conversão dos dados do sensor para temperatura)
 O calculo 5.0 significa a voltagem, /1023 é o numero de de unidades em que a voltagem será quebrada */
 
  temperatura = (5.0 /1023) * leitura * 100;

/* ("Código que irá mostrar os dados da variável temperatura na tela, e um texto escrito Temperatura,
    que após um delay de 2000ms vai rodar novamente, por isto o loop") */
  Serial.print("Temperatura: "); 
  Serial.println(temperatura); 
  delay(2000);
}
