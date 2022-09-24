const schemaName = "schema";
const tableName = "sfu_meta_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 255).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.specificType("callid", "CHAR(36)");
		table.text("marker");
		table.string("mediasinkid", 255);
		table.string("mediastreamid", 255);
		table.string("mediaunitid", 255);
		unstructuredDataColumn(table, "payload");
		table.string("rtppadid", 255);
		table.string("sctpstreamid", 255);
		table.specificType("sfuid", "CHAR(36)");
		table.specificType("transportid", "CHAR(36)");
		table.text("type");
	});
};