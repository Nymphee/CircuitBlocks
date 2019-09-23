/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.proto.BuildParams', null, global);
goog.exportSymbol('proto.proto.Response', null, global);
goog.exportSymbol('proto.proto.VerboseParams', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.BuildParams = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.BuildParams, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.proto.BuildParams.displayName = 'proto.proto.BuildParams';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.proto.BuildParams.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.BuildParams.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.BuildParams} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.BuildParams.toObject = function(includeInstance, msg) {
  var f, obj = {
    hardwarefolders: jspb.Message.getFieldWithDefault(msg, 1, ""),
    toolsfolders: jspb.Message.getFieldWithDefault(msg, 2, ""),
    builtinlibrariesfolders: jspb.Message.getFieldWithDefault(msg, 3, ""),
    otherlibrariesfolders: jspb.Message.getFieldWithDefault(msg, 4, ""),
    sketchlocation: jspb.Message.getFieldWithDefault(msg, 5, ""),
    fqbn: jspb.Message.getFieldWithDefault(msg, 6, ""),
    arduinoapiversion: jspb.Message.getFieldWithDefault(msg, 7, ""),
    custombuildproperties: jspb.Message.getFieldWithDefault(msg, 8, ""),
    buildcachepath: jspb.Message.getFieldWithDefault(msg, 9, ""),
    buildpath: jspb.Message.getFieldWithDefault(msg, 10, ""),
    warningslevel: jspb.Message.getFieldWithDefault(msg, 11, ""),
    codecompleteat: jspb.Message.getFieldWithDefault(msg, 12, ""),
    verbose: jspb.Message.getFieldWithDefault(msg, 13, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.BuildParams}
 */
proto.proto.BuildParams.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.BuildParams;
  return proto.proto.BuildParams.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.BuildParams} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.BuildParams}
 */
proto.proto.BuildParams.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setHardwarefolders(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setToolsfolders(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setBuiltinlibrariesfolders(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setOtherlibrariesfolders(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSketchlocation(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setFqbn(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setArduinoapiversion(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setCustombuildproperties(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setBuildcachepath(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setBuildpath(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setWarningslevel(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setCodecompleteat(value);
      break;
    case 13:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setVerbose(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.BuildParams.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.BuildParams.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.BuildParams} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.BuildParams.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHardwarefolders();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getToolsfolders();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getBuiltinlibrariesfolders();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getOtherlibrariesfolders();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getSketchlocation();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getFqbn();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getArduinoapiversion();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getCustombuildproperties();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getBuildcachepath();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getBuildpath();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getWarningslevel();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getCodecompleteat();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getVerbose();
  if (f) {
    writer.writeBool(
      13,
      f
    );
  }
};


/**
 * optional string hardwareFolders = 1;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getHardwarefolders = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setHardwarefolders = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string toolsFolders = 2;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getToolsfolders = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setToolsfolders = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string builtInLibrariesFolders = 3;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getBuiltinlibrariesfolders = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setBuiltinlibrariesfolders = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string otherLibrariesFolders = 4;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getOtherlibrariesfolders = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setOtherlibrariesfolders = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string sketchLocation = 5;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getSketchlocation = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setSketchlocation = function(value) {
  jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string fQBN = 6;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getFqbn = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setFqbn = function(value) {
  jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string arduinoAPIVersion = 7;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getArduinoapiversion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setArduinoapiversion = function(value) {
  jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string customBuildProperties = 8;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getCustombuildproperties = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setCustombuildproperties = function(value) {
  jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string buildCachePath = 9;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getBuildcachepath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setBuildcachepath = function(value) {
  jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string buildPath = 10;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getBuildpath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setBuildpath = function(value) {
  jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional string warningsLevel = 11;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getWarningslevel = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setWarningslevel = function(value) {
  jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional string codeCompleteAt = 12;
 * @return {string}
 */
proto.proto.BuildParams.prototype.getCodecompleteat = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/** @param {string} value */
proto.proto.BuildParams.prototype.setCodecompleteat = function(value) {
  jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * optional bool verbose = 13;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.proto.BuildParams.prototype.getVerbose = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 13, false));
};


/** @param {boolean} value */
proto.proto.BuildParams.prototype.setVerbose = function(value) {
  jspb.Message.setProto3BooleanField(this, 13, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.VerboseParams = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.VerboseParams, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.proto.VerboseParams.displayName = 'proto.proto.VerboseParams';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.proto.VerboseParams.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.VerboseParams.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.VerboseParams} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.VerboseParams.toObject = function(includeInstance, msg) {
  var f, obj = {
    verbose: jspb.Message.getFieldWithDefault(msg, 1, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.VerboseParams}
 */
proto.proto.VerboseParams.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.VerboseParams;
  return proto.proto.VerboseParams.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.VerboseParams} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.VerboseParams}
 */
proto.proto.VerboseParams.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setVerbose(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.VerboseParams.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.VerboseParams.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.VerboseParams} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.VerboseParams.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVerbose();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool verbose = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.proto.VerboseParams.prototype.getVerbose = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 1, false));
};


/** @param {boolean} value */
proto.proto.VerboseParams.prototype.setVerbose = function(value) {
  jspb.Message.setProto3BooleanField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.Response = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.Response, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.proto.Response.displayName = 'proto.proto.Response';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.proto.Response.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.Response.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.Response} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.Response.toObject = function(includeInstance, msg) {
  var f, obj = {
    line: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.Response}
 */
proto.proto.Response.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.Response;
  return proto.proto.Response.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.Response} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.Response}
 */
proto.proto.Response.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setLine(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.Response.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.Response.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.Response} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.Response.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLine();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string line = 1;
 * @return {string}
 */
proto.proto.Response.prototype.getLine = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.proto.Response.prototype.setLine = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


goog.object.extend(exports, proto.proto);