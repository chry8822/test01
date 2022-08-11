let gameover = false;
let battle = false;

function Character(name, hp, att) {
    this.name = name;
    this.hp = hp;
    this.att = att;

}

Character.prototype.attacked = function (damage) {
    this.hp -= damage;
    logMsg(this.name + "의 체력이 " + this.hp + '가 되었습니다.');
    if (this.hp <= 0) {
        battle = false;
    }
};

Character.prototype.attack = function (target) {
    logMsg(this.name + '이 ' + target.name + '을 공격합니다');
    target.attacked(this.att)
};

function Hero(name, hp, att, lev, xp) {
    Character.apply(this, arguments);
    this.lev = lev || 1;
    this.xp = xp || 0;
}

Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.attacked = function (damage) {
    this.hp -= damage;
    logMsg(this.name + "의 체력이 " + this.hp + '가 되었습니다.');
    if (this.hp <= 0) {
        logMsg('죽었습니다. 레벨' + this.lev + '에서 모험이 끝납니다. F5를 눌러 다시 시작하세요', 'red');
        battle = false;
        gameover = true;
    }
}

Hero.prototype.attack = function (target) {
    logMsg(this.name + '님이 ' + target.name + '을 공격합니다');
    target.attacked(this.att);
    if (target.hp <= 0) {
        this.gainXp(target);
    }
}

Hero.prototype.gainXp = function (target) {
    logMsg('전투에서 승리하여 ' + target.xp + '의 경험치를 얻습니다', 'blue');
    this.xp += target.xp;
    if (this.xp > 100 + 10 * this.lev) {
        this.lev++;
        logMsg('레벨업! ' + this.lev + ' 레벨이 되었습니다', 'blue');
        this.hp = 100 + this.lev * 10;
        this.xp -= 10 * this.lev + 100;
    }
};

function Monster(name, hp, att, lev, xp) {
    Character.apply(this, arguments);
    this.lev = lev || 1;
    this.xp = xp || 10;
}

Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;


const logMsg = (msg, color) => {
    if (!color) {
        color = 'black'
    }
    let div = document.createElement('div')
    div.innerHTML = msg;
    div.style.color = color;
    document.getElementById('log')?.appendChild(div)
}

function makeMonster() {
    let monsterArr = [
        ['rabit', 25, 3, 1, 35],
        ['skeleton', 50, 6, 2, 55],
        ['solider', 75, 5, 4, 76],
        ['king', 125, 9, 4, 110],
        ['diablo', 500, 23, 5, 300],
    ]
    let monster = monsterArr[Math.floor(Math.random() * 5)];
    return new Monster(
        monster[0],
        monster[1],
        monster[2],
        monster[3],
        monster[4],
    )
}

let hero = new Hero(prompt("write name"), 100, 10);
logMsg(hero.name + "님이 모험을 시작합니다. 어디 까지 성장할까?");
while (!gameover) {
    var monster = makeMonster();
    logMsg(monster.name + '을 마주쳤습니다. 전투가 시작됩니다', 'green');
    battle = true; while (battle) {
        hero.attack(monster);
        if (monster.hp > 0) {
            monster.attack(hero);
        }
    }
}