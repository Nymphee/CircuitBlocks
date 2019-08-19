goog.provide("Blockly.Arduino.MAKERphone");

goog.require("Blockly.Arduino");

Blockly.Arduino.additionals["MAKERphone"] = function(){
  Blockly.Arduino.addInclude("MP_include", "#include <MAKERphone.h>");
  Blockly.Arduino.addDeclaration("MP_declare", "MAKERphone mp;");
  Blockly.Arduino.addSetup("MP_begin", "mp.begin(0);");
};