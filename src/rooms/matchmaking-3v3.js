// ============================================================================
// SALA HAXBALL COM MATCHMAKING AUTOMÁTICO 3x3
// Sistema completo de matchmaking, balanceamento, votação e ranking
// ============================================================================

const MAPS = {
    X1: `{"name":"Futsal x1 and x2 ; by Bazinga! & GLH from HaxMaps","width":420,"height":200,"spawnDistance":180,"bg":{"type":"hockey","width":368,"height":171,"kickOffRadius":65,"cornerRadius":0},"vertexes":[{"x":-368,"y":171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-368,"y":65,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-368,"y":-65,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-368,"y":-171,"trait":"ballArea","bCoef":1,"cMask":["ball"]},{"x":368,"y":171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":368,"y":65,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":368,"y":-65,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":368,"y":-171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":0,"y":65,"trait":"kickOffBarrier"},{"x":0,"y":-65,"trait":"line"},{"bCoef":1,"trait":"ballArea","x":368,"y":171},{"bCoef":1,"trait":"ballArea","x":368,"y":-171},{"bCoef":0,"trait":"line","x":0,"y":171},{"bCoef":0,"trait":"line","x":0,"y":-171},{"x":0,"y":65,"trait":"kickOffBarrier"},{"x":0,"y":-65,"trait":"kickOffBarrier"},{"x":377,"y":-65,"trait":"line","cMask":["ball"],"bCoef":1},{"x":377,"y":-171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-377,"y":-65,"trait":"line","cMask":["ball"],"bCoef":1},{"x":-377,"y":-171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-377,"y":65,"trait":"line","cMask":["ball"],"bCoef":1},{"x":-377,"y":171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":377,"y":65,"trait":"line","cMask":["ball"],"bCoef":1},{"x":377,"y":171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":0,"y":199,"trait":"kickOffBarrier"},{"x":0,"y":65,"trait":"kickOffBarrier"},{"x":0,"y":-65,"trait":"kickOffBarrier"},{"x":0,"y":-199,"trait":"kickOffBarrier"},{"x":-368.53340356886,"y":-62.053454903872,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-400.05760771891,"y":-62.053454903872,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-400.05760771891,"y":64.043361696331,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":-368.53340356886,"y":64.043361696331,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":368.09926357786,"y":63.94882446641,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":400,"y":64,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":400,"y":-61.927767991658,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":368.9681846993,"y":-62.144998272018,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":-368,"y":-142.37229643041,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":-260.90035258157,"y":-50.168480548544,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-368,"y":-160.81305960678,"bCoef":0.1,"trait":"line","curve":-90},{"x":-358.5379338963,"y":-171,"bCoef":0.1,"trait":"line","curve":-90},{"x":-368,"y":141.33175243687,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":-260.90035258157,"y":49.127936555002,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-368,"y":159.77251561324,"bCoef":0.1,"trait":"line","curve":90},{"x":-358.5379338963,"y":171,"bCoef":0.1,"trait":"line","curve":90},{"x":368,"y":159.77251561324,"bCoef":0.1,"trait":"line","curve":-90},{"x":358.36266315432,"y":171,"bCoef":0.1,"trait":"line","curve":-90},{"x":368,"y":-160.81305960678,"bCoef":0.1,"trait":"line","curve":90},{"x":358.36266315432,"y":-171,"bCoef":0.1,"trait":"line","curve":90},{"x":368,"y":-142.37229643041,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":260.72508183959,"y":-50.168480548544,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":368,"y":141.33175243687,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":260.72508183959,"y":49.127936555002,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":260.72508183959,"y":-50.168480548544,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":260.72508183959,"y":49.127936555002,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-250.86909422732,"y":-1.2295321189394,"bCoef":0.1,"trait":"line","curve":180},{"x":-250.86909422732,"y":0.18898812539692,"bCoef":0.1,"trait":"line","curve":180},{"x":-250.86909422732,"y":-2.6480523632758,"bCoef":0.1,"trait":"line","curve":180},{"x":-250.86909422732,"y":1.6075083697333,"bCoef":0.1,"trait":"line","curve":180},{"x":-250.86909422732,"y":0.89824824756514,"bCoef":0.1,"trait":"line","curve":180},{"x":-250.86909422732,"y":-1.9387922411076,"bCoef":0.1,"trait":"line","curve":180},{"x":-250.86909422732,"y":1.9621384308174,"bCoef":0.1,"trait":"line","curve":180},{"x":-250.86909422732,"y":-3.0026824243599,"bCoef":0.1,"trait":"line","curve":180},{"x":250.69382348534,"y":-1.2295321189394,"bCoef":0.1,"trait":"line","curve":180},{"x":250.69382348534,"y":0.18898812539692,"bCoef":0.1,"trait":"line","curve":180},{"x":250.69382348534,"y":-2.6480523632758,"bCoef":0.1,"trait":"line","curve":180},{"x":250.69382348534,"y":1.6075083697333,"bCoef":0.1,"trait":"line","curve":180},{"x":250.69382348534,"y":0.89824824756514,"bCoef":0.1,"trait":"line","curve":180},{"x":250.69382348534,"y":-1.9387922411076,"bCoef":0.1,"trait":"line","curve":180},{"x":250.69382348534,"y":1.9621384308174,"bCoef":0.1,"trait":"line","curve":180},{"x":250.69382348534,"y":-3.0026824243599,"bCoef":0.1,"trait":"line","curve":180},{"x":-185.66591492467,"y":-1.2295321189394,"bCoef":0.1,"trait":"line","curve":180},{"x":-185.66591492467,"y":0.18898812539692,"bCoef":0.1,"trait":"line","curve":180},{"x":-185.66591492467,"y":-2.6480523632758,"bCoef":0.1,"trait":"line","curve":180},{"x":-185.66591492467,"y":1.6075083697333,"bCoef":0.1,"trait":"line","curve":180},{"x":-185.66591492467,"y":0.89824824756514,"bCoef":0.1,"trait":"line","curve":180},{"x":-185.66591492467,"y":-1.9387922411076,"bCoef":0.1,"trait":"line","curve":180},{"x":-185.66591492467,"y":1.9621384308174,"bCoef":0.1,"trait":"line","curve":180},{"x":-185.66591492467,"y":-3.0026824243599,"bCoef":0.1,"trait":"line","curve":180},{"x":185.49064418269,"y":-1.2295321189394,"bCoef":0.1,"trait":"line","curve":180},{"x":185.49064418269,"y":0.18898812539692,"bCoef":0.1,"trait":"line","curve":180},{"x":185.49064418269,"y":-2.6480523632758,"bCoef":0.1,"trait":"line","curve":180},{"x":185.49064418269,"y":1.6075083697333,"bCoef":0.1,"trait":"line","curve":180},{"x":185.49064418269,"y":0.89824824756514,"bCoef":0.1,"trait":"line","curve":180},{"x":185.49064418269,"y":-1.9387922411076,"bCoef":0.1,"trait":"line","curve":180},{"x":185.49064418269,"y":1.9621384308174,"bCoef":0.1,"trait":"line","curve":180},{"x":185.49064418269,"y":-3.0026824243599,"bCoef":0.1,"trait":"line","curve":180},{"x":-160.58776903904,"y":-159.39453936245,"bCoef":0.1,"trait":"line"},{"x":-160.58776903904,"y":-182.09086327183,"bCoef":0.1,"trait":"line"},{"x":-80.337702205015,"y":-159.39453936245,"bCoef":0.1,"trait":"line"},{"x":-80.337702205015,"y":-182.09086327183,"bCoef":0.1,"trait":"line"},{"x":160.41249829706,"y":-159.39453936245,"bCoef":0.1,"trait":"line"},{"x":160.41249829706,"y":-182.09086327183,"bCoef":0.1,"trait":"line"},{"x":80.162431463036,"y":-159.39453936245,"bCoef":0.1,"trait":"line"},{"x":80.162431463036,"y":-182.09086327183,"bCoef":0.1,"trait":"line"},{"x":-254.88159756902,"y":-171,"bCoef":0.1,"trait":"line"},{"x":-254.88159756902,"y":-182.09086327183,"bCoef":0.1,"trait":"line"},{"x":-371.91294503531,"y":-87.759267023458,"bCoef":0.1,"trait":"line"},{"x":-384.61920561736,"y":-87.759267023458,"bCoef":0.1,"trait":"line"},{"x":371.73767429333,"y":-87.759267023458,"bCoef":0.1,"trait":"line"},{"x":384.44393487538,"y":-87.759267023458,"bCoef":0.1,"trait":"line"},{"x":-371.91294503531,"y":86.718723029916,"bCoef":0.1,"trait":"line"},{"x":-384.61920561736,"y":86.718723029916,"bCoef":0.1,"trait":"line"},{"x":371.73767429333,"y":86.718723029916,"bCoef":0.1,"trait":"line"},{"x":384.44393487538,"y":86.718723029916,"bCoef":0.1,"trait":"line"},{"x":-254.88159756902,"y":171,"bCoef":0.1,"trait":"line"},{"x":-254.88159756902,"y":181.05031927829,"bCoef":0.1,"trait":"line"},{"x":254.70632682704,"y":-171,"bCoef":0.1,"trait":"line"},{"x":254.70632682704,"y":-182.09086327183,"bCoef":0.1,"trait":"line"},{"x":254.70632682704,"y":171,"bCoef":0.1,"trait":"line"},{"x":254.70632682704,"y":181.05031927829,"bCoef":0.1,"trait":"line"},{"x":377,"y":-65,"trait":"line","cMask":["ball"],"bCoef":1},{"x":377,"y":-171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-377,"y":-65,"trait":"line","cMask":["ball"],"bCoef":1},{"x":-377,"y":-171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-377,"y":65,"trait":"line","cMask":["ball"],"bCoef":1},{"x":-377,"y":171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":377,"y":65,"trait":"line","cMask":["ball"],"bCoef":1},{"x":377,"y":171,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":371,"y":-65,"trait":"ballArea","cMask":["ball"],"bCoef":0},{"x":371,"y":-171,"trait":"ballArea","cMask":["ball"],"bCoef":0},{"x":371,"y":65,"trait":"ballArea","cMask":["ball"],"bCoef":0},{"x":371,"y":171,"trait":"ballArea","cMask":["ball"],"bCoef":0},{"x":-371,"y":65,"trait":"ballArea","cMask":["ball"],"bCoef":0},{"x":-371,"y":171,"trait":"ballArea","cMask":["ball"],"bCoef":0},{"x":-371,"y":-65,"trait":"ballArea","cMask":["ball"],"bCoef":0},{"x":-371,"y":-171,"trait":"ballArea","cMask":["ball"],"bCoef":0}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":4,"v1":5,"trait":"ballArea"},{"v0":6,"v1":7,"trait":"ballArea"},{"v0":8,"v1":9,"trait":"kickOffBarrier","curve":180,"cGroup":["blueKO"]},{"v0":8,"v1":9,"trait":"kickOffBarrier","curve":-180,"cGroup":["redKO"]},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":1,"v1":0,"cMask":["ball"],"x":-368},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":5,"v1":4,"cMask":["ball"],"x":368},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":2,"v1":3,"cMask":["ball"],"x":-368},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":6,"v1":7,"cMask":["ball"],"x":368},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":0,"v1":10,"y":171},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":3,"v1":11,"y":-171},{"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":12,"v1":13},{"curve":-180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":9,"v1":8},{"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":15,"v1":14},{"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":2,"v1":1},{"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":6,"v1":5},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":16,"v1":17,"cMask":["ball"],"x":330},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":18,"v1":19,"cMask":["ball"],"x":-330},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":20,"v1":21,"cMask":["ball"],"x":-330},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":22,"v1":23,"cMask":["ball"],"x":330},{"v0":24,"v1":25,"trait":"kickOffBarrier"},{"v0":26,"v1":27,"trait":"kickOffBarrier"},{"v0":28,"v1":29,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,-80],"y":-80},{"v0":29,"v1":30,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":-590},{"v0":30,"v1":31,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,80],"y":80},{"v0":32,"v1":33,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,-80],"y":-80},{"v0":33,"v1":34,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":-590},{"v0":34,"v1":35,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,80],"y":80},{"v0":36,"v1":37,"curve":94.0263701017,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":39,"v1":38,"curve":86.632306418889,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":40,"v1":41,"curve":-94.026370101699,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":37,"v1":41,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":43,"v1":42,"curve":-86.632306418888,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":45,"v1":44,"curve":86.632306418884,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":47,"v1":46,"curve":-86.632306418899,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":48,"v1":49,"curve":-94.026370101699,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":50,"v1":51,"curve":94.026370101699,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":52,"v1":53,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":390},{"v0":55,"v1":54,"curve":-180.00692920292,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":54,"v1":55,"curve":-180.00218240614,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":57,"v1":56,"curve":-179.64823645332,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":56,"v1":57,"curve":-180.35758668147,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":59,"v1":58,"curve":-180.02357323962,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":58,"v1":59,"curve":-180.00924102399,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":61,"v1":60,"curve":-180.06885755885,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":60,"v1":61,"curve":-180.02948353257,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":63,"v1":62,"curve":-179.99869069543,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":62,"v1":63,"curve":-179.99939258776,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":65,"v1":64,"curve":-180.08826047163,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":64,"v1":65,"curve":-179.91186753664,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":67,"v1":66,"curve":-179.99528711105,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":66,"v1":67,"curve":-179.99743836358,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":69,"v1":68,"curve":-179.98626041101,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":68,"v1":69,"curve":-179.99175181595,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":71,"v1":70,"curve":-180.04715562398,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":70,"v1":71,"curve":-179.95294709391,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":73,"v1":72,"curve":-179.95715750564,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":72,"v1":73,"curve":-179.89943871875,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":75,"v1":74,"curve":-179.94773754738,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":74,"v1":75,"curve":-179.98221351296,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":77,"v1":76,"curve":-180.4151727218,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":76,"v1":77,"curve":-179.58764458796,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":79,"v1":78,"curve":-180.00086646359,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":78,"v1":79,"curve":-180.01965986376,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":81,"v1":80,"curve":-180.03532601389,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":80,"v1":81,"curve":-179.99380079,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":83,"v1":82,"curve":-180.0044468452,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":82,"v1":83,"curve":-180.01386779847,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":85,"v1":84,"curve":-180.05158287563,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":84,"v1":85,"curve":-180.01212223878,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":86,"v1":87,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240},{"v0":88,"v1":89,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-120},{"v0":90,"v1":91,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":240},{"v0":92,"v1":93,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":120},{"v0":94,"v1":95,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":96,"v1":97,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":98,"v1":99,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":100,"v1":101,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":102,"v1":103,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":104,"v1":105,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":106,"v1":107,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":108,"v1":109,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":110,"v1":111,"cMask":["ball"],"x":330},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":112,"v1":113,"cMask":["ball"],"x":-330},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":114,"v1":115,"cMask":["ball"],"x":-330},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":116,"v1":117,"cMask":["ball"],"x":330},{"vis":false,"color":"FFFFFF","bCoef":0,"trait":"ballArea","v0":118,"v1":119,"cMask":["ball"],"x":371},{"vis":false,"color":"FFFFFF","bCoef":0,"trait":"ballArea","v0":120,"v1":121,"cMask":["ball"],"x":371},{"vis":false,"color":"FFFFFF","bCoef":0,"trait":"ballArea","v0":122,"v1":123,"cMask":["ball"],"x":-371},{"vis":false,"color":"FFFFFF","bCoef":0,"trait":"ballArea","v0":124,"v1":125,"cMask":["ball"],"x":-371}],"goals":[{"p0":[-374.25,-62.053454903872],"p1":[-374.25,64.043361696331],"team":"red"},{"p0":[374.25,62],"p1":[374.25,-62],"team":"blue"}],"discs":[{"radius":3.9405255187564,"pos":[-368.53340356886,64.043361696331],"color":"6666CC","trait":"goalPost","y":80},{"radius":3.9405255187564,"pos":[-368.53340356886,-62.053454903872],"color":"6666CC","trait":"goalPost","y":-80,"x":-560},{"radius":3.9405255187564,"pos":[368.9681846993,-62.144998272018],"color":"6666CC","trait":"goalPost","y":80},{"radius":3.9405255187564,"pos":[368.09926357786,63.94882446641],"color":"6666CC","trait":"goalPost","y":-80,"x":-560},{"radius":3,"invMass":0,"pos":[-368,-171],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[-368,171],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[368,171],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[368,-171],"color":"FFCC00","bCoef":0.1,"trait":"line"}],"planes":[{"normal":[0,1],"dist":-171,"trait":"ballArea"},{"normal":[0,-1],"dist":-171,"trait":"ballArea"},{"normal":[0,1],"dist":-200,"bCoef":0.2,"cMask":["all"]},{"normal":[0,-1],"dist":-200,"bCoef":0.2,"cMask":["all"]},{"normal":[1,0],"dist":-420,"bCoef":0.2,"cMask":["all"]},{"normal":[-1,0],"dist":-420,"bCoef":0.2,"cMask":["all"]}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":1},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["all"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"line":{"vis":true,"bCoef":0,"cMask":[""]},"arco":{"radius":2,"cMask":["n/d"],"color":"cccccc"}},"playerPhysics":{"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":5,"bCoef":0},"ballPhysics":{"radius":6.25,"color":"FFCC00","bCoef":0.4,"invMass":1.5,"damping":0.99}}`,
    X3: `{"name":"Futsal x3  by Bazinga from HaxMaps","width":620,"height":270,"spawnDistance":350,"bg":{"type":"hockey","width":550,"height":240,"kickOffRadius":80,"cornerRadius":0},"vertexes":[{"x":550,"y":240,"trait":"ballArea"},{"x":550,"y":-240,"trait":"ballArea"},{"x":0,"y":270,"trait":"kickOffBarrier"},{"x":0,"y":80,"bCoef":0.15,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-80,"bCoef":0.15,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-270,"trait":"kickOffBarrier"},{"x":-550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":-550,"y":80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":-80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,-80]},{"x":-550,"y":-240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","pos":[700,80]},{"x":550,"y":240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":550,"y":-80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[700,-80]},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":-550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":0,"y":-240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":-557.5,"y":80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[-700,80]},{"x":-557.5,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":-557.5,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":-557.5,"y":-80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[-700,-80]},{"x":557.5,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":557.5,"y":-80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[700,-80]},{"x":557.5,"y":80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[700,80]},{"x":557.5,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":0,"y":-80,"bCoef":0.1,"trait":"line"},{"x":0,"y":80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":80,"bCoef":0.1,"trait":"line"},{"x":550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":550,"y":80,"bCoef":0.1,"trait":"line"},{"x":-240,"y":256,"bCoef":0.1,"trait":"line"},{"x":-120,"y":256,"bCoef":0.1,"trait":"line"},{"x":-240,"y":-256,"bCoef":0.1,"trait":"line"},{"x":-120,"y":-224,"bCoef":0.1,"trait":"line"},{"x":-120,"y":-256,"bCoef":0.1,"trait":"line"},{"x":240,"y":256,"bCoef":0.1,"trait":"line"},{"x":120,"y":224,"bCoef":0.1,"trait":"line"},{"x":120,"y":256,"bCoef":0.1,"trait":"line"},{"x":240,"y":-224,"bCoef":0.1,"trait":"line"},{"x":240,"y":-256,"bCoef":0.1,"trait":"line"},{"x":120,"y":-224,"bCoef":0.1,"trait":"line"},{"x":120,"y":-256,"bCoef":0.1,"trait":"line"},{"x":-381,"y":240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":256,"bCoef":0.1,"trait":"line"},{"x":-550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":-390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":226,"bCoef":0.1,"trait":"line","curve":-90},{"x":-536,"y":240,"bCoef":0.1,"trait":"line","curve":-90},{"x":-550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":-390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":-226,"bCoef":0.1,"trait":"line","curve":90},{"x":-536,"y":-240,"bCoef":0.1,"trait":"line","curve":90},{"x":-556,"y":123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":123,"bCoef":0.1,"trait":"line"},{"x":556,"y":123,"bCoef":0.1,"trait":"line"},{"x":575,"y":123,"bCoef":0.1,"trait":"line"},{"x":-556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":381,"y":240,"bCoef":0.1,"trait":"line"},{"x":381,"y":256,"bCoef":0.1,"trait":"line"},{"x":381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":550,"y":-226,"bCoef":0.1,"trait":"line","curve":-90},{"x":536,"y":-240,"bCoef":0.1,"trait":"line","curve":-90},{"x":550,"y":226,"bCoef":0.1,"trait":"line","curve":90},{"x":536,"y":240,"bCoef":0.1,"trait":"line","curve":90},{"x":550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180}],"segments":[{"v0":6,"v1":7,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,-80],"y":-80},{"v0":7,"v1":8,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":-590},{"v0":8,"v1":9,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,80],"y":80},{"v0":10,"v1":11,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,-80],"y":-80},{"v0":11,"v1":12,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":590},{"v0":12,"v1":13,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,80],"y":80},{"v0":2,"v1":3,"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.15,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":-180,"vis":true,"color":"F8F8F8","bCoef":0.15,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":4,"v1":5,"trait":"kickOffBarrier"},{"v0":14,"v1":15,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":16,"v1":17,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":18,"v1":19,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":240},{"v0":20,"v1":21,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":22,"v1":23,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":24,"v1":25,"vis":true,"color":"F8F8F8","bCoef":0,"cMask":["ball"],"trait":"ballArea","x":550,"y":-240},{"v0":26,"v1":27,"curve":0,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":-240},{"v0":28,"v1":29,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":30,"v1":31,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":38,"v1":39,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":40,"v1":41,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":42,"v1":43,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":44,"v1":45,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":46,"v1":47,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":0},{"v0":48,"v1":49,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-550},{"v0":50,"v1":51,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":550},{"v0":64,"v1":65,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":66,"v1":67,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":69,"v1":68,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":70,"v1":71,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":67,"v1":71,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":73,"v1":72,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":74,"v1":75,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":76,"v1":77,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":78,"v1":79,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":80,"v1":81,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":82,"v1":83,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":84,"v1":85,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":86,"v1":87,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":89,"v1":88,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":91,"v1":90,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":92,"v1":93,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":94,"v1":95,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":96,"v1":97,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":390},{"v0":99,"v1":98,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":98,"v1":99,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":101,"v1":100,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":100,"v1":101,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":103,"v1":102,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":102,"v1":103,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":105,"v1":104,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":104,"v1":105,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":107,"v1":106,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":106,"v1":107,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":109,"v1":108,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":108,"v1":109,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":111,"v1":110,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":110,"v1":111,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":113,"v1":112,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":112,"v1":113,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":115,"v1":114,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":114,"v1":115,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":117,"v1":116,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":116,"v1":117,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":119,"v1":118,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":118,"v1":119,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":121,"v1":120,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":120,"v1":121,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":123,"v1":122,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":122,"v1":123,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":125,"v1":124,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":124,"v1":125,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":127,"v1":126,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":126,"v1":127,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":129,"v1":128,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":128,"v1":129,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5}],"goals":[{"p0":[-557.5,-80],"p1":[-557.5,80],"team":"red"},{"p0":[557.5,80],"p1":[557.5,-80],"team":"blue"}],"discs":[{"radius":5,"pos":[-550,80],"color":"FF6666","trait":"goalPost","y":80},{"radius":5,"pos":[-550,-80],"color":"FF6666","trait":"goalPost","y":-80,"x":-560},{"radius":5,"pos":[550,80],"color":"6666FF","trait":"goalPost","y":80},{"radius":5,"pos":[550,-80],"color":"6666FF","trait":"goalPost","y":-80},{"radius":3,"invMass":0,"pos":[-550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[-550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"}],"planes":[{"normal":[0,1],"dist":-240,"bCoef":1,"trait":"ballArea","vis":false,"curve":0},{"normal":[0,-1],"dist":-240,"bCoef":1,"trait":"ballArea"},{"normal":[0,1],"dist":-270,"bCoef":0.1},{"normal":[0,-1],"dist":-270,"bCoef":0.1},{"normal":[1,0],"dist":-620,"bCoef":0.1},{"normal":[-1,0],"dist":-620,"bCoef":0.1},{"normal":[1,0],"dist":-620,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0},{"normal":[-1,0],"dist":-620,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"line":{"vis":true,"bCoef":0.1,"cMask":[""]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":5},"ballPhysics":{"radius":6.25,"bCoef":0.4,"invMass":1.5,"damping":0.99,"color":"FFCC00"}}`
}

