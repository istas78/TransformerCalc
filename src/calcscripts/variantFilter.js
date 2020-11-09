
import underscore, { object } from 'underscore';
export function variantFilter(variantsHV, windowWidth, limbWidth, power, scheemHV, scheemLV,nominalCurrentLV,nominalCurrentHV,coilCoilClearance,currentDensityAllMin,currentDensityAllMax) {

    let goodVariants = [];
    let lowStoreQuantityVariants = [];
    //console.log(Number(currentDensityAllMax),Number(currentDensityAllMin));
    for (let variant of variantsHV) {
        if (Number(variant.radDimofCoilHV * 2) <= Number(Number(windowWidth) + Number(limbWidth) - coilCoilClearance)
         && 
         (variant.lossSC3fHV + variant.variantLV.lossSC3fLV) < getLossSCgrade(power, scheemHV, scheemLV)
         &&
         ( (currentDensityAllMin <= (Number(nominalCurrentLV / (variant.variantLV.wsquare * variant.variantLV.wiresNum))) + (Number(nominalCurrentHV / (variant.wsquare * variant.wiresNum))))
            &&
            ((Number(nominalCurrentLV / (variant.variantLV.wsquare * variant.variantLV.wiresNum))) + (Number(nominalCurrentHV / (variant.wsquare * variant.wiresNum)))<= currentDensityAllMax ))
        ) {
            // console.log(variant.wireWeigth3fHV, variant.wquantity, variant.variantLV.wireWeigth3fLV, variant.variantLV.wquantity)
            if (variant.wireWeigth3fHV > variant.wquantity || variant.variantLV.wireWeigth3fLV > variant.variantLV.wquantity
                 ||
                 ((variant.wname == variant.variantLV.wname) && ((variant.wireWeigth3fHV+variant.variantLV.wireWeigth3fLV)> variant.wquantity))) {
                let tmp= Object.assign({}, variant);
                tmp.wireWeigthAll=variant.wireWeigth3fHV+variant.variantLV.wireWeigth3fLV;
                lowStoreQuantityVariants.push(tmp);
            } else {               
                let tmp= Object.assign({}, variant);
                tmp.wireWeigthAll=variant.wireWeigth3fHV+variant.variantLV.wireWeigth3fLV;
                goodVariants.push(tmp);
            }
        }

    }
    goodVariants.sort(function(a,b){
        if( Number(a.wireWeigthAll) < Number(b.wireWeigthAll)){
            return -1;
        }
        if( Number(a.wireWeigthAll) > Number(b.wireWeigthAll)){
            return 1;
        }
        if( Number(a.wireWeigthAll) == Number(b.wireWeigthAll)){
            return 0;
        }
     } );
    lowStoreQuantityVariants.sort(function(a,b){
        if( Number(a.wireWeigthAll) < Number(b.wireWeigthAll)){
            return -1;
        }
        if( Number(a.wireWeigthAll) > Number(b.wireWeigthAll)){
            return 1;
        }
        if( Number(a.wireWeigthAll) == Number(b.wireWeigthAll)){
            return 0;
        }
     } );
   /*  goodVariants.sort((a,b)=> a.wname.localeCompare(b.wname) || 
                  a.variantLV.wname.localeCompare(b.variantLV.wname)  );
    lowStoreQuantityVariants.sort((a,b)=> a.wname.localeCompare(b.wname) || 
                  a.variantLV.wname.localeCompare(b.variantLV.wname)  ); */
    return {good: goodVariants, lowStor: lowStoreQuantityVariants};
}
export function getLossSCgrade(power, scheemLV, scheemHV) {
    if (scheemHV == 'Звезда' && scheemLV == 'Звезда') {
        if (power <= 25) {
            return 660;
        } else if (power <= 40) {
            return 990;
        } else if (power <= 63) {
            return 1397;
        } else if (power <= 100) {
            return 2167;
        } else if (power <= 160) {
            return 3025;
        } else if (power <= 250) {
            return 4070;
        } else if (power <= 400) {
            return 6050;
        } else if (power <= 630) {
            return 8360;
        } else if (power <= 1000) {
            return 11550;
        }

    } else if (scheemHV == 'Звезда' && scheemLV == 'Зигзаг') {
        if (power <= 25) {
            return 770;
        } else if (power <= 40) {
            return 1100;
        } else if (power <= 63) {
            return 1617;
        } else if (power <= 100) {
            return 2497;
        } else if (power <= 160) {
            return 3410;
        } else if (power <= 250) {
            return 4070;
        } else if (power <= 400) {
            return 6050;
        } else if (power <= 630) {
            return 8360;
        } else if (power <= 1000) {
            return 11550;
        }


    } else if (scheemHV == 'Треугольник' && scheemLV == 'Звезда') {
        if (power <= 25) {
            return 660;
        } else if (power <= 40) {
            return 990;
        } else if (power <= 63) {
            return 1397;
        } else if (power <= 100) {
            return 2277;
        } else if (power <= 160) {
            return 3410;
        } else if (power <= 250) {
            return 4510;
        } else if (power <= 400) {
            return 6490;
        } else if (power <= 630) {
            return 8910;
        } else if (power <= 1000) {
            return 11550;
        }
    }
}
