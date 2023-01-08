const schemaName = "schema";
const tableName = "sfu_sctp_stream_report";
exports.up = function (knex) {
	return knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
		table.string("serviceid", 1024).notNull();
		table.string("mediaunitid", 1024).notNull();
		table.specificType("sfuid", "VARCHAR(254)").notNull();
		table.timestamp("timestamp", { useTz: false }).notNull();
		table.specificType("transportid", "VARCHAR(254)").notNull();
		table.specificType("streamid", "VARCHAR(254)").notNull();
		table.bigInteger("bytesreceived");
		table.bigInteger("bytessent");
		table.specificType("callid", "VARCHAR(254)");
		table.boolean("internal");
		table.text("label");
		table.text("marker");
		table.integer("messagereceived");
		table.integer("messagesent");
		table.string("protocol", 1024);
		table.string("roomid", 1024);
		table.text("sctpcongestionwindow");
		table.integer("sctpmtu");
		table.text("sctpreceiverwindow");
		table.text("sctpsmoothedroundtriptime");
		table.integer("sctpunackdata");
	});
};