// Configuração da sala
const roomConfig = {
    roomName: "𝗖𝗔𝗦𝗔 𝗗𝗢 𝗖𝗛𝗔𝗣𝗘𝗨 | X3 FUTSAL",
    maxPlayers: 18,  // 6 jogadores + 12 espectadores
    public: true,
    noPlayer: true,  // DEVE SER TRUE para criar o bot admin automaticamente
    token: "thr1.AAAAAGk63dZC_XRdDXG_EQ.771e-5ZPX8U" // Obtenha em: https://www.haxball.com/headlesstoken
};

const room = HBInit(roomConfig);

// ============================================================================
// CONSTANTES
// ============================================================================

const TEAMS = {
    SPEC: 0,
    RED: 1,
    BLUE: 2
};

const COLORS = {
    SUCCESS: 0x00FF00,
    ERROR: 0xFF0000,
    WARNING: 0xFFFF00,
    INFO: 0x00FFFF,
    WHITE: 0xFFFFFF,
    RED: 0xFF0000,
    BLUE: 0x0000FF
};

const CONFIG = {
    PLAYERS_PER_TEAM: 3,
    MIN_PLAYERS_TO_START: 2,  // Mínimo 2 jogadores (1 por time)
    WAIT_TIMEOUT: 10000,      // 10 segundos em ms
    VOTE_TIMEOUT: 10000,      // 10 segundos de votação
    GOALS_TO_WIN: 3,
    TIME_LIMIT: 5,            // minutos
    STADIUM: "Classic"
};

