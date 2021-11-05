const typeORMConnectionOptions = {
  synchronize: true,
  type: 'sqlite',
  database: 'data/line.sqlite',

  entities: ['src/app/entity/**/*.[jt]s'],

  cli: { entitiesDir: 'src/app/entity' },

  logging: ['error', 'schema', 'warn'],
  logger: 'file'
}

module.exports = typeORMConnectionOptions
