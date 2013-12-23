Clazz.declarePackage ("J.shapebio");
Clazz.load (["J.shapebio.BioShapeCollection"], "J.shapebio.Trace", ["J.atomdata.RadiusData", "J.constant.EnumVdw", "J.modelset.Atom"], function () {
c$ = Clazz.declareType (J.shapebio, "Trace", J.shapebio.BioShapeCollection);
$_M(c$, "initShape", 
function () {
Clazz.superCall (this, J.shapebio.Trace, "initShape", []);
this.madOn = 600;
this.madHelixSheet = 1500;
this.madTurnRandom = 500;
this.madDnaRna = 1500;
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if (propertyName === "putty") {
this.setPutty (value, bsSelected);
return;
}this.setPropBSC (propertyName, value, bsSelected);
}, "~S,~O,J.util.BS");
$_M(c$, "setPutty", 
($fz = function (info, bsAtoms) {
var n = bsAtoms.cardinality ();
if (n == 0) return;
var data =  Clazz.newFloatArray (bsAtoms.length (), 0);
var sum = 0.0;
var sumsq = 0.0;
var min = 3.4028235E38;
var max = 0;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var value = J.modelset.Atom.atomPropertyFloat (null, this.atoms[i], 1112541199);
sum += value;
sumsq += (value * value);
if (value < min) min = value;
if (value > max) max = value;
}
var mean = (sum / n);
var stdev = Math.sqrt ((sumsq - (sum * sum / n)) / n);
var rad = info[1];
var range = info[2];
var scale_min = info[3];
var scale_max = info[4];
var power = info[5];
var transform = Clazz.floatToInt (info[6]);
var data_range = max - min;
var nonlinear = false;
switch (transform) {
case 0:
case 1:
case 2:
case 3:
nonlinear = true;
break;
}
for (var i = bsAtoms.nextSetBit (0), pt = 0; i >= 0; i = bsAtoms.nextSetBit (i + 1), pt++) {
var scale = J.modelset.Atom.atomPropertyFloat (null, this.atoms[i], 1112541199);
switch (transform) {
case 3:
case 7:
default:
break;
case 0:
case 4:
scale = 1 + (scale - mean) / range / stdev;
break;
case 1:
case 5:
scale = (scale - min) / data_range / range;
break;
case 2:
case 6:
scale /= range;
break;
case 8:
if (scale < 0.0) scale = 0.0;
scale = (Math.sqrt (scale / 8.0) / 3.141592653589793);
break;
}
if (scale < 0.0) scale = 0.0;
if (nonlinear) scale = Math.pow (scale, power);
if ((scale < scale_min) && (scale_min >= 0.0)) scale = scale_min;
if ((scale > scale_max) && (scale_max >= 0.0)) scale = scale_max;
data[i] = scale * rad;
}
var rd =  new J.atomdata.RadiusData (data, 0, J.atomdata.RadiusData.EnumType.ABSOLUTE, J.constant.EnumVdw.AUTO);
this.setShapeSizeRD (0, rd, bsAtoms);
}, $fz.isPrivate = true, $fz), "~A,J.util.BS");
Clazz.defineStatics (c$,
"PUTTY_NormalizedNonlinear", 0,
"PUTTY_RelativeNonlinear", 1,
"PUTTY_ScaledNonlinear", 2,
"PUTTY_AbsoluteNonlinear", 3,
"PUTTY_NormalizedLinear", 4,
"PUTTY_RelativeLinear", 5,
"PUTTY_ScaledLinear", 6,
"PUTTY_AbsoluteLinear", 7,
"PUTTY_ImpliedRMS", 8);
});