// ============================================================================
// MENSAGENS DO BOT
// ============================================================================

const MESSAGES = {
    // Boas-vindas e sistema
    WELCOME: {
        SEPARATOR: "━━━━━━━━━━━━━━━━━━━━━━━━━━",
        GREETING: (name) => `👋 Bem-vindo, ${name}!`,
        SYSTEM_INFO: "⚽ Sistema de Matchmaking 3x3 Automático",
        HELP_HINT: "Digite !help para ver os comandos"
    },
    
    // Matchmaking e treino
    MATCHMAKING: {
        SOLO_TRAINING_START: "🏃 Modo treino solo ativado! Você pode treinar enquanto espera outros jogadores.",
        TRAINING_STARTED: "🎮 Jogo de treino iniciado! Quando outro jogador entrar, iniciaremos uma partida oficial.",
        TRAINING_LIMIT: "⏱️ Modo treino: máximo 1 gol ou 10 minutos",
        TRAINING_FINISHED: "🏃 Sessão de treino finalizada!",
        TRAINING_TO_MATCH: "🔄 Novo jogador entrou! Finalizando treino solo para iniciar partida oficial...",
        WAITING_PLAYERS: (min) => `⏳ Aguardando mais jogadores... (mínimo ${min})`,
        SORTING_TEAMS: "🎲 Sorteando times (priorizando quem esperou mais)...",
        GAME_STARTED: "🎮 JOGO INICIADO! Boa sorte!",
        NEW_MATCHMAKING: "🔄 Iniciando novo matchmaking...",
        WAIT_10_SECONDS: "⏳ Aguardando 10 segundos para iniciar próxima partida...",
        ONE_PLAYER_TRAINING: "🏃 1 jogador na sala! Iniciando modo treino solo...",
        MULTIPLE_PLAYERS: (count) => `🎮 ${count} jogadores na sala! Iniciando matchmaking...`,
        WAITING_START: "⏳ Aguardando jogadores para iniciar..."
    },
    
    // Times
    TEAMS: {
        RED_TEAM: "🔴 TIME VERMELHO:",
        BLUE_TEAM: "🔵 TIME AZUL:",
        RED_WINS: "🔴 TIME VERMELHO",
        BLUE_WINS: "🔵 TIME AZUL",
        PLAYER_ITEM: (name) => `  • ${name}`
    },
    
    // Balanceamento
    BALANCE: {
        TEAM_EMPTY: "❌ Um time ficou sem jogadores! Finalizando partida...",
        UNBALANCED: "⚠️ Times desbalanceados! Pausando jogo...",
        ADDING_PLAYERS: (amount) => `➕ Adicionando ${amount} jogador(es) ao time...`,
        BALANCED: "✅ Times balanceados! Despausando...",
        WAITING_PLAYERS: (amount) => `⏳ Aguardando ${amount} jogador(es) entrar na sala... (10 segundos)`,
        ADDING_NEW_PLAYERS: "➕ Adicionando novos jogadores ao jogo (priorizando quem esperou mais)!",
        TOO_MANY_PLAYERS: "⚠️ Time tem jogadores demais! Movendo extras para espectadores...",
        MOVED_TO_SPEC_FULL: "Você foi movido para espectadores pois o time estava cheio",
        TEAM_FULL: (max) => `❌ Time já está cheio! Máximo ${max} jogadores por time.`,
        INSUFFICIENT_PLAYERS: (min) => `❌ Jogadores insuficientes para começar! (mínimo ${min} jogadores reais)`
    },
    
    // Votação
    VOTE: {
        SEPARATOR: "━━━━━━━━━━━━━━━━━━━━━━━━━━",
        STARTED: "🗳️ VOTAÇÃO INICIADA!",
        QUESTION: "Continuar com times desbalanceados?",
        YES_OPTION: "Digite !sim para CONTINUAR",
        NO_OPTION: "Digite !nao para FINALIZAR",
        TIMEOUT: "Tempo: 10 segundos",
        NO_VOTE_CONTINUES: "Não votar = CONTINUAR",
        RESULT_TITLE: "📊 Resultado da votação:",
        CONTINUE_VOTES: (count) => `✅ Continuar: ${count}`,
        END_VOTES: (count) => `❌ Finalizar: ${count}`,
        MATCH_ENDED: "🛑 Partida será finalizada!",
        MATCH_CONTINUES: "▶️ Partida continuará!",
        NO_ACTIVE_VOTE: "❌ Não há votação ativa!",
        ONLY_PLAYERS: "❌ Apenas jogadores em campo podem votar!",
        ALREADY_VOTED: "❌ Você já votou!",
        PLAYER_VOTED: (name, vote) => `✅ ${name} votou: ${vote}`
    },
    
    // Gols e placar
    GOAL: {
        TRAINING: "⚽ Gol de treino!",
        GENERIC: (team) => `⚽ GOOOOL! ${team}!`,
        SCORE: (red, blue) => `📊 Placar: 🔴 ${red} x ${blue} 🔵`
    },
    
    // Vitória
    VICTORY: {
        SEPARATOR: "━━━━━━━━━━━━━━━━━━━━━━━━━━",
        WINNER: (team) => `🏆 ${team} VENCEU!`,
        FINAL_SCORE: (red, blue) => `📊 Placar final: ${red} x ${blue}`
    },
    
    // Comandos
    COMMANDS: {
        SEPARATOR: "━━━━━━━━━━━━━━━━━━━━━━━━━━",
        TITLE: "📋 COMANDOS DISPONÍVEIS",
        HELP: "!help - Mostra este menu",
        TOP: "!top - Top 10 artilheiros",
        STATS: "!stats - Suas estatísticas",
        RANK: "!rank [nome] - Stats de um jogador",
        YES: "!sim - Vota para continuar (durante votação)",
        NO: "!nao - Vota para finalizar (durante votação)"
    },
    
    // Ranking
    RANKING: {
        SEPARATOR: "━━━━━━━━━━━━━━━━━━━━━━━━━━",
        TOP_TITLE: "🏆 TOP 10 ARTILHEIROS",
        NO_STATS: "📊 Ainda não há estatísticas!",
        PLAYER_STATS_TITLE: (name) => `📊 Estatísticas de ${name}`,
        NO_GAMES: "📊 Este jogador ainda não jogou nenhuma partida!",
        PLAYER_NOT_FOUND: "❌ Jogador não encontrado!",
        GOALS: (count) => `⚽ Gols: ${count}`,
        MATCHES: (count) => `🎮 Partidas: ${count}`,
        WINS: (count) => `🏆 Vitórias: ${count}`,
        LOSSES: (count) => `💔 Derrotas: ${count}`,
        WIN_RATE: (rate) => `📈 Taxa de vitória: ${rate}%`,
        GOALS_PER_MATCH: (avg) => `⚡ Gols/partida: ${avg}`,
        TOP_PLAYER: (medal, name, goals, games, winRate) => 
            `${medal} ${name} - ${goals} gols (${games} jogos, ${winRate}% vitórias)`
    }
};

