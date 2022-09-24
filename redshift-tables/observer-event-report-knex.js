const schemaName = "schema";
const tableName = "observer_event_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 255).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.specificType("callid", "CHAR(36)").notNull();
		table.text("name").notNull();
		table.text("attachments");
		table.specificType("clientid", "CHAR(36)");
		table.text("marker");
		table.string("mediaunitid", 255);
		table.text("message");
		table.specificType("peerconnectionid", "CHAR(36)");
		table.string("roomid", 255);
		table.integer("sampleseq");
		table.bigInteger("sampletimestamp");
		table.string("userid", 255);
		table.text("value");
	});
};