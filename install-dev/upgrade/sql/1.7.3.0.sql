SET SESSION sql_mode = '';
SET NAMES 'utf8';

UPDATE `PREFIX_tab` SET `position` = 0 WHERE `class_name` = 'AdminZones' AND `position` = '1';
UPDATE `PREFIX_tab` SET `position` = 1 WHERE `class_name` = 'AdminCountries' AND `position` = '0';

CREATE TABLE IF NOT EXISTS `PREFIX_store_lang` (
  `id_store` int(11) unsigned NOT NULL,
  `id_lang` int(11) unsigned NOT NULL,
  `name` varchar(128) NOT NULL,
  `address1` varchar(128) NOT NULL,
  `address2` varchar(128) DEFAULT NULL,
  `hours` text,
  `note` text,
  PRIMARY KEY (`id_store`, `id_lang`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8;

/* PHP:migrate_data_from_store_to_store_lang_and_clean_store(); */;
