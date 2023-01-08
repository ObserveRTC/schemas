const schemaName = "schema";
const tableName = "observer_event_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 1024).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.specificType("callid", "VARCHAR(254)").notNull();
		table.text("name").notNull();
		table.text("attachments");
		table.specificType("clientid", "VARCHAR(254)");
		table.text("marker");
		table.string("mediaunitid", 1024);
		table.text("message");
		table.specificType("peerconnectionid", "VARCHAR(254)");
		table.string("roomid", 1024);
		table.integer("sampleseq");
		table.bigInteger("sampletimestamp");
		table.string("userid", 1024);
		table.text("value");
	});
};