### Se meu fusca falasse - Game 🏎️


 #### Desafio da empresa Upnids 🚘
 
  O jogo  desenvolvido como desafio técnico da empresa  e consiste de diversos stacks de tecnologia.
  Node, Express, GraphQL, Serverless, React, Styled Components etc.
 
 #### Objetivo 🥅
 
 Um jogo de corrida para amantes do fusca. O objetivo é desviar das pedras que aparecem aleatoriamente por 3 minutos.
 Um placar é salvo a cada derrota ou vitória e somente os 10 melhores são mostrados ao final do jogo.
 
 #### O jogo pode ser jogado aqui
 
 https://semeufuscafalasse.iwaduarte.dev/
 
 
 #### Como jogar 
- As teclas  A (Pista Direita) , S (Pista Central) , D (Pista Esquerda) ou respctivamente Seta Esquerda ← (Pista Esquerda),  Seta Direita → (Pista Direita) são utilizadas para movimentar o carro.
 
#### 🏃🏽‍♀️Back-end: 
 
 Backend consiste de um banco de dados Postgres, Sequelize como ORM e Apollo GraphQL Server.
  Para rodar localmente execute os seguintes comandos:
 
 `npm install`  
 `npm install nodemon -g`
 
 Seguidamente, é necessário setar um arquivo .env file contendo as seguintes variavéis.  
 
`STAGE= local-dev` **Note que é necessário setar a variavél STAGE para local-dev  

`DBNAME-LOCAL` ** Nome do banco de dados  

`DBUSER-LOCAL` ** Nome do usuário  

`DBPASS-LOCAL ` ** Senha  

`DBHOST-LOCAL ` ** URI do Banco  

`DBPORT-LOCAL` ** Porta Utilizada

Como ultima etapa é necessário sincronizar os Models com o banco de dados. Para isso usaremos o comando: `npm run sequelize-sync`

O back deverá estar funcional. Funcionando na porta **3005**
  
 #### Front-end 🚪:  
Um carro definido pela empresa, seguido de uma pista animada (gif). Foram utilizados as seguintes tecnologias:
React com Hooks, Styled Components, Apollo GraphQL Client.
 
Para rodar localmente execute os seguintes comandos:
 
 Para instalar as dependências:
 `npm install`  
 Para iniciar:
 `npm start`
 
 
 ##### ✨ Pontos interessantes :
 Os bônus em sua maioria foram implementados e expandidos para oferecer melhor jogabilidade e divertimento. São eles:
 
 Pause → ao pressionar ESC (ou outra tecla), o jogo é pausado. ⏸ - Implementado  
 
 Obstáculos → 🤯  Implementado  
 
 Número de Voltas →  Implementado  
 
 Leaderboard → Implementado parcialmente (usa-se o GraphQL localmente (mutation e query) mas não mostra o quadro de líderes)
 
 Fim de Corrida → Implementado  
 
 Link Público → Implementado  
 
 Stack Upnid → Implementado  
 
 Documentação → Implementado 
 
 Alguns dos items na lista embora essencias não foram implementados devido ao tempo limitado.
 
 -
 Se divirtam 🤗 !