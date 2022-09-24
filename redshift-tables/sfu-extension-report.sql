create table  IF NOT EXISTS sfu_extension_report (
	serviceid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	extensiontype	VARCHAR(65535)	not null,
	marker	VARCHAR(65535),
	mediaunitid	VARCHAR(255),
	payload	VARCHAR(65535),
	sfuid	CHAR(36)
) diststyle even;
ALTER TABLE sfu_extension_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_extension_report ALTER COMPOUND SORTKEY (sfuid);