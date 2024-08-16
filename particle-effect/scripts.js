const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.fillStyle = 'green'
ctx.strokeStyle = 'white'
ctx.lineWidth = 1
// const gradient = ctx.clearLinearGradient(0,0,canvas.width,canvas.height)
//  gradient.addColorStop(0,'white')
//  gradient.addColorStop(0.5,'magenta')
//  gradient.addColorStop(1,'blue')
//  ctx.fillStyle = gradient
class Paricle {
    constructor(effect) {
        this.effect = effect
        this.radius = Math.random()*10+2;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
        this.vx = Math.random() * 2 - 0.5;
        this.vy = Math.random() * 2 - 3

    }
    draw(context) {
        context.fillStyle = `hsl(` + Math.random() * 420 + `,100%,50%)`
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
       // context.stroke();
    }
    update() {
        this.x += this.vx;
        if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;
        this.y += this.vy
        if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
    }
}
class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = []
        this.numberOfPaticles = 420;
        this.createParticles();

    }
    createParticles() {
        for (let i = 0; i < this.numberOfPaticles; i++) {
            this.particles.push(new Paricle(this));
        }
    }
    handleParticles(context) {
        this.particles.forEach(particle => {
            particle.draw(context)
            particle.update()
        });
        this.connectParticles(context);
    }
    connectParticles(context) {
        const mxdist = 100;
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.hypot(dx, dy);
                if (distance < mxdist) {
                    context.save()
                    const opacity = 1-(distance/mxdist);
                    context.globalAlpha=opacity;
                    context.beginPath();
                    context.moveTo(this.particles[i].x, this.particles[i].y);
                    context.lineTo(this.particles[j].x, this.particles[j].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
    }
}
const effect = new Effect(canvas);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    effect.handleParticles(ctx)
    requestAnimationFrame(animate)
}
animate();