const schemaName = "schema";
const tableName = "sfu_extension_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 1024).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.text("extensiontype").notNull();
		table.text("marker");
		table.string("mediaunitid", 1024);
		unstructuredDataColumn(table, "payload");
		table.specificType("sfuid", "VARCHAR(254)");
	});
};