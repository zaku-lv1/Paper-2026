export class Particle{

    constructor(type){
        this.type = type;
        this.active = true;

        this.radius = type === "Ag" ? 2.5 : 2;

        this.x = 40 + Math.random()*340;
        this.y = 40 + Math.random()*340;

        this.vx = (Math.random()-0.5)*2;
        this.vy = (Math.random()-0.5)*2;
    }

    update(){

        if(!this.active) return;

        this.vx += (Math.random()-0.5)*0.06;
        this.vy += (Math.random()-0.5)*0.06;

        const vmax = 2;

        this.vx = Math.max(-vmax, Math.min(vmax, this.vx));
        this.vy = Math.max(-vmax, Math.min(vmax, this.vy));

        this.x += this.vx;
        this.y += this.vy;

        if(this.x < 15){
            this.x = 15;
            this.vx *= -1;
        }

        if(this.x > 405){
            this.x = 405;
            this.vx *= -1;
        }

        if(this.y < 15){
            this.y = 15;
            this.vy *= -1;
        }

        if(this.y > 405){
            this.y = 405;
            this.vy *= -1;
        }
    }
}