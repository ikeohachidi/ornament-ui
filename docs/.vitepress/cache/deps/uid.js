// node_modules/uid/dist/index.mjs
var IDX = 256;
var HEX = [];
var SIZE = 256;
var BUFFER;
while (IDX--)
  HEX[IDX] = (IDX + 256).toString(16).substring(1);
function uid(len) {
  var i = 0, tmp = len || 11;
  if (!BUFFER || IDX + tmp > SIZE * 2) {
    for (BUFFER = "", IDX = 0; i < SIZE; i++) {
      BUFFER += HEX[Math.random() * 256 | 0];
    }
  }
  return BUFFER.substring(IDX, IDX++ + tmp);
}
export {
  uid
};
//# sourceMappingURL=uid.js.map