// ============================================================================
// ESTADO DA SALA
// ============================================================================

const state = {
    gameRunning: false,
    waitingForPlayers: false,
    waitTimer: null,
    voteTimer: null,
    voting: false,
    votes: new Map(),  // playerId -> boolean (true = finalizar, false = continuar)
    matchmaking: false,
    
    // Ranking
    playerStats: new Map(),  // playerId -> { name, goals, assists, ownGoals, wins, losses, gamesPlayed }
    lastGoalKicker: null,
    lastTouches: {
        player1: null,  // último jogador que tocou (gol)
        player2: null   // penúltimo jogador (assistência potencial)
    },
    
    // Bot admin
    botId: null,
    
    // Loop de validação
    validationInterval: null,
    
    // Sistema FIFO para espectadores
    spectatorQueue: new Map(),  // playerId -> timestamp de quando entrou nos specs
    
    // Modo solo de treino
    soloTrainingMode: false,
    
    // Flag para prevenir múltiplas transições simultâneas
    isTransitioning: false,
    
    // Contador de gols por jogador na partida atual
    matchGoals: new Map()  // playerId -> quantidade de gols na partida atual
};

// ============================================================================
// FUNÇÕES DE RANKING
// ============================================================================

function initPlayerStats(playerId, playerName) {
    if (!state.playerStats.has(playerId)) {
        state.playerStats.set(playerId, {
            name: playerName,
            goals: 0,
            assists: 0,
            ownGoals: 0,
            wins: 0,
            losses: 0,
            gamesPlayed: 0
        });
    }
}

function addGoal(playerId) {
    const stats = state.playerStats.get(playerId);
    if (stats) {
        stats.goals++;
    }
    
    // Atualiza contador de gols na partida atual
    const matchGoals = state.matchGoals.get(playerId) || 0;
    state.matchGoals.set(playerId, matchGoals + 1);
}

function addAssist(playerId) {
    const stats = state.playerStats.get(playerId);
    if (stats) {
        stats.assists++;
    }
}

function addOwnGoal(playerId) {
    const stats = state.playerStats.get(playerId);
    if (stats) {
        stats.ownGoals++;
    }
}

// ============================================================================
// MENSAGENS PERSONALIZADAS DE GOL
// ============================================================================

const GOL_MESSAGES = {
    // Mensagens para primeiro gol do jogador na partida
    PRIMEIRO_GOL: [
        "🎯 {player} abre o placar!",
        "⚽ Primeiro de {player}!",
        "🔥 {player} começou bem!",
        "💫 {player} marca o primeiro!",
        "🎪 {player} inaugura o marcador!"
    ],
    
    // Mensagens para segundo gol (brace)
    BRACE: [
        "⚡ BRACE! {player} já tem 2 gols!",
        "🔥🔥 {player} está pegando fogo! 2 gols!",
        "💪 {player} não para! Segundo gol dele!",
        "🎯 {player} com a DOBRADINHA!",
        "⚽⚽ {player} marcou mais um! Vai pro hat-trick?",
        "🌟 {player} está inspirado! 2 gols já!"
    ],
    
    // Mensagens para hat-trick (3 gols)
    HAT_TRICK: [
        "🎩✨ HAT-TRICK DE {player}!!!",
        "👑 HAT-TRICK LENDÁRIO DE {player}!!!",
        "🔥🔥🔥 {player} FEZ HAT-TRICK!!!",
        "⚽⚽⚽ TRIPLETE DE {player}! QUE CRAQUE!",
        "🎪🎩 HAT-TRICK! {player} É O SHOW!!!",
        "💫💫💫 3 GOLS DE {player}! IMPARÁVEL!"
    ],
    
    // Mensagens para 4+ gols (poker e além)
    POKER: [
        "🃏 POKER DE {player}!!! {goals} GOLS!!!",
        "👽 {player} NÃO É HUMANO! {goals} GOLS!!!",
        "🚀 {player} ESTÁ EM OUTRA DIMENSÃO! {goals} GOLS!",
        "⚽💥 {goals} GOLS DE {player}! ABSURDO!!!",
        "🌟🌟🌟 {player} COM {goals} GOLS! LENDA!"
    ],
    
    // Mensagens para líder do ranking (top 1)
    LIDER: [
        "👑 GOL DO LÍDER {player}!",
        "🥇 {player} mostra porque é o líder!",
        "⭐ O TOPO DO RANKING MARCOU! {player}!",
        "👑 {player} continua dominando!",
        "🏆 GOL DO CAMPEÃO {player}!"
    ],
    
    // Mensagens para top 3 do ranking
    TOP3: [
        "🥈 {player} do TOP 3 marcou!",
        "🥉 Um dos melhores marcou! {player}!",
        "⭐ {player} (TOP 3) balançou as redes!",
        "🌟 {player} honrando o TOP 3!",
        "💎 Gol de craque! {player}!"
    ],
    
    // Mensagens para top 10 do ranking
    TOP10: [
        "⭐ {player} do TOP 10 marcou!",
        "🔝 {player} está no ranking por isso!",
        "💫 {player} justificando sua posição!",
        "🎯 Gol merecido de {player}!",
        "✨ {player} mantém o nível!"
    ],
    
    // Mensagens para gol com assistência
    WITH_ASSIST: [
        "⚽ GOL de {scorer}! Assistência de {assister}! 🎯",
        "🔥 {scorer} marca! Passe de {assister}! 👏",
        "⚡ {scorer} finaliza! Grande passe de {assister}!",
        "💫 {scorer} balança as redes! Assistência: {assister}!",
        "🎯 GOL! {scorer} + {assister} = GOLAÇO!",
        "🌟 {scorer} completa, {assister} cria!",
        "⚽ {scorer} faz o gol! {assister} deu a assistência!"
    ],
    
    // Mensagens para gol contra
    OWN_GOAL: [
        "😱 GOL CONTRA de {player}!",
        "🙈 {player} marcou contra...",
        "💀 Que azar! Gol contra de {player}!",
        "😬 {player} fez gol contra! Acontece...",
        "🤦 Gol contra de {player}!",
        "😵 {player} na própria baliza...",
        "🙊 Ops! {player} marcou no gol errado!"
    ]
};

function getRandomMessage(messageArray) {
    return messageArray[Math.floor(Math.random() * messageArray.length)];
}

function getGoalMessage(player, playerStats, matchGoalsCount, assisterName = null) {
    const playerName = player.name;
    const topScorers = getTopScorers(10);
    const playerRanking = topScorers.findIndex(s => s.name === playerName) + 1;
    
    let message = "";
    
    // Prioridade 1: Hat-trick ou mais (3+ gols na partida)
    if (matchGoalsCount >= 4) {
        message = getRandomMessage(GOL_MESSAGES.POKER)
            .replace("{player}", playerName)
            .replace("{goals}", matchGoalsCount);
    } else if (matchGoalsCount === 3) {
        message = getRandomMessage(GOL_MESSAGES.HAT_TRICK)
            .replace("{player}", playerName);
    } else if (matchGoalsCount === 2) {
        // Prioridade 2: Brace (2 gols)
        message = getRandomMessage(GOL_MESSAGES.BRACE)
            .replace("{player}", playerName);
    } else if (assisterName) {
        // Prioridade 3: Gol com assistência
        message = getRandomMessage(GOL_MESSAGES.WITH_ASSIST)
            .replace("{scorer}", playerName)
            .replace("{assister}", assisterName);
    } else {
        // Prioridade 4: Mensagens baseadas no ranking (para primeiro gol)
        if (playerStats && playerStats.goals >= 1) {
            if (playerRanking === 1) {
                message = getRandomMessage(GOL_MESSAGES.LIDER)
                    .replace("{player}", playerName);
            } else if (playerRanking >= 2 && playerRanking <= 3) {
                message = getRandomMessage(GOL_MESSAGES.TOP3)
                    .replace("{player}", playerName);
            } else if (playerRanking >= 4 && playerRanking <= 10) {
                message = getRandomMessage(GOL_MESSAGES.TOP10)
                    .replace("{player}", playerName);
            } else {
                message = getRandomMessage(GOL_MESSAGES.PRIMEIRO_GOL)
                    .replace("{player}", playerName);
            }
        } else {
            // Novo jogador ou sem estatísticas
            message = getRandomMessage(GOL_MESSAGES.PRIMEIRO_GOL)
                .replace("{player}", playerName);
        }
    }
    
    return message;
}

function updateGameStats(winningTeam) {
    const players = room.getPlayerList();
    
    players.forEach(player => {
        if (player.team === TEAMS.RED || player.team === TEAMS.BLUE) {
            const stats = state.playerStats.get(player.id);
            if (stats) {
                stats.gamesPlayed++;
                if (player.team === winningTeam) {
                    stats.wins++;
                } else {
                    stats.losses++;
                }
            }
        }
    });
}

function getTopScorers(limit = 10) {
    return Array.from(state.playerStats.values())
        .sort((a, b) => {
            // Ordena por gols primeiro
            if (b.goals !== a.goals) return b.goals - a.goals;
            // Desempate por assistências
            if (b.assists !== a.assists) return b.assists - a.assists;
            // Desempate final por % vitórias
            const winRateA = a.gamesPlayed > 0 ? a.wins / a.gamesPlayed : 0;
            const winRateB = b.gamesPlayed > 0 ? b.wins / b.gamesPlayed : 0;
            return winRateB - winRateA;
        })
        .slice(0, limit);
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function announce(msg, targetId = null, color = COLORS.WHITE, style = "normal", sound = 0) {
    room.sendAnnouncement(msg, targetId, color, style, sound);
}

function getPlayersByTeam(teamId) {
    return room.getPlayerList().filter(p => p.team === teamId && p.id !== state.botId);
}

function getTeamSize(teamId) {
    return getPlayersByTeam(teamId).length;
}

function getSpectators() {
    return room.getPlayerList().filter(p => p.team === TEAMS.SPEC && p.id !== state.botId);
}

function clearTimers() {
    if (state.waitTimer) {
        clearTimeout(state.waitTimer);
        state.waitTimer = null;
    }
    if (state.voteTimer) {
        clearTimeout(state.voteTimer);
        state.voteTimer = null;
    }
}

// ============================================================================
// SISTEMA DE MATCHMAKING
// ============================================================================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getSpectatorsByQueue() {
    // Retorna espectadores ordenados por tempo de espera (FIFO)
    const specs = getSpectators().filter(p => p.id !== state.botId);
    
    return specs.sort((a, b) => {
        const timeA = state.spectatorQueue.get(a.id) || Date.now();
        const timeB = state.spectatorQueue.get(b.id) || Date.now();
        return timeA - timeB; // Mais antigo primeiro
    });
}

