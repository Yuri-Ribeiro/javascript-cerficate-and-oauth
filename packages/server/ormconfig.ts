const typeORMConnectionOptions = {
  synchronize: true,
  type: 'better-sqlite3',
  database: 'data/line.sqlite',

  entities: ['src/app/entity/**/*.[jt]s'],

  cli: { entitiesDir: 'src/app/entity' },

  logging: true,
  logger: 'file'
}

module.exports = typeORMConnectionOptions
