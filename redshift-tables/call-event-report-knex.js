const schemaName = "schema";
const tableName = "call_event_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 255).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.text("name").notNull();
		table.text("attachments");
		table.specificType("callid", "CHAR(36)");
		table.specificType("clientid", "CHAR(36)");
		table.text("marker");
		table.string("mediatrackid", 255);
		table.string("mediaunitid", 255);
		table.text("message");
		table.specificType("peerconnectionid", "CHAR(36)");
		table.string("roomid", 255);
		table.integer("sampleseq");
		table.bigInteger("sampletimestamp");
		table.bigInteger("ssrc");
		table.string("userid", 255);
		table.text("value");
	});
};