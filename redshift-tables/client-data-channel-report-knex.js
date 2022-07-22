const schemaName = "schema";
const tableName = "client_data_channel_report";
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
		table.text("label");
		table.text("marker");
		table.integer("messagesreceived");
		table.integer("messagessent");
		table.text("peerconnectionlabel");
		table.string("protocol", 255);
		table.string("roomid", 255);
		table.string("state", 255);
		table.string("userid", 255);
	});
};