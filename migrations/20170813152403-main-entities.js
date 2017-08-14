'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('organization', {
    id: {type: 'bigint', primaryKey: true, autoIncrement: true},
    name: {type: 'string', notNull: true},
    created: {type: 'timestamp', defaultValue: new String("(now() at time zone 'utc')")},
    modified: {type: 'timestamp'},
  })

  db.createTable('eventure', {
    id: {type: 'bigint', primaryKey: true, autoIncrement: true},
    organization_id: {
      type: 'bigint',
      notNull: true,
      foreignKey: {
        name: 'eventure_organization_id_fk',
        table: 'organization',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    name: {type: 'string', notNull: true},
    created: {type: 'timestamp', defaultValue: new String("(now() at time zone 'utc')")},
    modified: {type: 'timestamp'},
  })

  db.createTable('listing', {
    id: {type: 'bigint', primaryKey: true, autoIncrement: true},
    name: {type: 'string', notNull: true},
    organization_id: {
      type: 'bigint',
      notNull: true,
      foreignKey: {
        name: 'listing_organization_id_fk',
        table: 'organization',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    eventure_id: {
      type: 'bigint',
      notNull: true,
      foreignKey: {
        name: 'listing_eventure_id_fk',
        table: 'eventure',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    created: {type: 'timestamp', defaultValue: new String("(now() at time zone 'utc')")},
    modified: {type: 'timestamp'},
  })

  db.createTable('listing_group', {
    id: {type: 'bigint', primaryKey: true, autoIncrement: true},
    name: {type: 'string', notNull: true},
    organization_id: {
      type: 'bigint',
      notNull: true,
      foreignKey: {
        name: 'listing_group_organization_id_fk',
        table: 'organization',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    eventure_id: {
      type: 'bigint',
      notNull: true,
      foreignKey: {
        name: 'listing_group_eventure_id_fk',
        table: 'eventure',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    listing_id: {
      type: 'bigint',
      notNull: true,
      foreignKey: {
        name: 'listing_group_listing_id_fk',
        table: 'listing',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    created: {type: 'timestamp', defaultValue: new String("(now() at time zone 'utc')")},
    modified: {type: 'timestamp'},
  })
  return null;
};

exports.down = function(db) {
  db.dropTable('listing_group');
  db.dropTable('listing');
  db.dropTable('eventure');
  db.dropTable('organization');
  return null;
};

exports._meta = {
  "version": 1
};
