const rootPath = 'packages/server'

const typeORMConnectionOptions = {
  synchronize: true,
  type: 'sqlite',
  database: `${rootPath}/data/line.sqlite`,

  entities: [`${rootPath}src/entity/**/*.[jt]s`],

  cli: { entitiesDir: `${rootPath}/src/entity` },

  logging: ['error', 'schema', 'warn'],
  logger: 'file'
}

module.exports = typeORMConnectionOptions
