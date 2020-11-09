
import underscore, { object } from 'underscore'
export function calcCoilLV(nominalCurrentLV, currentDensityMaxLV, currentDensityMinLV, wires, maxWireInLayerNumLV,
    maxLayersNumLV,turnNumLV,rimH,rimD,rimL,rimCoilHeightDif,wisThick,cardboardThick,paperThick,wireDensity,wireResistance,cbLayersOnRim,channalThick) {
        let wireSquare = {
        min: nominalCurrentLV / currentDensityMaxLV,
        max: nominalCurrentLV / currentDensityMinLV
    }
    let goodWires = [];
    for (let wire of wires) {
        for (let wiresNum = 1; wiresNum <= maxWireInLayerNumLV*maxLayersNumLV; wiresNum++) {
                if (wire.wsquare * wiresNum >= wireSquare.min && wire.wsquare * wiresNum <= wireSquare.max) {
                    let tmp= Object.assign({}, wire);
                    tmp.wiresNum = wiresNum;
                    tmp.wireInLayer = 0;
                    tmp.Layers = 0;
                    //console.log(tmp.wname,tmp.wiresNum,tmp);
                    goodWires.push(tmp);
                    
                }
        }
    }
   /*  goodWires.forEach(variant => {
        console.log(variant.wname,variant.wireInLayer,variant.Layers,variant.wiresNum,variant);
    }); */ 
   
    let variants=[];
    for (let wire of goodWires) {
        if(wire.wisThick !=null){ 
            wisThick=wire.wisThick.replace(",", ".");
        };
        for (let wireInLayer=1; wireInLayer <= maxWireInLayerNumLV; wireInLayer++) {
            //let turnNumInLayer=(rimH-rimCoilHeightDif*2-(wire.wprofileWidth+2*Number(wisThick))*wireInLayer)/(wire.wprofileWidth+2*Number(wisThick))*wireInLayer;
            let coilH=turnNumLV*(wire.wprofileWidth+2*Number(wisThick))*wireInLayer;
           
            if (coilH <=(rimH-rimCoilHeightDif*2-(wire.wprofileWidth+2*Number(wisThick))*wireInLayer)){
                if(wire.wiresNum/wireInLayer<=maxLayersNumLV && (Number(wire.wiresNum/wireInLayer).toFixed(1) - Number(wire.wiresNum/wireInLayer).toFixed(0)) == 0 ){
                    let tmp= Object.assign({}, wire);
                    tmp.wireInLayer=wireInLayer;
                    tmp.Layers =tmp.wiresNum/wireInLayer;
                    let numSemiChannals = Math.floor((tmp.Layers-1)/4);
                    tmp.wisThick= wisThick;
                    tmp.coilH=coilH;
                    tmp.numSemiChannals=numSemiChannals;
                    let firstLayerRad = Number(rimD)/2+Number(cbLayersOnRim)*Number(cardboardThick)+Number(tmp.wprofileHeigth)+2*Number(tmp.wisThick);
                    let lastLayerRad= firstLayerRad+2*paperThick +(tmp.Layers-1)*(2*paperThick+tmp.wprofileHeigth+2*tmp.wisThick);//+numSemiChannals*channalThick/2;
                    let firstCoilLength=6.28*firstLayerRad+2*rimL;
                    let lastCoilLength=6.28*lastLayerRad+2*rimL;
                    let radDimofCoilLV=lastLayerRad;//+2*paperThick;
                    let midCoilLength=(firstCoilLength+lastCoilLength)/2;
                    let wireLength=midCoilLength*tmp.wireInLayer*tmp.Layers*turnNumLV/1000+tmp.wiresNum*0.25*2;
                    let wireWeigth=wireLength*tmp.wsquare*wireDensity/1e6;
                    let wireWeigth3fLV=3*wireWeigth;
                    let lossSC=nominalCurrentLV*nominalCurrentLV*(midCoilLength+tmp.wiresNum*0.2)*wireResistance*turnNumLV/(tmp.wsquare*tmp.wiresNum)/1000;
                    let lossSC3fLV=lossSC*3;
                    let minSkew=((rimH - tmp.coilH)-(tmp.wprofileWidth+2*tmp.wisThick)*tmp.wireInLayer)/2;
                    let maxSkew=rimH-tmp.coilH-minSkew;

                    tmp.firstLayerRad=firstLayerRad;
                    tmp.lastLayerRad=lastLayerRad;
                    tmp.firstCoilLength=firstCoilLength;
                    tmp.lastCoilLength=lastCoilLength;
                    tmp.radDimofCoilLV=radDimofCoilLV;
                    tmp.midCoilLength=midCoilLength;
                    tmp.wireLength=wireLength;
                    tmp.wireWeigth=wireWeigth;
                    tmp.wireWeigth3fLV=wireWeigth3fLV
                    tmp.lossSC=lossSC;
                    tmp.lossSC3fLV=lossSC3fLV;
                    tmp.minSkew=minSkew;
                    tmp.maxSkew=maxSkew;
                    variants.push(tmp);
                }
            }else{
                if(wire.wiresNum == wireInLayer){
                    let turnNuminLayerLV = 
                    Math.floor(
                        (
                            Number(rimH)-Number(rimCoilHeightDif)*2-(
                                Number(wire.wprofileWidth) + 2*Number(wisThick)
                                )
                                *
                                Number(wireInLayer)
                        )
                        /
                        (
                            (
                            Number(wire.wprofileWidth)+2*Number(wisThick)
                            )
                            *
                            Number(wireInLayer)
                        )
                    );
                    coilH = turnNuminLayerLV * (wire.wprofileWidth + 2 * Number(wisThick)) * wireInLayer;
                    //console.log(rimH,rimCoilHeightDif, wire.wprofileWidth,wisThick,wireInLayer,coilH,turnNuminLayerLV,wire.wname);
                    let tmp= Object.assign({}, wire);
                    tmp.wireInLayer=wireInLayer;
                    tmp.Layers = Math.ceil(turnNumLV / turnNuminLayerLV);
                    let turnNuminLastLayerLV = turnNumLV - turnNuminLayerLV * (tmp.Layers-1);
                    tmp.turnNuminLayerLV=turnNuminLayerLV;
                    tmp.turnNuminLastLayerLV=turnNuminLastLayerLV;
                    let numSemiChannals = Math.floor(tmp.Layers/4);
                    tmp.wisThick= wisThick;
                    tmp.coilH=coilH;
                    tmp.numSemiChannals=numSemiChannals;
                    let firstLayerRad = Number(rimD)/2+Number(cbLayersOnRim)*Number(cardboardThick)+Number(tmp.wprofileHeigth)+2*Number(tmp.wisThick);
                    let lastLayerRad= firstLayerRad+2*paperThick +(tmp.Layers-1)*(2*paperThick+tmp.wprofileHeigth+2*tmp.wisThick);//+numSemiChannals*channalThick/2;
                    let firstCoilLength=6.28*firstLayerRad+2*rimL;
                    let lastCoilLength=6.28*lastLayerRad+2*rimL;
                    let radDimofCoilLV=lastLayerRad+2*paperThick;
                    let midCoilLength=(firstCoilLength+lastCoilLength)/2;
                    let wireLength=midCoilLength*tmp.wireInLayer*tmp.Layers*turnNumLV/1000+tmp.wiresNum*0.25*2;
                    let wireWeigth=wireLength*tmp.wsquare*wireDensity/1e6;
                    let wireWeigth3fLV=3*wireWeigth;
                    let lossSC=nominalCurrentLV*nominalCurrentLV*(midCoilLength+tmp.wiresNum*0.2)*wireResistance*turnNumLV/(tmp.wsquare*tmp.wiresNum)/1000;
                    let lossSC3fLV=lossSC*3;
                    let minSkew=((rimH - tmp.coilH)-(tmp.wprofileWidth+2*tmp.wisThick)*tmp.wireInLayer)/2;
                    let maxSkew=rimH-tmp.coilH-minSkew;
                    let cardboardAdding = rimH - minSkew - maxSkew - turnNuminLastLayerLV * (tmp.wprofileWidth + 2 * tmp.wisThick) * tmp.wireInLayer - ((tmp.wprofileWidth + 2 * tmp.wisThick) * tmp.wireInLayer) / 4;
                    tmp.cardboardAdding = cardboardAdding;
                    tmp.firstLayerRad=firstLayerRad;
                    tmp.lastLayerRad=lastLayerRad;
                    tmp.firstCoilLength=firstCoilLength;
                    tmp.lastCoilLength=lastCoilLength;
                    tmp.radDimofCoilLV=radDimofCoilLV;
                    tmp.midCoilLength=midCoilLength;
                    tmp.wireLength=wireLength;
                    tmp.wireWeigth=wireWeigth;
                    tmp.wireWeigth3fLV=wireWeigth3fLV
                    tmp.lossSC=lossSC;
                    tmp.lossSC3fLV=lossSC3fLV;
                    tmp.minSkew=minSkew;
                    tmp.maxSkew=maxSkew;
                    variants.push(tmp);
                }
            }
        }
    }
  /*    console.log(variants);
    variants.forEach(variant => {
        console.log(variant.wname,variant.wireInLayer,variant.Layers,variant.wiresNum);
    });  */
    return variants;
    
}