function setMapByPlayerCount(playersPerTeam) {
    // X1 ou X2 usa mapa X1, X3 usa mapa X3
    if (playersPerTeam <= 2) {
        room.setCustomStadium(MAPS.X1);
        console.log(`🗺️ Mapa X1 carregado (${playersPerTeam}x${playersPerTeam})`);
    } else {
        room.setCustomStadium(MAPS.X3);
        console.log(`🗺️ Mapa X3 carregado (${playersPerTeam}x${playersPerTeam})`);
    }
}

function startMatchmaking() {
    if (state.matchmaking || state.isTransitioning) return;
    
    state.matchmaking = true;
    state.isTransitioning = true;
    clearTimers();
    
    const allPlayers = room.getPlayerList().filter(p => p.id !== state.botId);
    
    // Permite treino solo com 1 jogador
    if (allPlayers.length === 1) {
        announce(MESSAGES.MATCHMAKING.SOLO_TRAINING_START, null, COLORS.INFO, "bold", 1);
        
        const player = allPlayers[0];
        room.setPlayerTeam(player.id, TEAMS.RED);
        state.spectatorQueue.delete(player.id);
        state.soloTrainingMode = true;
        
        setTimeout(() => {
            setMapByPlayerCount(1);
            // Configura limites especiais para modo treino
            room.setScoreLimit(1);  // Máximo 1 gol
            room.setTimeLimit(10);  // 10 minutos
            room.startGame();
            state.gameRunning = true;
            state.matchmaking = false;
            state.isTransitioning = false;
            announce(MESSAGES.MATCHMAKING.TRAINING_STARTED, null, COLORS.SUCCESS, "bold", 2);
            announce(MESSAGES.MATCHMAKING.TRAINING_LIMIT, null, COLORS.INFO, "normal", 0);
        }, 1500);
        return;
    }
    
    if (allPlayers.length < CONFIG.MIN_PLAYERS_TO_START) {
        announce(MESSAGES.MATCHMAKING.WAITING_PLAYERS(CONFIG.MIN_PLAYERS_TO_START), null, COLORS.WARNING, "bold", 1);
        state.matchmaking = false;
        return;
    }
    
    state.soloTrainingMode = false;
    
    // Restaura limites normais de jogo
    room.setScoreLimit(CONFIG.GOALS_TO_WIN);
    room.setTimeLimit(CONFIG.TIME_LIMIT);
    
    // Move todos para spec primeiro
    allPlayers.forEach(p => {
        if (p.team !== TEAMS.SPEC) {
            room.setPlayerTeam(p.id, TEAMS.SPEC);
        }
    });
    
    // Aguarda um pouco para processar as mudanças
    setTimeout(() => {
        distributeTeams();
    }, 500);
}

function distributeTeams() {
    // Obtém espectadores ordenados por FIFO (mais antigos primeiro)
    const realPlayers = getSpectatorsByQueue();
    
    if (realPlayers.length < CONFIG.MIN_PLAYERS_TO_START) {
        announce(MESSAGES.BALANCE.INSUFFICIENT_PLAYERS(CONFIG.MIN_PLAYERS_TO_START), null, COLORS.ERROR, "bold", 2);
        state.matchmaking = false;
        return;
    }
    
    // GARANTIA: Nunca distribui mais que o máximo permitido por time
    const maxPerTeam = Math.min(CONFIG.PLAYERS_PER_TEAM, Math.floor(realPlayers.length / 2));
    
    console.log(`🎲 Distribuindo ${realPlayers.length} jogadores (FIFO): máx ${maxPerTeam} por time`);
    
    announce(MESSAGES.MATCHMAKING.SORTING_TEAMS, null, COLORS.INFO, "bold", 1);
    
    // Embaralha apenas os jogadores selecionados para garantir times aleatórios
    // mas mantendo a prioridade FIFO de quem joga
    const selectedPlayers = realPlayers.slice(0, maxPerTeam * 2);
    const shuffled = shuffleArray(selectedPlayers);
    
    // Distribui jogadores REAIS alternando entre RED e BLUE
    let redCount = 0;
    let blueCount = 0;
    
    for (let i = 0; i < shuffled.length && (redCount < maxPerTeam || blueCount < maxPerTeam); i++) {
        const player = shuffled[i];
        
        // Alterna entre times, mas respeita o limite
        if (redCount < maxPerTeam && (blueCount >= maxPerTeam || i % 2 === 0)) {
            room.setPlayerTeam(player.id, TEAMS.RED);
            state.spectatorQueue.delete(player.id); // Remove da fila ao entrar no time
            redCount++;
        } else if (blueCount < maxPerTeam) {
            room.setPlayerTeam(player.id, TEAMS.BLUE);
            state.spectatorQueue.delete(player.id); // Remove da fila ao entrar no time
            blueCount++;
        }
    }
    
    console.log(`📊 Times distribuídos: Red=${redCount}, Blue=${blueCount}`);
    
    setTimeout(() => {
        showTeams();
        
        // Inicia o jogo se tiver pelo menos 1 jogador em cada time
        const redSize = getTeamSize(TEAMS.RED);
        const blueSize = getTeamSize(TEAMS.BLUE);
        
        if (redSize > 0 && blueSize > 0) {
            // Define o mapa baseado no número de jogadores por time
            const playersPerTeam = Math.max(redSize, blueSize);
            setMapByPlayerCount(playersPerTeam);
            
            setTimeout(() => {
                room.startGame();
                state.gameRunning = true;
                state.matchmaking = false;
                state.isTransitioning = false;
                announce(MESSAGES.MATCHMAKING.GAME_STARTED, null, COLORS.SUCCESS, "bold", 2);
            }, 2000);
        } else {
            state.matchmaking = false;
            state.isTransitioning = false;
        }
    }, 1000);
}

function showTeams() {
    const redPlayers = getPlayersByTeam(TEAMS.RED);
    const bluePlayers = getPlayersByTeam(TEAMS.BLUE);
    
    announce(MESSAGES.WELCOME.SEPARATOR, null, COLORS.INFO, "bold");
    announce(MESSAGES.TEAMS.RED_TEAM, null, COLORS.RED, "bold");
    redPlayers.forEach(p => announce(MESSAGES.TEAMS.PLAYER_ITEM(p.name), null, COLORS.WHITE, "normal"));
    
    announce(MESSAGES.TEAMS.BLUE_TEAM, null, COLORS.BLUE, "bold");
    bluePlayers.forEach(p => announce(MESSAGES.TEAMS.PLAYER_ITEM(p.name), null, COLORS.WHITE, "normal"));
    announce(MESSAGES.WELCOME.SEPARATOR, null, COLORS.INFO, "bold");
}

// ============================================================================
// SISTEMA DE BALANCEAMENTO AUTOMÁTICO
// ============================================================================

// Função principal de validação - roda continuamente
function validateTeams() {
    // Não valida se não há jogo rodando
    if (!state.gameRunning) return;
    
    // Não valida no modo treino solo
    if (state.soloTrainingMode) return;
    
    const redPlayers = getPlayersByTeam(TEAMS.RED);
    const bluePlayers = getPlayersByTeam(TEAMS.BLUE);
    const redSize = redPlayers.length;
    const blueSize = bluePlayers.length;
    
    console.log(`🔍 Validação: Red=${redSize}, Blue=${blueSize}, Max=${CONFIG.PLAYERS_PER_TEAM}`);
    
    // PROTEÇÃO 1: Remove jogadores extras se algum time tiver mais que o máximo
    if (redSize > CONFIG.PLAYERS_PER_TEAM) {
        console.log(`⚠️ Time vermelho com ${redSize} jogadores! Removendo extras...`);
        announce(
            `⚠️ Time vermelho tem jogadores demais! Movendo extras para espectadores...`,
            null,
            COLORS.WARNING,
            "bold",
            1
        );
        
        // Move os últimos jogadores que entraram para spec
        for (let i = CONFIG.PLAYERS_PER_TEAM; i < redSize; i++) {
            room.setPlayerTeam(redPlayers[i].id, TEAMS.SPEC);
            announce(
                `Você foi movido para espectadores pois o time vermelho estava cheio`,
                redPlayers[i].id,
                COLORS.WARNING
            );
        }
        return; // Retorna e aguarda próxima validação
    }
    
    if (blueSize > CONFIG.PLAYERS_PER_TEAM) {
        console.log(`⚠️ Time azul com ${blueSize} jogadores! Removendo extras...`);
        announce(
            `⚠️ Time azul tem jogadores demais! Movendo extras para espectadores...`,
            null,
            COLORS.WARNING,
            "bold",
            1
        );
        
        // Move os últimos jogadores que entraram para spec
        for (let i = CONFIG.PLAYERS_PER_TEAM; i < blueSize; i++) {
            room.setPlayerTeam(bluePlayers[i].id, TEAMS.SPEC);
            announce(
                `Você foi movido para espectadores pois o time azul estava cheio`,
                bluePlayers[i].id,
                COLORS.WARNING
            );
        }
        return; // Retorna e aguarda próxima validação
    }
    
    // PROTEÇÃO 2: Verifica balanceamento apenas se não estiver em votação/espera
    if (!state.voting && !state.waitingForPlayers) {
        if (redSize !== blueSize) {
            console.log(`⚠️ Times desbalanceados: Red=${redSize}, Blue=${blueSize}`);
            handleUnbalancedTeams();
        }
    }
}

function checkBalance() {
    validateTeams();
}

function stopValidationLoop() {
    if (state.validationInterval) {
        clearInterval(state.validationInterval);
        state.validationInterval = null;
        console.log('⏹️ Sistema de validação contínua parado');
    }
}

function handleUnbalancedTeams() {
    // Não executa no modo treino solo
    if (state.soloTrainingMode) return;
    
    const redSize = getTeamSize(TEAMS.RED);
    const blueSize = getTeamSize(TEAMS.BLUE);
    const specs = getSpectators();
    
    // Se algum time ficou sem jogadores, finaliza o jogo
    if (redSize === 0 || blueSize === 0) {
        if (state.isTransitioning) return; // Já está finalizando
        
        announce(MESSAGES.BALANCE.TEAM_EMPTY, null, COLORS.ERROR, "bold", 2);
        state.gameRunning = false;
        state.isTransitioning = true;
        stopValidationLoop();
        room.stopGame();
        
        // Move todos para espectador antes de iniciar matchmaking
        const allPlayers = room.getPlayerList().filter(p => p.id !== state.botId);
        allPlayers.forEach(p => {
            if (p.team !== TEAMS.SPEC) {
                room.setPlayerTeam(p.id, TEAMS.SPEC);
            }
        });
        
        setTimeout(() => startMatchmaking(), 2000);
        return;
    }
    
    const difference = Math.abs(redSize - blueSize);
    const smallerTeam = redSize < blueSize ? TEAMS.RED : TEAMS.BLUE;
    
    announce(MESSAGES.BALANCE.UNBALANCED, null, COLORS.WARNING, "bold", 2);
    room.pauseGame(true);
    
    // Se tiver espectadores suficientes, adiciona automaticamente
    if (specs.length >= difference) {
        addPlayersToBalance(smallerTeam, difference);
    } else {
        // Espera por novos jogadores
        waitForPlayers(smallerTeam, difference);
    }
}

