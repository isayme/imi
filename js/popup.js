
// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  var oPsd = document.querySelector('#o-psd');
  var salt = document.querySelector('#salt');
  var nPsd = document.querySelector('#n-psd');
  
  oPsd.value = salt.value = nPsd.value = '';
  
  // generate new password if possible
  function generatePsd() {
    if (!oPsd.value || !salt.value) {
      return;
    }
    
    var md5one = md5(oPsd.value, salt.value);
    var md5two = md5(md5one, 'isayme');
    var md5three = md5(md5one, 'heaven');

    var rule = md5three.split("");
    var source = md5two.split("");
    for (var i = 0; i <= 31; i++) {
      if (isNaN(source[i])){
        str ="zsedcftgbhujmko13579";
        if (str.search(rule[i]) > -1) {
          source[i] = source[i].toUpperCase();
        }
      }
    }
    var code32 = source.join("");
    var code1 = code32.slice(0,1);
    if (isNaN(code1)) {
      var code16 = code32.slice(0,16);
    } else {
      var code16 = "H" + code32.slice(1,16);
    }
    
    nPsd.value = code16;
  }

  oPsd.oninput = generatePsd;
  salt.oninput = generatePsd;
  
  nPsd.onfocus = function() {
    this.select();
  };
  nPsd.onmouseup = function(ev) {
    ev.preventDefault();
  };
  
});
