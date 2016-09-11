/*外部调用JS代码*/
var otherJS = 'js/class.js';//js的地址，请自定义
document.write('<scr' + 'ipt type="text/javascript" src="' + otherJS + '"></scr' + 'ipt>');

/*获得容器*/
var ocontent = document.getElementById("container");
/*获得游戏主界面*/
var ogamemain = document.getElementById("gamemain");
/*获得开始界面*/
var ostartmain = document.getElementById("startmain");
/*获得游戏进行时界面*/
var opalying = document.getElementById("opalying");
/*获得暂停界面*/
var opausepage = document.getElementById("pausepage");
/*获得游戏结束界面*/
var over = document.getElementById("over");
var newgame = document.getElementById("newgame");
var overscore = document.getElementById("overscore");
var obody = document.body || document.documentElement;

/*获得分数节点*/
var oscore = document.getElementById("score");
/*获得boss血量节点*/
var obblood = document.getElementById("bossblood");
/*获得玩家血量节点*/
var opblood = document.getElementById("playerblood");
/*获得开始按钮*/
var ostart = document.getElementById("start");
/*获得暂停按钮*/
var opause = document.getElementById("pause");
/*获得继续按钮*/
var ogoon = document.getElementById("goon");
/*重新开始*/
var oreplay = document.getElementById("replay");
/*返回主页*/
var omyreturn = document.getElementById("myreturn");
var exitgame = document.getElementById("exit");
var keyRight = false;
var keyLeft = false;
var keyTop = false;
var keyButtom = false;
var keyShout = false;


//设置游戏背景
var bgh = screen.availHeight - 86;
var bgw = (bgh / 662) * 441;
ocontent.style.height = bgh + "px";
ocontent.style.width = bgw + "px";
ocontent.style.backgroundSize = bgw + "px " + bgh + "px";
ostartmain.style.backgroundSize = bgw + "px " + bgh + "px";

var ourplane;
var applane = new Array();
var aboss = new Array();
var abullet = new Array();
var abossbullet = new Array();
var agift = new Array();
var hisid, mymoveid, opmoveid, bossid, bossmoveid, bulletid, bulletmoveid, touchid, clearid, abossbulletid, abossbulletmoveid,giftid,giftmoveid;
var pplanew, pplaneh;
var oplanew, oplaneh;
var bulletw, bulleth;
var pblood, score , bossblood;
var wantonly;

bulletw = 20;
oplanew = 73;
pplanew = 45;
bw = 128;
bulleth = 40;
oplaneh = 52;
pplaneh = 34;
bh = 110;

function settime() {
    hisid = setInterval(his, 800);
    mymoveid = setInterval(moveor, 3);
    opmoveid = setInterval(opmove, 10);
    bossid = setInterval(boss, 1000);
    bossmoveid = setInterval(bossmove, 100);
    bulletid = setInterval(shushu, 300);
    bulletmoveid = setInterval(bulletmove, 1);
    touchid = setInterval(touch, 1);
    clearid = setInterval(clearp, 500);
    giftid = setInterval(gift,100);
    giftmoveid = setInterval(giftmove,10);
}
function cleartime() {
    clearInterval(hisid);
    clearInterval(mymoveid);
    clearInterval(opmoveid);
    clearInterval(bossid);
    clearInterval(bossmoveid);
    clearInterval(bulletid);
    clearInterval(bulletmoveid);
    clearInterval(touchid);
    clearInterval(clearid);
    clearInterval(abossbulletid);
    clearInterval(abossbulletmoveid);
    clearInterval(giftid);
    clearInterval(giftmoveid);
}
//btn：游戏开始
ostart.onmousedown = start;

