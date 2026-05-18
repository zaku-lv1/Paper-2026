import { KM, DT } from "./constants.js";

export function calcReactionProb(kBase, activeRed){

    const kEff =
        kBase * activeRed / (KM + activeRed);

    return 1 - Math.exp(-kEff * DT);
}