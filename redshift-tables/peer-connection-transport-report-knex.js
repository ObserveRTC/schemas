const schemaName = "schema";
const tableName = "peer_connection_transport_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 255).notNull();
		table.string("mediaunitid", 255).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.specificType("callid", "CHAR(36)").notNull();
		table.specificType("clientid", "CHAR(36)").notNull();
		table.specificType("peerconnectionid", "CHAR(36)").notNull();
		table.integer("sampleseq").notNull();
		table.bigInteger("bytesreceived");
		table.bigInteger("bytessent");
		table.text("dtlscipher");
		table.string("dtlsstate", 255);
		table.text("icelocalusernamefragment");
		table.text("icerole");
		table.string("icestate", 255);
		table.text("label");
		table.string("localcertificateid", 255);
		table.text("marker");
		table.integer("packetsreceived");
		table.integer("packetssent");
		table.string("remotecertificateid", 255);
		table.string("roomid", 255);
		table.integer("selectedcandidatepairchanges");
		table.string("selectedcandidatepairid", 255);
		table.text("srtpcipher");
		table.text("tlsgroup");
		table.text("tlsversion");
		table.string("userid", 255);
	});
};