function start() {
    /*隐藏开始游戏界面*/
    ostartmain.style.display = "none";
    /*显示游戏界面*/
    ogamemain.style.display = "block";
    /*实例化对象*/
    ourplane = new PlayerPlane("img-plane/LiPlane.png", 3, 2, 174, 40, 0, "img-plane/BeiJi_02.png");
    /*监听键盘方向事件*/
    obody.onkeydown = keydown;
    obody.onkeyup = keyup;
    settime();
    score = 0;
    bossblood = 0;
    g = 0;
    oscore.innerHTML = score;
    obblood.innerHTML = bossblood;
}
/*移动控制*/
function keydown() {
    var e = event || arguments[0];
    if (e.keyCode == 37) {
        keyLeft = true;
    }
    if (e.keyCode == 38) {
        keyTop = true;
    }
    if (e.keyCode == 39) {
        keyRight = true;
    }
    if (e.keyCode == 40) {
        keyButtom = true;
    }
    if (e.keyCode == 32) {
        keyShout = true;
    }
}
function keyup() {/*按下和弹起都会返回键盘值*/
    var e = event || arguments[0];
    if (e.keyCode == 37) {
        keyLeft = false;
    }
    if (e.keyCode == 38) {
        keyTop = false;
    }
    if (e.keyCode == 39) {
        keyRight = false;
    }
    if (e.keyCode == 40) {
        keyButtom = false;
    }
    if (e.keyCode == 32) {
        keyShout = false;
    }
}
function moveor() {
    var linx = parseInt(window.getComputedStyle(
        ourplane.node, null).getPropertyValue('left'));
    var liny = parseInt(window.getComputedStyle(
        ourplane.node, null).getPropertyValue('bottom'));
    if (linx > 0 && linx < (bgw - parseInt(window.getComputedStyle(
        ourplane.node, null).getPropertyValue('width'))) && liny > 0 && liny < bgh) {
        move();
    } else if (linx <= 0) {
        keyLeft = false;
        move();
    } else if (linx > (bgw - parseInt(window.getComputedStyle(
        ourplane.node, null).getPropertyValue('width')))) {
        keyRight = false;
        move();
    } else if (liny <= 0) {
        keyButtom = false;
        move();
    } else if (liny > (bgh - parseInt(window.getComputedStyle(
        ourplane.node, null).getPropertyValue('height')))) {
        keyTop = false;
        move();
    }
}
function move() {
    if (keyTop) {
        ourplane.movetop();
    }
    if (keyButtom) {
        ourplane.movebottom();
    }
    if (keyLeft) {
        ourplane.moveleft();
    }
    if (keyRight) {
        ourplane.moveright();
    }
}

/*敌方飞机创建*/
function his() {
    wantonlyx = parseInt(Math.random() * (bgw - 72));
    wantonlyspeed = parseInt(Math.random() * 3) + 1;
    /*速度不能为0*/
    switch (wantonlyx % 4) {
        case 0:
            var imgsrc = "img-plane/BluePlane.png";
            var item = new Plane(imgsrc, wantonlyspeed, wantonlyx, -72);
            applane.push(item);
            break;
        case 1:
            var imgsrc = "img-plane/BluePlane1.png";
            var item = new Plane(imgsrc, wantonlyspeed, wantonlyx, -72);
            applane.push(item);
            break;
        case 2:
            var imgsrc = "img-plane/BluePlane2.png";
            var item = new Plane(imgsrc, wantonlyspeed, wantonlyx, -72);
            applane.push(item);
            break;
        case 3:
            var imgsrc = "img-plane/BluePlane3.png";
            var item = new Plane(imgsrc, wantonlyspeed, wantonlyx, -72);
            applane.push(item);
            break;
    }
}
function opmove() {
    for (var j = 0; j < applane.length; j++) {
        applane[j].movedown();
        if (parseInt(applane[j].node.style.top) >= bgh) {
            applane[j].deleteNode();
            /*必须要这一步*/
            applane.splice(j, 1);
        }
    }
}

