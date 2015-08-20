from redash import models
from redash.models import db

if __name__ == '__main__':
    db.connect_db()

    if not models.Area.table_exists():
        print "Creating areas table..."
        models.Area.create_table()

    db.close_db(None)