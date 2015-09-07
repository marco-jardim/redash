from playhouse.migrate import PostgresqlMigrator, migrate

from redash.models import db
from redash import models

if __name__ == '__main__':
    db.connect_db()
    migrator = PostgresqlMigrator(db.database)
        
    with db.database.transaction():

        column = models.Group.countries
        column.null = True
        
        migrate(migrator.add_column('users', 'countries', models.Group.countries))

        # for group in models.Group.select():
        #     group.save()
        migrate(migrator.drop_not_null('users', 'countries'))

    db.close_db(None)
