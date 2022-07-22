const schemaName = "schema";
const tableName = "call_meta_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 255).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.specificType("callid", "CHAR(36)");
		table.specificType("clientid", "CHAR(36)");
		table.text("marker");
		table.string("mediaunitid", 255);
		unstructuredDataColumn(table, "payload");
		table.specificType("peerconnectionid", "CHAR(36)");
		table.string("roomid", 255);
		table.integer("sampleseq");
		table.bigInteger("sampletimestamp");
		table.text("type");
		table.string("userid", 255);
	});
};