import { MAX_TIME } from "../core/constants.js";

export function drawGraph(
    gctx,
    history,
    timeHistory,
    exp
){

    gctx.clearRect(0,0,420,420);

    const left = 45;
    const right = 410;
    const top = 15;
    const bottom = 400;

    const width = right-left;
    const height = bottom-top;

    gctx.strokeStyle = "#444";

    gctx.beginPath();

    gctx.moveTo(left, top);
    gctx.lineTo(left, bottom);
    gctx.lineTo(right, bottom);

    gctx.stroke();

    if(history.length < 2) return;

    gctx.strokeStyle = "#00d9ff";
    gctx.lineWidth = 2;

    gctx.beginPath();

    history.forEach((v,i)=>{

        const t = timeHistory[i];

        const x =
            left + (t/MAX_TIME)*width;

        const y =
            bottom - (v/100)*height;

        if(i===0) gctx.moveTo(x,y);
        else gctx.lineTo(x,y);
    });

    gctx.stroke();

    if(exp){

        const x =
            left + (exp/MAX_TIME)*width;

        gctx.strokeStyle = "#ffcc00";

        gctx.beginPath();

        gctx.moveTo(x, top);
        gctx.lineTo(x, bottom);

        gctx.stroke();
    }
}