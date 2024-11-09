from databases import Database
from sqlalchemy import create_engine, MetaData
from config import DATABASE_URL

# Set up asynchronous connection and SQLAlchemy engine
database = Database(DATABASE_URL)
engine = create_engine(DATABASE_URL.replace("asyncmy", "pymysql"))  # Use pymysql for synchronous SQLAlchemy engine
metadata = MetaData()
