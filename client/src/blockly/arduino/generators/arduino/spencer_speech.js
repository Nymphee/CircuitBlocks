goog.require('Blockly.Arduino');

goog.provide('Blockly.Arduino.spencer_speech');

Blockly.Arduino['spencer_speech_listen'] = function(block){
	Blockly.Arduino.addDeclaration("Spencer_Record_Result", "const char* listenResult;");
	Blockly.Arduino.addDeclaration("Spencer_Intent_Result", "IntentResult* intentResult;");
	Blockly.Arduino.addDeclaration("Spencer_Intent_Processing", "bool processingIntent = false;");

	const CODE = "  " + Blockly.Arduino.statementToCode(block, 'CODE_PRE', Blockly.Arduino.ORDER_ATOMIC).replace("\n", "\n  ");

	var checkCode = "  if(listenResult != nullptr && !processingIntent){\n" +
		"    intentResult = nullptr;\n" +
		"    processingIntent = true;\n" +
		"    SpeechToIntent.addJob({ listenResult, &intentResult });\n\n" +
		CODE + "\n" +
		"  }\n" +
		"  if(processingIntent && intentResult != nullptr){\n" +
		"    listenResult = nullptr;\n" +
		"    processingIntent = false;\n" +
		"    listenProcess();\n" +
		"  }";

	const processFuncName = `listenProcess`;
	const processFunc = `void ${processFuncName}(){\n}`;
	Blockly.Arduino.addFunction(processFuncName, processFunc);

	const checkFuncName = `listenCheck`;
	const checkFunc = `void ${checkFuncName}(){\n${checkCode}\n}`;
	Blockly.Arduino.addFunction(checkFuncName, checkFunc);

	Blockly.Arduino.addWrap("Spencer_Record_Check", "listenCheck();")

	var code = `listenResult = nullptr;\nRecording.addJob({ &listenResult });\n`;
	return code;
};

Blockly.Arduino['spencer_speech_processed'] = function(block){
	const CODE = Blockly.Arduino.statementToCode(block, 'CODE', Blockly.Arduino.ORDER_ATOMIC);

	const processFuncName = `listenProcess`;
	if(Blockly.Arduino.codeFunctions_[processFuncName] !== undefined){
		Blockly.Arduino.codeFunctions_[processFuncName] = undefined;
	}
	const processFunc = `void ${processFuncName}(){\n${CODE}\n}`;
	Blockly.Arduino.addFunction(processFuncName, processFunc);
}

Blockly.Arduino['spencer_speech_synthesize'] = function(block){
	Blockly.Arduino.addInclude("Spencer_Speech_PrepS_Include", "#include <PreparedStatement.h>");
	Blockly.Arduino.addDeclaration("Spencer_Speech_PrepS", "PreparedStatement* statement = nullptr;");
	Blockly.Arduino.addDeclaration("Spencer_Speech_Guard", "bool synthesizing = false;");

	var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
	var CODE_SYN = Blockly.Arduino.statementToCode(block, 'CODE_SYN', Blockly.Arduino.ORDER_ATOMIC);
	var CODE_DONE = Blockly.Arduino.statementToCode(block, 'CODE_DONE', Blockly.Arduino.ORDER_ATOMIC);
	var CODE_ERR = Blockly.Arduino.statementToCode(block, 'CODE_ERR', Blockly.Arduino.ORDER_ATOMIC);

	if(CODE_DONE != ""){
		CODE_DONE = "  " + CODE_DONE.replace("\n", "\n  ");
	}

	if(CODE_ERR != ""){
		CODE_ERR = "  " + CODE_ERR.replace("\n", "\n  ");
		CODE_ERR += "\n";
	}

	var playCode = "  synthesizing = false;\n" +
		"  if(error != TTSError::OK){\n" +
		"    Serial.printf(\"Text to speech error %d: %s\\n\", error, TTSStrings[(int) error]);\n" +
		"    delete source;\n" +
		"    delete statement;\n" +
		"    statement = nullptr;\n" +
		CODE_ERR +
		"    return;\n" +
		"  }\n" +
		CODE_SYN +
		"  Playback.playMP3(source);\n" +
		"  Playback.setPlaybackDoneCallback([](){\n" +
		`${CODE_DONE}\n  });`;

	const funcName = `speechPlay`;
	const func = `void ${funcName}(TTSError error, CompositeAudioFileSource* source){\n${playCode}\n}`;
	Blockly.Arduino.addFunction(funcName, func);

	const code = "if(synthesizing){\n" +
		"  Serial.println(\"Another speech synthesis operation is already pending\");\n" +
		"}else{\n" +
		"  synthesizing = true;\n" +
		"  delete statement;\n" +
		"  statement = new PreparedStatement();\n" +
		`  statement->addTTS(${text});\n` +
		`  statement->prepare(${funcName});\n` +
		"}\n";

	return code;
};