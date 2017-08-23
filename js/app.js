new Vue({
  el: '#app',
  data: {
    start: false,
    hero: {
      health: 100
    },
    monster: {
      health: 100
    },
    logs: []
  },
  methods: {
    startGame: function(){
      this.start = true;
      this.logs = [];
      this.hero.health = 100;
      this.monster.health = 100;
    },
    giveUp: function(){
      this.start = false;
      this.logs = [];
    },
    turn: function(turn) {
      if (this.validGame) {
        if (turn === 'attack'){
          this.attack();
        } else if (turn === 'specialAttack') {
          this.specialAttack();
        } else if (turn === 'heal') {
          this.heal();
        }
      }

      if (this.heroHealth <= 0) {
        if (confirm("Get rekt son! Try again?")) {
          this.giveUp();
        }
      } else if (this.monsterHealth <= 0) {
        if (confirm("Damn son! Pwn some moar monstahz?")) {
          this.giveUp();
        }
      }
    },
    attack: function(){
      this.monsterTurn();
      var heroDamage = getRandomInt(5, 10);
      this.monster.health -= heroDamage;
      this.logTurn('player', 'monster', heroDamage)
    },
    specialAttack: function(){
      this.monsterTurn();
      var heroDamage = getRandomInt(11, 20);
      this.monster.health -= heroDamage;
      this.logTurn('player', 'monster', heroDamage)
    },
    heal: function(){
      this.monsterTurn();
      var heroHeal = getRandomInt(10, 20);
      this.hero.health += heroHeal;
      this.logTurn('player', 'player', heroHeal)
    },
    monsterTurn: function(){
      var monsterDamage = getRandomInt(5, 20);
      this.hero.health -= monsterDamage;
      this.logTurn('monster', 'player', monsterDamage)
    },
    logTurn: function(from, to, value){
      var message = attackTurnMessage(from, to, value);
      if (from === to){
        message = healTurnMessage(from, value);
      }
      this.logs.unshift({
        playerTurn: from === 'player',
        message: message
      });
    }
  },
  computed: {
    hasLog: function(){
      return this.logs.length > 0;
    },
    validGame: function() {
      return this.heroHealth > 0 && this.monsterHealth > 0;
    },
    heroHealth: function(){
      return parsedHealth(this.hero.health);
    },
    monsterHealth: function(){
      return parsedHealth(this.monster.health);
    }
  },
  watch: {
  }
});

function attackTurnMessage(from, to, damage) {
  return from.toUpperCase() + " HITS " + to.toUpperCase() + " FOR " + damage;
}

function healTurnMessage(from, heal) {
  return from.toUpperCase() + " HEALS HIMSELF FOR " + heal;
}

function parsedHealth(health){
  var parsedHealth;
  if(health >= 100) {
    parsedHealth = 100;
  } else if (health < 100 && health > 0) {
    parsedHealth = health;
  } else {
    parsedHealth = 0;
  }
  return parsedHealth;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
