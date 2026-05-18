export function drawSimulation(ctx, particles, silverWall){

    ctx.clearRect(0,0,420,420);

    ctx.strokeStyle = "#666";
    ctx.lineWidth = 8;
    ctx.strokeRect(10,10,400,400);

    silverWall.forEach(s=>{

        ctx.beginPath();

        ctx.arc(s.x, s.y, 3, 0, Math.PI*2);

        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "white";

        ctx.fill();

        ctx.shadowBlur = 0;
    });

    particles.forEach(p=>{

        if(!p.active) return;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI*2
        );

        ctx.fillStyle =
            p.type === "Ag"
            ? "#00d9ff"
            : "#ff5a36";

        ctx.fill();
    });
}