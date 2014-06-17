function Particle(pos, vel, accel, startSize, endSize, startColor, endColor, speed, life) {
  this.pos = pos;
  this.vel = vel;
  this.accel = accel;
  this.startSize = startSize;
  this.endSize = endSize;
  this.startColor = startColor;
  this.endColor = endColor;
  this.speed = speed;
  this.life = life;

  this.colorInterpolator = endColor.sub(startColor).div(life);
  this.sizeInterpolator = (endSize - startSize) / life;

  this.size  = startSize;
  this.color = startColor;
  
  this.update = function() {
    this.vel = this.vel.add(this.accel).mul(this.speed);
    this.pos = this.pos.add(this.vel);
    this.color = this.color.add(this.colorInterpolator);
    this.size += this.sizeInterpolator;

    this.life--;
  }
  
  this.draw = function(ctx) {
    ctx.fillStyle = this.color.toCssString();
    ctx.beginPath();
    ctx.arc(Math.floor(this.pos.x), Math.floor(this.pos.y), this.size, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  this.dead = function() {
    return this.life <= 0;
  }
}

function ParticleParameters(emitter, createTime, totalTime, maxParticles,
                            particlesPerCreation, startSize, endSize, startColor, 
                            endColor, life, accel, speed, dispersion) {
  this.emitter = emitter;
  this.createTime = createTime;
  this.totalTime = totalTime
  this.maxParticles = maxParticles;
  this.particlesPerCreation = particlesPerCreation;
  this.startSize = startSize;
  this.endSize = endSize;
  this.startColor = startColor;
  this.endColor = endColor;
  this.life = life;
  this.accel = accel;
  this.speed = speed;
  this.dispersion = dispersion;
}

function ParticleSystem(ctx, parameters) {
  this.ctx = ctx;
  this.params = parameters;
  this.particles = new Array();

  this.createTime = 0;

  this.generateParticles = function() {
    var num = Math.min(this.params.maxParticles - this.particles.length, this.params.particlesPerCreation);
    for( var i = 0; i < num; i++ ) {
      var angle = Math.random() * 2 * Math.PI * this.params.dispersion;
      //var vel = new Vector2D(Math.cos(angle), Math.sin(angle))

      var vel = new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1)

      var p = new Particle(this.params.emitter, vel, this.params.accel, this.params.startSize, this.params.endSize, 
                           this.params.startColor, this.params.endColor, this.params.speed, this.params.life);

      this.particles.push(p);
    }
  }

  this.update = function() {
    if( this.createTime <= 0 ) {
      this.generateParticles();
      this.createTime = this.params.createTime;
    }

    for( var i = this.particles.length - 1; i >= 0; i-- ) {
      var p = this.particles[i];

      if( !p.dead() ) {
        p.update();
      }else {
        this.particles.splice(i, 1);
      }
    }

    this.createTime--;
  }

  this.draw = function() {
    for( var i = 0; i < this.particles.length; i++ ) {
      this.particles[i].draw(this.ctx);
    }        
  }
}
