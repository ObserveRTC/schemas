const schemaName = "schema";
const tableName = "sfu_extension_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 255).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.text("extensiontype").notNull();
		table.text("marker");
		table.string("mediaunitid", 255);
		unstructuredDataColumn(table, "payload");
		table.specificType("sfuid", "CHAR(36)");
	});
};