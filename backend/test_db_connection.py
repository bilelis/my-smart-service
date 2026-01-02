import psycopg2
from psycopg2 import OperationalError

def test_connection(password, dbname="postgres"):
    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user="postgres",
            password=password,
            host="localhost",
            port="5432"
        )
        conn.close()
        return True
    except OperationalError as e:
        if "authentication failed" in str(e):
            return "AUTH_FAILED"
        return str(e)

def main():
    passwords = ["postgres", "admin", "root", "password", "1234", ""]
    print("🔍 Testing PostgreSQL connections...")
    
    found = False
    for pwd in passwords:
        display_pwd = pwd if pwd != "" else "(empty)"
        print(f"Testing password: '{display_pwd}'...", end=" ", flush=True)
        
        # First try to connect to default 'postgres' database to check password
        result = test_connection(pwd)
        
        if result is True:
            print("✅ SUCCESS!")
            print(f"\n🎉 FOUND IT! Your password is: '{display_pwd}'")
            
            # Now check if the target database exists
            print(f"Checking if 'internship_db' exists...", end=" ", flush=True)
            db_exists = test_connection(pwd, "internship_db")
            if db_exists is True:
                print("✅ Yes")
            elif "does not exist" in str(db_exists):
                print("❌ No (It needs to be created)")
            else:
                print(f"❌ Error: {db_exists}")
            
            found = True
            break
        elif result == "AUTH_FAILED":
            print("❌ Incorrect password")
        else:
            print(f"❌ Error: {result}")
            if "is the server running" in str(result):
                print("\n⚠️  It looks like your PostgreSQL server is NOT running.")
                print("Please make sure the 'postgresql' service is started.")
                return

    if not found:
        print("\n❌ None of the common passwords worked.")
        print("Please check your pgAdmin or PostgreSQL installation settings for the 'postgres' user password.")

if __name__ == "__main__":
    main()
