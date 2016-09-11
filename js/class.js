/*基础类，用于继承，减少代码量*/
function basic(imgSrc,x,y,touch){
    this.node = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.touch = false;
}


//玩家飞机类
function PlayerPlane(imgSrc, blood, speed, x, y, sroce, boomImgSrc) {
    basic.call(this,imgSrc,x,y,false);
    this.boomImgSrc = boomImgSrc;
    this.blood = blood;
    this.speed = speed;
    this.sroce = sroce;
    this.gift = false;
//  初始化函数(需要每次初始化调用，所以不要写在原型里面)
    this.creat = creat;
    function creat() {
        this.node.style.position = "absolute";
        this.node.style.left = this.x + "px";
        this.node.style.bottom = this.y + "px";
        this.node.src = this.imgSrc;
        this.node.id = "playerPlane";
        ogamemain.appendChild(this.node);
    }
    this.creat();
}
//    玩家控制飞机移动（为对象公用方法，不需要每次实例化都创建一次，所以写在构造函数外）
PlayerPlane.prototype.moveleft = function () {
    this.node.style.left = parseInt(window.getComputedStyle(
        this.node, null).getPropertyValue('left')) - this.speed + "px";
}
PlayerPlane.prototype.moveright = function () {
    this.node.style.left = parseInt(window.getComputedStyle(
        this.node, null).getPropertyValue('left')) + this.speed + "px";
}
PlayerPlane.prototype.movetop = function () {
    this.node.style.bottom = parseInt(window.getComputedStyle(
        this.node, null).getPropertyValue('bottom')) + this.speed + "px";
}
PlayerPlane.prototype.movebottom = function () {
    this.node.style.bottom = parseInt(window.getComputedStyle(
        this.node, null).getPropertyValue('bottom')) - this.speed + "px";
}
PlayerPlane.prototype.deleteNode = function () {
    ogamemain.removeChild(this.node);
}


//BOSS类
function BOSSPlane(imgSrc, blood, speed, y, boomImgSrc) {
    this.node = document.createElement("img");
    this.imgSrc = imgSrc;
    this.boomImgSrc = boomImgSrc;
    this.blood = blood;
    this.speed = speed;
    this.y = y;
    this.touch = false;
    this.creat = creat;
    this.die = false;
    function creat() {
        this.node.style.position = "absolute";
        this.node.style.left = 150 + "px";
        this.node.style.top = this.y + "px";
        this.node.src = this.imgSrc;
//        this.node.style.zIndex = "1";
        ogamemain.appendChild(this.node);
    }
    this.creat();
//    this.nowt = this.node.style.top;
}
BOSSPlane.prototype.movedown = function () {
    this.node.style.top = parseInt(this.node.style.top) + this.speed + "px";
}
BOSSPlane.prototype.deleteNode = function () {
    ogamemain.removeChild(this.node);
}


//敌方飞机类
function Plane(imgSrc, speed, x, y) {
    basic.call(this,imgSrc,x,y,false);
    this.speed = speed;
    this.init = init;
    function init() {
        this.node.style.position = "absolute";
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
        this.node.src = this.imgSrc;
        ogamemain.appendChild(this.node);
    }

    this.init();
}
Plane.prototype.movedown = function () {
    this.node.style.top = parseInt(this.node.style.top) + this.speed + "px";
}
Plane.prototype.deleteNode = function () {
    ogamemain.removeChild(this.node);
}


//子弹类
function Bullet(imgSrc, speed, x, y, touch) {
    basic.call(this,imgSrc,x,y,false);
    this.speed = speed;
    /*碰撞次数*/
    this.init = init;
    function init() {
        this.node.style.position = "absolute";
        this.node.style.left = this.x + "px";
        this.node.style.bottom = this.y + "px";
        this.node.src = this.imgSrc;
        ogamemain.appendChild(this.node);
    }

    this.init();
}
Bullet.prototype.shout = function () {
    this.node.style.bottom = parseInt(this.node.style.bottom) + this.speed + "px";
}
Bullet.prototype.deleteNode = function () {
    ogamemain.removeChild(this.node);
}
function Gift(imgSrc,x,y,touch){
    basic.call(this,imgSrc,x,y,touch)
    this.touch = touch;

    this.init = init;
    function init() {
        this.node.style.position = "absolute";
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y + "px";
        this.node.src = this.imgSrc;
        ogamemain.appendChild(this.node);
    }
    this.init();
}
Gift.prototype.deleteNode = function (){
    ogamemain.removeChild(this.node);
}
Gift.prototype.movedown = function (){
    this.node.style.top = parseInt(this.node.style.top) + 5 + "px";
}