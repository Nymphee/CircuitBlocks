goog.require("Blockly.Arduino");

goog.provide("Blockly.Arduino.Spencer");

Blockly.Arduino.additionals["Spencer"] = function(){
    Blockly.Arduino.addInclude("AR_include", "#include <Arduino.h>");
    Blockly.Arduino.addInclude("COS_include", "#include <CircuitOS.h>");
    Blockly.Arduino.addInclude("Spencer_include", "#include <Spencer.h>");
};