var n = 0;
/*boss创建*/
function boss() {
    if (score >= 2000 && score <= 2300) {
        n++;
        if (n == 1) {
            var boosimg = "img-plane/LXPlane.png";
            var boomimgsrc = "img-plane/LXPlane.png";
            var bossshot = "img-plane/EnemyFire_03.png";
            bossblood = 30;
            aboss.push(new BOSSPlane(boosimg, bossblood, 1, -110, boomimgsrc));
            obblood.innerHTML = bossblood;
            abossbulletid = setInterval(bossbullet, 1000);
            abossbulletmoveid = setInterval(bossbulletmove, 1);
        }
    }

}
function bossmove() {
    for (i in aboss) {
        aboss[i].movedown();
        /*横向移动*/
        if ((parseInt(aboss[i].node.style.top) > -bh && parseInt(aboss[i].node.style.top) < 100) || (parseInt(aboss[i].node.style.top) > 320 && parseInt(aboss[i].node.style.top) < 470)) {
            if (parseInt(aboss[i].node.style.left) != 0) {
                aboss[i].node.style.left = parseInt(aboss[i].node.style.left) - aboss[i].speed + "px";
            }
        } else if ((parseInt(aboss[i].node.style.top) >= 100 && parseInt(aboss[i].node.style.top) <= 320) || (parseInt(aboss[i].node.style.top) >= 470 && parseInt(aboss[i].node.style.top) <= bgh)) {
            if (parseInt(aboss[i].node.style.left) != bgw) {
                aboss[i].node.style.left = parseInt(aboss[i].node.style.left) + aboss[i].speed + "px";
            }
        }

        if (parseInt(aboss[i].node.style.bottom) >= bgh) {
            aboss[i].deleteNode();
            /*必须要这一步*/
            aboss.splice(k, 1);
            k--;
        }
    }
}

/*子弹创建*/
function bullet() {
    var bulletimg = "img-plane/bullet_03.png";
    var x = parseInt(window.getComputedStyle(
        ourplane.node, null).getPropertyValue('left'));
    var y = parseInt(ourplane.node.style.bottom) + 50;
    if(ourplane.gift){
        abullet.push(new Bullet(bulletimg, 1, x, y, false));
        abullet.push(new Bullet(bulletimg, 1, x + 50, y, false));
    }else{
        abullet.push(new Bullet(bulletimg, 1, x+25, y, false));
    }
}
function bulletmove() {
    for (k in abullet) {
        abullet[k].shout();
        if (parseInt(abullet[k].node.style.bottom) >= bgh) {
            abullet[k].deleteNode();
            /*必须要这一步*/
            abullet.splice(k, 1);
            k--;
        }
    }
}
function shushu() {
    if (keyShout) {
        bullet();
    } else {
        return;
    }
}
function bossbullet() {
    var bulletimg = "img-plane/EnemyFire_03.png";
    var x = parseInt(window.getComputedStyle(
        aboss[0].node, null).getPropertyValue('left')) + 37;
    var y = (bgh - parseInt(aboss[0].node.style.top)) - 160;
    abossbullet.push(new Bullet(bulletimg, -3, x, y, false));
}
var m;
function bossbulletmove() {
    if (abossbullet.length != 0) {
        for (m in abossbullet) {
            abossbullet[m].node.style.bottom = parseInt(abossbullet[m].node.style.bottom) + abossbullet[m].speed + "px";
            if (parseInt(abossbullet[m].node.style.top) >= bgh) {
                abossbullet[m].deleteNode();
                /*必须要这一步*/
                abossbullet.splice(m, 1);
                m--;
            }
        }
    }

}

/*双子弹--礼物*/
var g = 0;
function gift(){
    if(score>800 && score<1200){
        g++;
        if(g == 1){
            var imgSrc = "img-plane/gift.png";
            wantonly = parseInt(Math.random() * (bgw - 72));
            var y = -50;
            agift.push(new Gift(imgSrc,wantonly,y,false));
        }
    }
}
function giftmove(){
        for(i in agift){
            agift[i].movedown();
            if (parseInt(agift[i].node.style.top) >= bgh) {
                agift[i].deleteNode();
                /*必须要这一步*/
                agift.splice(i, 1);
//                i--;
                return ;
            }
        }
}


