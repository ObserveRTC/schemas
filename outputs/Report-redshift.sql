create table  IF NOT EXISTS report (
	type	VARCHAR(65535)	not null,
	payload	VARCHAR(4096)	not null,
	schemaversion	VARCHAR(65535)
) diststyle even;
ALTER TABLE report ALTER diststyle KEY DISTKEY serviceid;