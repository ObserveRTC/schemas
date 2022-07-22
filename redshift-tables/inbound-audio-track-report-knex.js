const schemaName = "schema";
const tableName = "inbound_audio_track_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 255).notNull();
		table.string("mediaunitid", 255).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.specificType("callid", "CHAR(36)").notNull();
		table.specificType("clientid", "CHAR(36)").notNull();
		table.specificType("peerconnectionid", "CHAR(36)").notNull();
		table.integer("sampleseq").notNull();
		table.bigInteger("ssrc").notNull();
		table.text("averagertcpinterval");
		table.integer("burstdiscardcount");
		table.text("burstdiscardrate");
		table.integer("burstlosscount");
		table.text("burstlossrate");
		table.integer("burstpacketsdiscarded");
		table.integer("burstpacketslost");
		table.bigInteger("bytesreceived");
		table.bigInteger("bytessent");
		table.integer("channels");
		table.integer("clockrate");
		table.text("decoderimplementation");
		table.boolean("ended");
		table.bigInteger("estimatedplayouttimestamp");
		table.integer("fecpacketsdiscarded");
		table.integer("fecpacketsreceived");
		table.text("gapdiscardrate");
		table.text("gaplossrate");
		table.bigInteger("headerbytesreceived");
		table.text("jitter");
		table.text("jitterbufferdelay");
		table.integer("jitterbufferemittedcount");
		table.text("label");
		table.bigInteger("lastpacketreceivedtimestamp");
		table.text("marker");
		table.text("mimetype");
		table.integer("nackcount");
		table.integer("packetsdiscarded");
		table.integer("packetsduplicated");
		table.integer("packetsfaileddecryption");
		table.integer("packetslost");
		table.integer("packetsreceived");
		table.integer("packetsrepaired");
		table.integer("packetssent");
		table.integer("payloadtype");
		table.integer("perdscppacketsreceived");
		table.string("remoteclientid", 255);
		table.string("remotepeerconnectionid", 255);
		table.bigInteger("remotetimestamp");
		table.string("remotetrackid", 255);
		table.string("remoteuserid", 255);
		table.integer("reportssent");
		table.string("roomid", 255);
		table.text("sdpfmtpline");
		table.specificType("sfusinkid", "CHAR(36)");
		table.specificType("sfustreamid", "CHAR(36)");
		table.text("totalprocessingdelay");
		table.specificType("trackid", "CHAR(36)");
		table.string("userid", 255);
		table.boolean("voiceactivityflag");
	});
};