/*碰撞判断*/
function touch() {
    /*当界面上没有子弹的时候碰到对方飞机仍会结束游戏*/
    if (abullet.length == 0) {
        for (var j = 0; j < applane.length; j++) {
            if (parseInt(ourplane.node.style.left) <= (parseInt(applane[j].node.style.left) + pplanew) && (parseInt(applane[j].node.style.left) + pplanew) <= (parseInt(ourplane.node.style.left) + oplanew) && (parseInt(applane[j].node.style.top) + pplaneh) >= (bgh - parseInt(ourplane.node.style.bottom)) && (parseInt(applane[j].node.style.top) + pplaneh) <= ((bgh - parseInt(ourplane.node.style.bottom)) + oplaneh)) {
//碰撞本方飞机，游戏结束，统计分数
                applane[j].node.src = "img-plane/BeiJi_02.png";
                obody.onkeydown = null;
                cleartime();
                overscore.innerHTML = score;
                over.style.display = "block";
            }
        }
    }
    /*界面上有子弹时候的碰撞判断*/
    for (var k = 0; k < abullet.length; k++) {
        for (var j = 0; j < applane.length; j++) {
//判断碰撞本方飞机
            if (applane[j].touch == false) {
                if (parseInt(ourplane.node.style.left) <= (parseInt(applane[j].node.style.left) + pplanew) && (parseInt(applane[j].node.style.left) + pplanew) <= (parseInt(ourplane.node.style.left) + oplanew) && (parseInt(applane[j].node.style.top) + pplaneh) >= (bgh - parseInt(ourplane.node.style.bottom)) && (parseInt(applane[j].node.style.top) + pplaneh) <= ((bgh - parseInt(ourplane.node.style.bottom)) + oplaneh)) {
//碰撞本方飞机，游戏结束，统计分数
                    applane[j].node.src = "img-plane/BeiJi_02.png";
                    obody.onkeydown = null;
                    cleartime();
                    overscore.innerHTML = score;
                    over.style.display = "block";
                }
//判断子弹与敌机碰撞
                if (parseInt(applane[j].node.style.left) <= (parseInt(abullet[k].node.style.left) + bulletw) && (parseInt(abullet[k].node.style.left) + bulletw) <= (parseInt(applane[j].node.style.left) + pplanew) && parseInt(applane[j].node.style.top) <= (bgh - parseInt(abullet[k].node.style.bottom)) && (bgh - parseInt(abullet[k].node.style.bottom)) <= (parseInt(applane[j].node.style.top) + pplaneh)) {
                    //敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
                    applane[j].node.src = "img-plane/BeiJi_02.png";
                    applane[j].speed = 0;
                    applane[j].touch = true;
                    score = score + 100;
                    oscore.innerHTML = score;
                    abullet[k].deleteNode();
                    abullet.splice(k, 1);
                }
            }
        }
        for (var i = 0; i < aboss.length; i++) {
            if (aboss[i].blood != 0) {
                if (parseInt(ourplane.node.style.left) >= parseInt(aboss[i].node.style.left) && (parseInt(aboss[i].node.style.left) + bw) >= parseInt(ourplane.node.style.left) && parseInt(aboss[i].node.style.top) <= (bgh - parseInt(ourplane.node.style.bottom)) && (parseInt(aboss[i].node.style.top) + bh) >= (bgh - parseInt(ourplane.node.style.bottom))) {
//碰撞本方飞机，游戏结束，统计分数
                    ourplane.node.src = "img-plane/BeiJi_02.png";
                    obody.onkeydown = null;
                    cleartime();
                    overscore.innerHTML = score;
                    over.style.display = "block";
                }
//判断子弹与boss碰撞
                if (parseInt(aboss[i].node.style.left) <= (parseInt(abullet[k].node.style.left) + bulletw) && (parseInt(abullet[k].node.style.left) + bulletw) <= (parseInt(aboss[i].node.style.left) + bw) && parseInt(aboss[i].node.style.top) <= (bgh - parseInt(abullet[k].node.style.bottom)) && (bgh - parseInt(abullet[k].node.style.bottom)) <= (parseInt(aboss[i].node.style.top) + bh)) {
                    aboss[i].blood = aboss[i].blood - 1;
                    bossblood = bossblood - 1;
                    obblood.innerHTML = bossblood;
                    abullet[k].deleteNode();
                    abullet.splice(k, 1);
                    if (aboss[i].blood == 0) {
                        //敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
                        aboss[i].node.src = "img-plane/BeiJi_02.png";
                        aboss[i].speed = 0;
                        aboss[i].touch = true;
                        score = score + 1000;
                        oscore.innerHTML = score;
                    }

                }
                if(aboss[i].die){
                    aboss[i].node.src = "img-plane/BeiJi_02.png";
                    obody.onkeydown = null;
                    cleartime();
                    overscore.innerHTML = score;
                    over.style.display = "block";
                }
            }
        }
        //boss子弹和飞机
        if (aboss.length != 0) {
            for (var p = 0; p < abossbullet.length; p++) {
                if (parseInt(ourplane.node.style.left) <= (parseInt(abossbullet[p].node.style.left) + 58) &&
                    parseInt(abossbullet[p].node.style.left) <= (parseInt(ourplane.node.style.left) + oplanew)
                    && (bgh - parseInt(abossbullet[p].node.style.bottom) ) >= (bgh - parseInt(ourplane.node.style.bottom) - oplaneh)
                    && (bgh - parseInt(abossbullet[p].node.style.bottom)-90) <= bgh - parseInt(ourplane.node.style.bottom)) {
                    ourplane.blood = ourplane.blood - 1;
                    opblood.innerHTML = ourplane.blood;
                    abossbullet[p].deleteNode();
                    abossbullet.splice(p, 1);
                    if (ourplane.blood <= 0) {
                        opblood.innerHTML = "0";
                        ourplane.node.src = "img-plane/BeiJi_02.png";
                        ourplane.speed = 0;
                        ourplane.touch = true;
                        obody.onkeydown = null;
                        cleartime();
                        overscore.innerHTML = score;
                        over.style.display = "block";
                    }

                }
            }
        }
    }
    /*gift*/
    if(agift.length!=0 && agift[0].node.style.opacity != "0"){
        if (parseInt(ourplane.node.style.left) <= (parseInt(agift[0].node.style.left) + 50) && (parseInt(agift[0].node.style.left) + 50) <= (parseInt(ourplane.node.style.left) + oplanew) && (parseInt(agift[0].node.style.top) + 38) >= (bgh - parseInt(ourplane.node.style.bottom)) && (parseInt(agift[0].node.style.top) + 38) <= ((bgh - parseInt(ourplane.node.style.bottom)) + oplaneh)) {
           agift[0].node.style.opacity = "0";
           ourplane.gift = true;
        }
    }
}
function clearp() {
    for (var i = 0; i < applane.length; i++) {
        if (applane[i].touch) {
            ogamemain.removeChild(applane[i].node);
            applane.splice(i, 1);
        }
    }
    for (j in aboss) {
        if (aboss[j].touch) {
            ogamemain.removeChild(aboss[j].node);
            aboss.splice(j, 1);
        }
    }
}