function addPlayersToBalance(team, amount) {
    // Usa FIFO para selecionar jogadores
    const specs = getSpectatorsByQueue();
    const currentTeamSize = getTeamSize(team);
    
    // PROTEÇÃO: Nunca adicionar mais jogadores do que o permitido
    const maxCanAdd = CONFIG.PLAYERS_PER_TEAM - currentTeamSize;
    const actualAmount = Math.min(amount, maxCanAdd);
    
    if (actualAmount <= 0) {
        console.log(`⚠️ Não é possível adicionar jogadores ao time ${team} - já está no limite`);
        return;
    }
    
    console.log(`➕ Tentando adicionar ${actualAmount} jogador(es) ao time ${team} (atual: ${currentTeamSize}/${CONFIG.PLAYERS_PER_TEAM})`);
    
    announce(MESSAGES.BALANCE.ADDING_PLAYERS(actualAmount), null, COLORS.INFO, "bold", 1);
    
    let added = 0;
    for (let i = 0; i < specs.length && added < actualAmount; i++) {
        // NUNCA adiciona o bot a um time
        if (specs[i].id === state.botId) continue;
        
        // Valida novamente antes de adicionar cada jogador
        const teamSize = getTeamSize(team);
        if (teamSize >= CONFIG.PLAYERS_PER_TEAM) {
            console.log(`⚠️ Time ${team} atingiu o limite durante adição`);
            break;
        }
        
        room.setPlayerTeam(specs[i].id, team);
        state.spectatorQueue.delete(specs[i].id); // Remove da fila ao entrar no time
        added++;
    }
    
    setTimeout(() => {
        const redSize = getTeamSize(TEAMS.RED);
        const blueSize = getTeamSize(TEAMS.BLUE);
        
        console.log(`📊 Após balanceamento: Red=${redSize}, Blue=${blueSize}`);
        
        if (redSize === blueSize) {
            announce(MESSAGES.BALANCE.BALANCED, null, COLORS.SUCCESS, "bold", 2);
            room.pauseGame(false);
        } else {
            console.log(`⚠️ Times ainda desbalanceados após addPlayersToBalance`);
        }
    }, 1000);
}

function waitForPlayers(team, amount) {
    state.waitingForPlayers = true;
    
    announce(MESSAGES.BALANCE.WAITING_PLAYERS(amount), null, COLORS.WARNING, "bold", 1);
    
    state.waitTimer = setTimeout(() => {
        state.waitingForPlayers = false;
        
        const specs = getSpectators();
        const redSize = getTeamSize(TEAMS.RED);
        const blueSize = getTeamSize(TEAMS.BLUE);
        const difference = Math.abs(redSize - blueSize);
        
        if (specs.length >= difference) {
            // Conseguiu jogadores suficientes
            addPlayersToBalance(team, difference);
        } else {
            // Não conseguiu jogadores, inicia votação
            startVote();
        }
    }, CONFIG.WAIT_TIMEOUT);
}

// ============================================================================
// SISTEMA DE VOTAÇÃO
// ============================================================================

function startVote() {
    if (state.voting) return;
    
    state.voting = true;
    state.votes.clear();
    
    const players = room.getPlayerList().filter(p => 
        p.id !== state.botId && (p.team === TEAMS.RED || p.team === TEAMS.BLUE)
    );
    
    announce(MESSAGES.VOTE.SEPARATOR, null, COLORS.WARNING, "bold", 2);
    announce(MESSAGES.VOTE.STARTED, null, COLORS.WARNING, "bold", 2);
    announce(MESSAGES.VOTE.QUESTION, null, COLORS.WHITE, "bold", 1);
    announce(MESSAGES.VOTE.YES_OPTION, null, COLORS.SUCCESS, "normal", 0);
    announce(MESSAGES.VOTE.NO_OPTION, null, COLORS.ERROR, "normal", 0);
    announce(MESSAGES.VOTE.TIMEOUT, null, COLORS.INFO, "normal", 0);
    announce(MESSAGES.VOTE.NO_VOTE_CONTINUES, null, COLORS.INFO, "small", 0);
    announce(MESSAGES.VOTE.SEPARATOR, null, COLORS.WARNING, "bold", 2);
    
    state.voteTimer = setTimeout(() => {
        endVote();
    }, CONFIG.VOTE_TIMEOUT);
}

function endVote() {
    if (!state.voting) return;
    
    state.voting = false;
    
    // Conta os votos
    let votesToEnd = 0;
    let votesToContinue = 0;
    
    state.votes.forEach((vote, playerId) => {
        if (vote === true) {
            votesToEnd++;
        } else {
            votesToContinue++;
        }
    });
    
    // Jogadores que não votaram = continuar
    const players = room.getPlayerList().filter(p => 
        p.id !== state.botId && (p.team === TEAMS.RED || p.team === TEAMS.BLUE)
    );
    const didntVote = players.length - state.votes.size;
    votesToContinue += didntVote;
    
    announce(MESSAGES.VOTE.SEPARATOR, null, COLORS.INFO, "bold");
    announce(MESSAGES.VOTE.RESULT_TITLE, null, COLORS.INFO, "bold", 1);
    announce(MESSAGES.VOTE.CONTINUE_VOTES(votesToContinue), null, COLORS.SUCCESS, "normal");
    announce(MESSAGES.VOTE.END_VOTES(votesToEnd), null, COLORS.ERROR, "normal");
    announce(MESSAGES.VOTE.SEPARATOR, null, COLORS.INFO, "bold");
    
    // Se pelo menos 1 jogador votou para finalizar, finaliza
    if (votesToEnd >= 1) {
        announce(MESSAGES.VOTE.MATCH_ENDED, null, COLORS.ERROR, "bold", 2);
        state.gameRunning = false;
        stopValidationLoop();
        room.stopGame();
        
        // Move todos para espectador antes de iniciar matchmaking
        const allPlayers = room.getPlayerList().filter(p => p.id !== state.botId);
        allPlayers.forEach(p => {
            if (p.team !== TEAMS.SPEC) {
                room.setPlayerTeam(p.id, TEAMS.SPEC);
            }
        });
        
        setTimeout(() => startMatchmaking(), 2000);
    } else {
        announce(MESSAGES.VOTE.MATCH_CONTINUES, null, COLORS.SUCCESS, "bold", 2);
        room.pauseGame(false);
    }
    
    state.votes.clear();
}

function handleVote(player, vote) {
    if (!state.voting) {
        announce(MESSAGES.VOTE.NO_ACTIVE_VOTE, player.id, COLORS.ERROR);
        return false;
    }
    
    if (player.team !== TEAMS.RED && player.team !== TEAMS.BLUE) {
        announce(MESSAGES.VOTE.ONLY_PLAYERS, player.id, COLORS.ERROR);
        return false;
    }
    
    if (state.votes.has(player.id)) {
        announce(MESSAGES.VOTE.ALREADY_VOTED, player.id, COLORS.ERROR);
        return false;
    }
    
    state.votes.set(player.id, vote);
    const voteText = vote ? "FINALIZAR" : "CONTINUAR";
    announce(MESSAGES.VOTE.PLAYER_VOTED(player.name, voteText), null, COLORS.INFO, "normal", 0);
    
    return false;
}

// ============================================================================
// ADIÇÃO AUTOMÁTICA DE JOGADORES DURANTE PARTIDA
// ============================================================================

function tryAddPlayersToGame() {
    if (!state.gameRunning || state.voting || state.waitingForPlayers) return;
    
    const redSize = getTeamSize(TEAMS.RED);
    const blueSize = getTeamSize(TEAMS.BLUE);
    const specs = getSpectatorsByQueue(); // Usa FIFO
    
    // VALIDAÇÃO CRÍTICA: Só adiciona se os times estão balanceados, não estão completos E há espaço
    const hasSpace = redSize < CONFIG.PLAYERS_PER_TEAM && blueSize < CONFIG.PLAYERS_PER_TEAM;
    const needsPlayers = redSize === blueSize && hasSpace;
    const canAddPair = specs.length >= 2;
    
    console.log(`🔍 tryAddPlayersToGame: Red=${redSize}, Blue=${blueSize}, Specs=${specs.length}, HasSpace=${hasSpace}, NeedsPlayers=${needsPlayers}, CanAddPair=${canAddPair}`);
    
    if (needsPlayers && canAddPair) {
        // Adiciona 1 para cada time
        const shuffled = shuffleArray(specs);
        
        announce(MESSAGES.BALANCE.ADDING_NEW_PLAYERS, null, COLORS.INFO, "bold", 1);
        
        let redAdded = false;
        let blueAdded = false;
        
        for (let i = 0; i < shuffled.length && (!redAdded || !blueAdded); i++) {
            // NUNCA adiciona o bot
            if (shuffled[i].id === state.botId) continue;
            
            if (!redAdded && getTeamSize(TEAMS.RED) < CONFIG.PLAYERS_PER_TEAM) {
                room.setPlayerTeam(shuffled[i].id, TEAMS.RED);
                state.spectatorQueue.delete(shuffled[i].id);
                redAdded = true;
            } else if (!blueAdded && getTeamSize(TEAMS.BLUE) < CONFIG.PLAYERS_PER_TEAM) {
                room.setPlayerTeam(shuffled[i].id, TEAMS.BLUE);
                state.spectatorQueue.delete(shuffled[i].id);
                blueAdded = true;
            }
        }
    }
}

// ============================================================================
// SISTEMA DE COMANDOS
// ============================================================================

function handleCommand(player, message) {
    const cmd = message.substring(1).toLowerCase().trim();
    
    switch(cmd) {
        case 'help':
        case 'ajuda':
            announce(MESSAGES.COMMANDS.SEPARATOR, player.id, COLORS.INFO, "bold");
            announce(MESSAGES.COMMANDS.TITLE, player.id, COLORS.INFO, "bold");
            announce(MESSAGES.COMMANDS.SEPARATOR, player.id, COLORS.INFO, "bold");
            announce(MESSAGES.COMMANDS.HELP, player.id, COLORS.WHITE, "small");
            announce(MESSAGES.COMMANDS.TOP, player.id, COLORS.WHITE, "small");
            announce(MESSAGES.COMMANDS.STATS, player.id, COLORS.WHITE, "small");
            announce(MESSAGES.COMMANDS.RANK, player.id, COLORS.WHITE, "small");
            announce(MESSAGES.COMMANDS.YES, player.id, COLORS.WHITE, "small");
            announce(MESSAGES.COMMANDS.NO, player.id, COLORS.WHITE, "small");
            announce(MESSAGES.COMMANDS.SEPARATOR, player.id, COLORS.INFO, "bold");
            return false;
            
        case 'top':
            showTopScorers(player.id);
            return false;
            
        case 'stats':
            showPlayerStats(player.id, player.id);
            return false;
            
        case 'sim':
        case 'continuar':
            return handleVote(player, false);
            
        case 'nao':
        case 'não':
        case 'finalizar':
            return handleVote(player, true);
    }
    
    // Comando !rank [nome]
    if (cmd.startsWith('rank ')) {
        const targetName = message.substring(6).trim();
        showPlayerStatsByName(player.id, targetName);
        return false;
    }
    
    return true;
}

