
import underscore, { object } from 'underscore';
export function calcCoilHV(nominalCurrentHV, currentDensityMaxHV, currentDensityMinHV, wires, maxWireInLayerNumHV,
    turnNumHVarray, rimH, rimL, rimCoilHeightDif, wisThick, cardboardThick, paperThick, wireDensity, wireResistance, variantsLV,channalThick,numSemiChannals) {
    let wireSquare = {
        min: nominalCurrentHV / currentDensityMaxHV,
        max: nominalCurrentHV / currentDensityMinHV
    }
    let turnNumHV=Number(turnNumHVarray[(turnNumHVarray.length-1)]);
    let goodWires = [];
    for (let wire of wires) {
        for (let wireInLayer = 1; wireInLayer <= maxWireInLayerNumHV; wireInLayer++) {
            if (wire.wsquare * wireInLayer >= wireSquare.min && wire.wsquare * wireInLayer <= wireSquare.max) {
                let tmp= Object.assign({}, wire);
                tmp.wiresNum = wireInLayer;
                tmp.wireInLayer = wireInLayer;
                tmp.Layers = 0;
                //console.log(tmp.wname,tmp.wiresNum,tmp);
                goodWires.push(tmp);
            }
        }
    }
    let variants = [];
    for (let variantLV of variantsLV) {
        for (let wire of goodWires) {
            if (wire.wisThick != null) {
                wisThick = wire.wisThick.replace(",", ".");
            };
            if(wire.wprofile == 'круг'){
                wire.wprofileHeigth=wire.wdiameter;
                wire.wprofileWidth=wire.wdiameter;
            }
            let turnNuminLayerHV = Math.floor((rimH - rimCoilHeightDif*2-(((wire.wprofileWidth +
                 2 * Number(wisThick)) * wire.wireInLayer)+
                 0.25*((wire.wprofileWidth + 2 * Number(wisThick)) * wire.wireInLayer))) / ((wire.wprofileWidth + 2 * Number(wisThick)) * wire.wireInLayer));
            let coilH = turnNuminLayerHV * (wire.wprofileWidth + 2 * Number(wisThick)) * wire.wireInLayer;
            let Layers = Math.ceil(turnNumHV / turnNuminLayerHV);
            let turnNuminLastLayerHV = turnNumHV - turnNuminLayerHV * (Layers-1);
            let tmp = Object.assign({}, wire);
            tmp.Layers = Layers;
            tmp.wisThick = wisThick;
            tmp.coilH = coilH;
            let numSemiChannals = Math.floor((tmp.Layers-1)/4);
            tmp.numSemiChannals=numSemiChannals;
            let firstLayerRad = variantLV.radDimofCoilLV + 2 * cardboardThick + Number(channalThick) + 2 * cardboardThick + tmp.wprofileHeigth + 2 * tmp.wisThick;
            let lastLayerRad = firstLayerRad + 2*paperThick + (tmp.Layers - 1) * (2 * paperThick + tmp.wprofileHeigth + 2 * tmp.wisThick) + numSemiChannals * channalThick / 2;
            let firstCoilLength = 6.28 * firstLayerRad + 2 * rimL;
            let lastCoilLength = 6.28 * lastLayerRad + 2 * rimL;
            let radDimofCoilHV = lastLayerRad + -numSemiChannals * channalThick / 2;
            let midCoilLength = (firstCoilLength + lastCoilLength) / 2;
            let wireLength = midCoilLength * tmp.wireInLayer * turnNumHV / 1000 + 6;
            let wireWeigth = wireLength * tmp.wsquare * wireDensity / 1e6;
            let wireWeigth3fHV = 3 * wireWeigth;
            let lossSC = nominalCurrentHV * nominalCurrentHV * (midCoilLength + tmp.wiresNum * 0.2) * wireResistance * turnNumHV / (tmp.wsquare * tmp.wiresNum) / 1000;
            let lossSC3fHV = lossSC * 3;
            let minSkew = ((rimH - tmp.coilH) - 1.25 * (tmp.wprofileWidth + 2 * tmp.wisThick) * tmp.wireInLayer) / 2;
            let maxSkew = rimH - tmp.coilH - minSkew - ((tmp.wprofileWidth + 2 * tmp.wisThick) * tmp.wireInLayer) / 4;
            let cardboardAdding = rimH - minSkew - maxSkew - turnNuminLastLayerHV * (tmp.wprofileWidth + 2 * tmp.wisThick) * tmp.wireInLayer - ((tmp.wprofileWidth + 2 * tmp.wisThick) * tmp.wireInLayer) / 4;
            tmp.firstLayerRad = firstLayerRad;
            tmp.lastLayerRad = lastLayerRad;
            tmp.firstCoilLength = firstCoilLength;
            tmp.lastCoilLength = lastCoilLength;
            tmp.radDimofCoilHV = radDimofCoilHV;
            tmp.midCoilLength = midCoilLength;
            tmp.wireLength = wireLength;
            tmp.wireWeigth = wireWeigth;
            tmp.wireWeigth3fHV = wireWeigth3fHV;
            tmp.lossSC = lossSC;
            tmp.lossSC3fHV = lossSC3fHV;
            tmp.minSkew = minSkew;
            tmp.maxSkew = maxSkew;
            tmp.variantLV = variantLV;
            tmp.turnNuminLastLayerHV = turnNuminLastLayerHV;
            tmp.turnNuminLayerHV=turnNuminLayerHV;
            tmp.cardboardAdding = cardboardAdding;
            variants.push(tmp);
        }
    }
    //console.log(variants);
    /* variants.forEach(variant => {
        console.log(variant.wname,variant.wireInLayer,variant.Layers);
    }); */
    return variants;
}