/*暂停游戏*/
opause.onclick = pause;
function pause() {
    opausepage.style.display = "block";
    obody.onkeydown = null;
    keyShout = false;
    cleartime();
}
/*继续游戏*/
ogoon.onclick = goon;
function goon() {
    opausepage.style.display = "none";
    obody.onkeydown = keydown;
    settime();
    if (aboss.length != 0) {
        abossbulletid = setInterval(bossbullet, 1000);
        abossbulletmoveid = setInterval(bossbulletmove, 1);
    }

}
/*重新开始*/
oreplay.onclick = replay;
newgame.onclick = replay;
function replay() {
    over.style.display = "none";
    opausepage.style.display = "none";
    ourplane.deleteNode();
    var i, j, k, p;
    for (i = aboss.length - 1; i > -1; i--) {
        aboss[i].deleteNode();
        aboss.splice(i, 1);
    }
    for (j = abullet.length - 1; j > -1; j--) {
        abullet[j].deleteNode();
        abullet.splice(j, 1);
    }
    for (k = applane.length - 1; k > -1; k--) {
        applane[k].deleteNode();
        applane.splice(k, 1);
    }
    for (p = abossbullet.length - 1; p > -1; p--) {
        abossbullet[p].deleteNode();
        abossbullet.splice(p, 1);
    }
    n = 0;
    start();
}
/*回到主页*/
omyreturn.onclick = myreturn;
function myreturn() {
    over.style.display = "none";
    opausepage.style.display = "none";
}
/*退出游戏*/
exitgame.onclick = myexit;
function myexit() {
    if (confirm("确定退出游戏？")) {
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
}
