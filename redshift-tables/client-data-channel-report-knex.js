const schemaName = "schema";
const tableName = "client_data_channel_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 1024).notNull();
		table.string("mediaunitid", 1024).notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.specificType("callid", "VARCHAR(254)").notNull();
		table.specificType("clientid", "VARCHAR(254)").notNull();
		table.specificType("peerconnectionid", "VARCHAR(254)").notNull();
		table.integer("sampleseq").notNull();
		table.bigInteger("bytesreceived");
		table.bigInteger("bytessent");
		table.text("label");
		table.text("marker");
		table.integer("messagesreceived");
		table.integer("messagessent");
		table.text("peerconnectionlabel");
		table.string("protocol", 1024);
		table.string("roomid", 1024);
		table.string("state", 1024);
		table.string("userid", 1024);
	});
};