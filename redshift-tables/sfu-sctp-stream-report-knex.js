const schemaName = "schema";
const tableName = "sfu_sctp_stream_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 255).notNull();
		table.string("mediaunitid", 255).notNull();
		table.specificType("sfuid", "CHAR(36)").notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.specificType("transportid", "CHAR(36)").notNull();
		table.specificType("streamid", "CHAR(36)").notNull();
		table.bigInteger("bytesreceived");
		table.bigInteger("bytessent");
		table.specificType("callid", "CHAR(36)");
		table.boolean("internal");
		table.text("label");
		table.text("marker");
		table.integer("messagereceived");
		table.integer("messagesent");
		table.string("protocol", 255);
		table.string("roomid", 255);
		table.text("sctpcongestionwindow");
		table.integer("sctpmtu");
		table.text("sctpreceiverwindow");
		table.text("sctpsmoothedroundtriptime");
		table.integer("sctpunackdata");
	});
};