function showTopScorers(targetId = null) {
    const top = getTopScorers();
    
    if (top.length === 0) {
        announce(MESSAGES.RANKING.NO_STATS, targetId, COLORS.INFO);
        return;
    }
    
    announce(MESSAGES.RANKING.SEPARATOR, targetId, COLORS.WARNING, "bold");
    announce(MESSAGES.RANKING.TOP_TITLE, targetId, COLORS.WARNING, "bold");
    announce(MESSAGES.RANKING.SEPARATOR, targetId, COLORS.WARNING, "bold");
    
    top.forEach((stats, index) => {
        const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`;
        const winRate = stats.gamesPlayed > 0 ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(0) : 0;
        announce(
            `${medal} ${stats.name} - ${stats.goals}⚽ | ${stats.assists}🎯 | ${stats.gamesPlayed}🎮 (${winRate}%📈)`,
            targetId,
            COLORS.WHITE,
            "small"
        );
    });
    
    announce(MESSAGES.RANKING.SEPARATOR, targetId, COLORS.WARNING, "bold");
}

function showPlayerStats(requesterId, targetId) {
    const stats = state.playerStats.get(targetId);
    
    if (!stats || stats.gamesPlayed === 0) {
        announce(MESSAGES.RANKING.NO_GAMES, requesterId, COLORS.INFO);
        return;
    }
    
    const winRate = ((stats.wins / stats.gamesPlayed) * 100).toFixed(1);
    const goalsPerGame = (stats.goals / stats.gamesPlayed).toFixed(1);
    const assistsPerGame = (stats.assists / stats.gamesPlayed).toFixed(1);
    
    announce(MESSAGES.RANKING.SEPARATOR, requesterId, COLORS.INFO, "bold");
    announce(MESSAGES.RANKING.PLAYER_STATS_TITLE(stats.name), requesterId, COLORS.INFO, "bold");
    announce(MESSAGES.RANKING.SEPARATOR, requesterId, COLORS.INFO, "bold");
    announce(MESSAGES.RANKING.GOALS(stats.goals), requesterId, COLORS.WHITE, "small");
    announce(`🎯 Assistências: ${stats.assists}`, requesterId, COLORS.WHITE, "small");
    if (stats.ownGoals > 0) {
        announce(`💀 Gols contra: ${stats.ownGoals}`, requesterId, COLORS.WHITE, "small");
    }
    announce(MESSAGES.RANKING.MATCHES(stats.gamesPlayed), requesterId, COLORS.WHITE, "small");
    announce(MESSAGES.RANKING.WINS(stats.wins), requesterId, COLORS.SUCCESS, "small");
    announce(MESSAGES.RANKING.LOSSES(stats.losses), requesterId, COLORS.ERROR, "small");
    announce(MESSAGES.RANKING.WIN_RATE(winRate), requesterId, COLORS.WARNING, "small");
    announce(MESSAGES.RANKING.GOALS_PER_MATCH(goalsPerGame), requesterId, COLORS.INFO, "small");
    announce(`⚡ Assistências/partida: ${assistsPerGame}`, requesterId, COLORS.INFO, "small");
    announce(MESSAGES.RANKING.SEPARATOR, requesterId, COLORS.INFO, "bold");
}

function showPlayerStatsByName(requesterId, targetName) {
    const stats = Array.from(state.playerStats.values()).find(
        s => s.name.toLowerCase().includes(targetName.toLowerCase())
    );
    
    if (!stats) {
        announce(MESSAGES.RANKING.PLAYER_NOT_FOUND, requesterId, COLORS.ERROR);
        return;
    }
    
    if (stats.gamesPlayed === 0) {
        announce(MESSAGES.RANKING.NO_GAMES, requesterId, COLORS.INFO);
        return;
    }
    
    const winRate = ((stats.wins / stats.gamesPlayed) * 100).toFixed(1);
    const goalsPerGame = (stats.goals / stats.gamesPlayed).toFixed(1);
    
    announce(MESSAGES.RANKING.SEPARATOR, requesterId, COLORS.INFO, "bold");
    announce(MESSAGES.RANKING.PLAYER_STATS_TITLE(stats.name), requesterId, COLORS.INFO, "bold");
    announce(MESSAGES.RANKING.SEPARATOR, requesterId, COLORS.INFO, "bold");
    announce(MESSAGES.RANKING.GOALS(stats.goals), requesterId, COLORS.WHITE, "small");
    announce(MESSAGES.RANKING.MATCHES(stats.gamesPlayed), requesterId, COLORS.WHITE, "small");
    announce(MESSAGES.RANKING.WINS(stats.wins), requesterId, COLORS.SUCCESS, "small");
    announce(MESSAGES.RANKING.LOSSES(stats.losses), requesterId, COLORS.ERROR, "small");
    announce(MESSAGES.RANKING.WIN_RATE(winRate), requesterId, COLORS.WARNING, "small");
    announce(MESSAGES.RANKING.GOALS_PER_MATCH(goalsPerGame), requesterId, COLORS.INFO, "small");
    announce(MESSAGES.RANKING.SEPARATOR, requesterId, COLORS.INFO, "bold");
}

// ============================================================================
// CONFIGURAÇÃO INICIAL
// ============================================================================

// Carrega mapa X1 por padrão (será alterado dinamicamente)
room.setCustomStadium(MAPS.X1);
room.setScoreLimit(CONFIG.GOALS_TO_WIN);
room.setTimeLimit(CONFIG.TIME_LIMIT);

console.log("🗺️ Mapas carregados: X1 (1v1/2v2) e X3 (3v3)");

// ============================================================================
// EVENTOS DA SALA
// ============================================================================

room.onPlayerJoin = function(player) {
    console.log(`➕ ${player.name} entrou [ID: ${player.id}]`);
    
    // Identifica o bot (quando noPlayer: true, o bot sempre tem ID 0)
    if (player.id === 0) {
        state.botId = 0;
        room.setPlayerTeam(0, TEAMS.SPEC);
        console.log(`🤖 Bot host identificado [ID: 0]`);
        return; // PARA AQUI - não processa mais nada para o bot
    }
    
    // Inicializa stats do jogador
    initPlayerStats(player.id, player.name);
    
    // Adiciona à fila de espectadores (todos começam como spec)
    state.spectatorQueue.set(player.id, Date.now());
    console.log(`📝 ${player.name} adicionado à fila de espectadores`);
    
    announce(MESSAGES.WELCOME.SEPARATOR, player.id, COLORS.INFO, "bold", 1);
    announce(MESSAGES.WELCOME.GREETING(player.name), player.id, COLORS.SUCCESS, "bold", 1);
    announce(MESSAGES.WELCOME.SYSTEM_INFO, player.id, COLORS.INFO, "normal");
    announce(MESSAGES.WELCOME.HELP_HINT, player.id, COLORS.INFO, "small");
    announce(MESSAGES.WELCOME.SEPARATOR, player.id, COLORS.INFO, "bold", 1);
    
    // Se está em modo treino solo, termina o jogo para iniciar matchmaking
    if (state.soloTrainingMode && state.gameRunning) {
        const realPlayers = room.getPlayerList().filter(p => p.id !== state.botId);
        if (realPlayers.length >= 2) {
            if (state.isTransitioning) return; // Já está em transição
            
            announce(MESSAGES.MATCHMAKING.TRAINING_TO_MATCH, null, COLORS.INFO, "bold", 2);
            state.gameRunning = false;
            state.soloTrainingMode = false;
            state.isTransitioning = true;
            stopValidationLoop();
            room.stopGame();
            
            // Move todos para espectador antes de iniciar matchmaking
            const allPlayers = room.getPlayerList().filter(p => p.id !== state.botId);
            allPlayers.forEach(p => {
                if (p.team !== TEAMS.SPEC) {
                    room.setPlayerTeam(p.id, TEAMS.SPEC);
                }
            });
            
            setTimeout(() => startMatchmaking(), 2000);
            return;
        }
    }
    
    // Se estiver esperando jogadores durante uma partida pausada
    if (state.waitingForPlayers) {
        const redSize = getTeamSize(TEAMS.RED);
        const blueSize = getTeamSize(TEAMS.BLUE);
        const difference = Math.abs(redSize - blueSize);
        const specs = getSpectators();
        
        if (specs.length >= difference) {
            clearTimers();
            state.waitingForPlayers = false;
            const smallerTeam = redSize < blueSize ? TEAMS.RED : TEAMS.BLUE;
            addPlayersToBalance(smallerTeam, difference);
        }
    }
    // Se o jogo está rodando e balanceado, tenta adicionar jogadores
    else if (state.gameRunning && !state.voting) {
        setTimeout(() => tryAddPlayersToGame(), 500);
    }
    // Se não há jogo rodando, inicia matchmaking APENAS se houver jogadores REAIS suficientes
    else if (!state.gameRunning && !state.matchmaking) {
        // Conta apenas jogadores REAIS (excluindo o bot)
        const realPlayers = room.getPlayerList().filter(p => p.id !== state.botId);
        
        console.log(`📊 Jogadores reais na sala: ${realPlayers.length}`);
        
        if (realPlayers.length >= 1) {
            if (realPlayers.length === 1) {
                announce(MESSAGES.MATCHMAKING.ONE_PLAYER_TRAINING, null, COLORS.INFO, "bold", 1);
            } else {
                announce(MESSAGES.MATCHMAKING.MULTIPLE_PLAYERS(realPlayers.length), null, COLORS.INFO, "bold", 1);
            }
            setTimeout(() => startMatchmaking(), 2000);
        } else {
            announce(MESSAGES.MATCHMAKING.WAITING_START, null, COLORS.WARNING, "normal", 0);
        }
    }
};

room.onPlayerLeave = function(player) {
    console.log(`➖ ${player.name} saiu [ID: ${player.id}]`);
    
    if (player.id === state.botId) {
        state.botId = null;
        return;
    }
    
    // Remove da fila de espectadores
    if (state.spectatorQueue.has(player.id)) {
        state.spectatorQueue.delete(player.id);
        console.log(`🗑️ ${player.name} removido da fila de espectadores`);
    }
    
    // Remove voto se estava votando
    if (state.votes.has(player.id)) {
        state.votes.delete(player.id);
    }
    
    // Se estava em jogo, verifica balanceamento
    if (state.gameRunning && (player.team === TEAMS.RED || player.team === TEAMS.BLUE)) {
        setTimeout(() => checkBalance(), 500);
    }
};

room.onPlayerChat = function(player, message) {
    console.log(`💬 [${player.name}]: ${message}`);
    
    if (player.id === state.botId) return false;
    
    if (message.startsWith("!")) {
        return handleCommand(player, message);
    }
    
    return true;
};

room.onPlayerBallKick = function(player) {
    if (player.id === state.botId) return;
    
    // Atualiza rastreamento de toques para assistências
    // Só atualiza se for um jogador diferente (drible não conta como assistência)
    if (state.lastTouches.player1 !== player.id) {
        state.lastTouches.player2 = state.lastTouches.player1;
        state.lastTouches.player1 = player.id;
    }
    
    state.lastGoalKicker = player.id;
};

room.onTeamGoal = function(team) {
    const scores = room.getScores();
    const teamName = team === TEAMS.RED ? "🔴 TIME VERMELHO" : "🔵 TIME AZUL";
    const teamColor = team === TEAMS.RED ? COLORS.RED : COLORS.BLUE;
    
    // Apenas processar gols se NÃO for modo treino e houver jogador que chutou
    if (state.lastTouches.player1 && !state.soloTrainingMode) {
        const scorer = room.getPlayer(state.lastTouches.player1);
        
        if (scorer) {
            // Verifica se é gol normal ou gol contra
            const isOwnGoal = scorer.team !== team;
            
            if (isOwnGoal) {
                // ========== GOL CONTRA ==========
                addOwnGoal(scorer.id);
                
                const ownGoalMessage = getRandomMessage(GOL_MESSAGES.OWN_GOAL)
                    .replace("{player}", scorer.name);
                
                announce(ownGoalMessage, null, teamColor, "bold", 2);
                announce(`${teamName}`, null, teamColor, "bold", 0);
                
            } else {
                // ========== GOL NORMAL ==========
                addGoal(scorer.id);
                
                // Verifica se há assistência válida
                let assisterName = null;
                if (state.lastTouches.player2 && state.lastTouches.player2 !== scorer.id) {
                    const assister = room.getPlayer(state.lastTouches.player2);
                    if (assister && assister.team === team) {
                        // Assistência válida!
                        addAssist(assister.id);
                        assisterName = assister.name;
                    }
                }
                
                // Obtém estatísticas do jogador e gols na partida
                const playerStats = state.playerStats.get(scorer.id);
                const matchGoalsCount = state.matchGoals.get(scorer.id) || 1;
                
                // Gera mensagem personalizada (com ou sem assistência)
                const goalMessage = getGoalMessage(scorer, playerStats, matchGoalsCount, assisterName);
                
                announce(goalMessage, null, teamColor, "bold", 2);
                announce(`${teamName}`, null, teamColor, "bold", 0);
            }
        } else {
            // Jogador não encontrado, mensagem genérica
            announce(`⚽ GOOOOL! ${teamName}!`, null, teamColor, "bold", 2);
        }
    } else {
        // Modo treino ou sem lastTouches
        const goalMessage = state.soloTrainingMode ? MESSAGES.GOAL.TRAINING : MESSAGES.GOAL.GENERIC(teamName);
        announce(goalMessage, null, teamColor, "bold", state.soloTrainingMode ? 1 : 2);
    }
    
    announce(MESSAGES.GOAL.SCORE(scores.red, scores.blue), null, COLORS.WHITE, "bold", 0);
    
    // Reseta rastreamento de toques após o gol
    state.lastTouches.player1 = null;
    state.lastTouches.player2 = null;
    state.lastGoalKicker = null;
};

room.onTeamVictory = function(scores) {
    // Trata finalização de treino solo
    if (state.soloTrainingMode) {
        announce(MESSAGES.MATCHMAKING.TRAINING_FINISHED, null, COLORS.INFO, "bold", 1);
        state.gameRunning = false;
        state.lastGoalKicker = null;
        state.lastTouches.player1 = null;
        state.lastTouches.player2 = null;
        state.soloTrainingMode = false;
        stopValidationLoop();
        
        // Move jogador para espectador
        const allPlayers = room.getPlayerList().filter(p => p.id !== state.botId);
        allPlayers.forEach(p => {
            if (p.team !== TEAMS.SPEC) {
                room.setPlayerTeam(p.id, TEAMS.SPEC);
            }
        });
        
        // Aguarda 10 segundos antes de decidir próxima partida
        setTimeout(() => {
            announce(MESSAGES.MATCHMAKING.WAIT_10_SECONDS, null, COLORS.INFO, "bold", 1);
        }, 1000);
        
        setTimeout(() => {
            startMatchmaking();
        }, 10000);
        return;
    }
    
    // Trata finalização de partida normal
    const winner = scores.red > scores.blue ? TEAMS.RED : TEAMS.BLUE;
    const loser = winner === TEAMS.RED ? TEAMS.BLUE : TEAMS.RED;
    const winnerName = winner === TEAMS.RED ? MESSAGES.TEAMS.RED_WINS : MESSAGES.TEAMS.BLUE_WINS;
    const winnerColor = winner === TEAMS.RED ? COLORS.RED : COLORS.BLUE;
    
    updateGameStats(winner);
    
    announce(MESSAGES.VICTORY.SEPARATOR, null, COLORS.WARNING, "bold", 2);
    announce(MESSAGES.VICTORY.WINNER(winnerName), null, winnerColor, "bold", 2);
    announce(MESSAGES.VICTORY.FINAL_SCORE(scores.red, scores.blue), null, COLORS.WHITE, "bold", 2);
    announce(MESSAGES.VICTORY.SEPARATOR, null, COLORS.WARNING, "bold", 2);
    
    state.gameRunning = false;
    state.lastGoalKicker = null;
    state.lastTouches.player1 = null;
    state.lastTouches.player2 = null;
    stopValidationLoop();
    
    // Separa vencedores e perdedores
    const winners = getPlayersByTeam(winner);
    const losers = getPlayersByTeam(loser);
    
    // Move apenas os PERDEDORES para espectador
    losers.forEach(p => {
        room.setPlayerTeam(p.id, TEAMS.SPEC);
    });
    
    // Aguarda um pouco e então randomiza os times dos vencedores
    setTimeout(() => {
        announce("🔄 Próxima partida em 5 segundos...", null, COLORS.INFO, "bold", 1);
        announce("🎲 Times dos vencedores serão aleatorizados!", null, COLORS.WARNING, "normal", 0);
    }, 2000);
    
    setTimeout(() => {
        // Randomiza os vencedores entre os times
        const shuffledWinners = shuffleArray(winners);
        const halfSize = Math.floor(shuffledWinners.length / 2);
        
        shuffledWinners.forEach((player, index) => {
            const newTeam = index < halfSize ? TEAMS.RED : TEAMS.BLUE;
            room.setPlayerTeam(player.id, newTeam);
        });
        
        announce("🎲 Times aleatorizados!", null, COLORS.SUCCESS, "bold", 1);
        
        // Inicia nova partida
        setTimeout(() => {
            startMatchmaking();
        }, 2000);
    }, 5000);
};

room.onGameStart = function(byPlayer) {
    console.log('🎮 Jogo iniciado!');
    state.gameRunning = true;
    
    // Limpa contador de gols da partida
    state.matchGoals.clear();
    
    // Aguarda 3 segundos antes de iniciar o loop de validação
    setTimeout(() => {
        // Inicia o loop de validação contínua (roda a cada 1 segundo)
        if (state.validationInterval) {
            clearInterval(state.validationInterval);
        }
        
        state.validationInterval = setInterval(() => {
            validateTeams();
        }, 1000);
        
        console.log('✅ Sistema de validação contínua iniciado (1 validação/segundo)');
    }, 3000);
};

room.onGameStop = function(byPlayer) {
    console.log('🛑 Jogo encerrado!');
    state.gameRunning = false;
    state.lastGoalKicker = null;
    state.lastTouches.player1 = null;
    state.lastTouches.player2 = null;
    state.soloTrainingMode = false;
    clearTimers();
    state.voting = false;
    state.waitingForPlayers = false;
    state.votes.clear();
    state.isTransitioning = false;
    state.matchGoals.clear(); // Limpa contador de gols da partida
    
    // Para o loop de validação
    stopValidationLoop();
};

room.onGamePause = function(byPlayer) {
    console.log('⏸️ Jogo pausado');
};

room.onGameUnpause = function(byPlayer) {
    console.log('▶️ Jogo despausado');
};

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
    // PROTEÇÃO 1: Se alguém tentar mover o bot para um time, move de volta para spec
    if (changedPlayer.id === state.botId && changedPlayer.team !== TEAMS.SPEC) {
        console.log('⚠️ Tentativa de mover bot para time detectada - revertendo');
        setTimeout(() => {
            room.setPlayerTeam(state.botId, TEAMS.SPEC);
        }, 100);
        return;
    }
    
    // Sistema FIFO: Registra timestamp quando jogador vai para espectadores
    if (changedPlayer.team === TEAMS.SPEC && changedPlayer.id !== state.botId) {
        if (!state.spectatorQueue.has(changedPlayer.id)) {
            state.spectatorQueue.set(changedPlayer.id, Date.now());
            console.log(`📝 ${changedPlayer.name} entrou na fila de espectadores`);
        }
    } else if (changedPlayer.team !== TEAMS.SPEC) {
        // Remove da fila quando sai dos espectadores
        if (state.spectatorQueue.has(changedPlayer.id)) {
            state.spectatorQueue.delete(changedPlayer.id);
            console.log(`✅ ${changedPlayer.name} saiu da fila de espectadores`);
        }
    }
    
    // PROTEÇÃO 2: Durante o jogo, valida se o time não ficou com mais jogadores que o permitido
    if (state.gameRunning && changedPlayer.team !== TEAMS.SPEC) {
        setTimeout(() => {
            const teamSize = getTeamSize(changedPlayer.team);
            
            if (teamSize > CONFIG.PLAYERS_PER_TEAM) {
                console.log(`⚠️ Time ficou com ${teamSize} jogadores após mudança! Revertendo...`);
                room.setPlayerTeam(changedPlayer.id, TEAMS.SPEC);
                announce(
                    `❌ Time já está cheio! Máximo ${CONFIG.PLAYERS_PER_TEAM} jogadores por time.`,
                    changedPlayer.id,
                    COLORS.ERROR,
                    "bold",
                    2
                );
            } else {
                // Valida balanceamento após mudança de time
                validateTeams();
            }
        }, 100);
    }
};

room.onRoomLink = function(url) {
    console.log(`🔗 Link da sala: ${url}`);
};

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

console.log("✅ Sistema de Matchmaking 3x3 Automático carregado!");
console.log(`⚙️ Configuração: ${CONFIG.PLAYERS_PER_TEAM}x${CONFIG.PLAYERS_PER_TEAM}, ${CONFIG.GOALS_TO_WIN} gols`);
console.log("🤖 Bot admin ativado para gerenciamento automático");
console.log("⚽ Sistema de assistências e gols contra ativado!");
