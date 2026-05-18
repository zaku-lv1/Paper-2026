import { Particle }
from "./core/particle.js";

import {
    DT,
    MAX_TIME,
    WALL_MARGIN,
    TRANSMIT_ALPHA
}
from "./core/constants.js";

import { experimental }
from "./data/experimental.js";

import { calcReactionProb }
from "./core/kinetics.js";

import { drawSimulation }
from "./graphics/renderer.js";

import { drawGraph }
from "./graphics/graph.js";

import { bindControls }
from "./ui/controls.js";

const canvas =
    document.getElementById("simCanvas");

const ctx =
    canvas.getContext("2d");

const graphCanvas =
    document.getElementById("graphCanvas");

const gctx =
    graphCanvas.getContext("2d");

let particles = [];
let silverWall = [];

let history = [];
let timeHistory = [];

let running = false;

let startTime;
let animationId;

let firstDepositTime = null;

function getExpTime(){

    const conc =
        parseFloat(
            document.getElementById("conc").value
        ).toFixed(2);

    const agentKey =
        document.querySelector(
            "#agent option:checked"
        ).dataset.agent;

    return experimental[agentKey][conc];
}

function init(){

    particles = [];
    silverWall = [];

    history = [];
    timeHistory = [];

    firstDepositTime = null;

    const conc =
        parseFloat(
            document.getElementById("conc").value
        );

    const agCount = 150;

    const redCount =
        Math.min(
            350,
            Math.floor(conc*2500)
        );

    for(let i=0;i<agCount;i++){

        particles.push(
            new Particle("Ag")
        );
    }

    for(let i=0;i<redCount;i++){

        particles.push(
            new Particle("Red")
        );
    }

    document.getElementById("expTime")
        .innerText =
        getExpTime()?.toFixed(1) ?? "—";

    drawSimulation(
        ctx,
        particles,
        silverWall
    );

    drawGraph(
        gctx,
        history,
        timeHistory,
        getExpTime()
    );
}

function loop(){

    if(!running) return;

    const now =
        (performance.now()-startTime)/1000;

    document.getElementById("timer")
        .innerText =
        now.toFixed(2);

    const kBase =
        parseFloat(
            document.getElementById("agent").value
        );

    let activeRed = 0;
    let activeAg = 0;

    particles.forEach(p=>{

        if(p.active && p.type==="Red")
            activeRed++;

        if(p.active && p.type==="Ag")
            activeAg++;
    });

    const reactionProb =
        calcReactionProb(
            kBase,
            activeRed
        );

    for(let i=0;i<particles.length;i++){

        const p = particles[i];

        if(p.type==="Ag" && p.active){

            p.update();

            const nearWall =
                p.x < 10 + WALL_MARGIN ||
                p.x > 410 - WALL_MARGIN ||
                p.y < 10 + WALL_MARGIN ||
                p.y > 410 - WALL_MARGIN;

            if(nearWall){

                for(let j=0;j<particles.length;j++){

                    const r = particles[j];

                    if(r.type==="Red" && r.active){

                        const dist =
                            Math.hypot(
                                p.x-r.x,
                                p.y-r.y
                            );

                        if(
                            dist < 10 &&
                            Math.random() < reactionProb
                        ){

                            p.active = false;
                            r.active = false;

                            silverWall.push({
                                x:p.x,
                                y:p.y
                            });

                            if(firstDepositTime===null){

                                firstDepositTime = now;

                                document
                                    .getElementById("startTime")
                                    .innerText =
                                    now.toFixed(2);
                            }

                            break;
                        }
                    }
                }
            }
        }

        else if(
            p.type==="Red" &&
            p.active
        ){

            p.update();
        }
    }

    const trans =
        100*Math.exp(
            -TRANSMIT_ALPHA*silverWall.length
        );

    document.getElementById("trans")
        .innerText =
        trans.toFixed(1);

    document.getElementById("agCount")
        .innerText =
        activeAg;

    history.push(trans);
    timeHistory.push(now);

    drawSimulation(
        ctx,
        particles,
        silverWall
    );

    drawGraph(
        gctx,
        history,
        timeHistory,
        getExpTime()
    );

    if(now > MAX_TIME){

        running = false;

        return;
    }

    animationId =
        requestAnimationFrame(loop);
}

document.getElementById("startBtn")
.onclick = ()=>{

    if(running) return;

    init();

    running = true;

    startTime = performance.now();

    loop();
};

document.getElementById("resetBtn")
.onclick = ()=>{

    running = false;

    cancelAnimationFrame(animationId);

    init();
};

bindControls(init);

init();