const schemaName = "schema";
const tableName = "sfu_event_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 1024).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.text("name").notNull();
		table.text("attachments");
		table.specificType("callid", "VARCHAR(254)");
		table.text("marker");
		table.string("mediasinkid", 1024);
		table.string("mediastreamid", 1024);
		table.string("mediaunitid", 1024);
		table.text("message");
		table.string("rtppadid", 1024);
		table.string("sctpstreamid", 1024);
		table.specificType("sfuid", "VARCHAR(254)");
		table.specificType("transportid", "VARCHAR(254)");
		table.text("value");
	});
};