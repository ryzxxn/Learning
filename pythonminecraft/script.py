import os
import time
import zipfile
import subprocess
import schedule
import pywinauto

def backup_folder():
    # Stop the Minecraft server
    stop_server()
    time.sleep(5)
    close_window("Coconut")

    # Get the root directory path
    root_dir = os.path.dirname(os.path.abspath(__file__))

    # Set the source and destination folders
    source_folder = os.path.join(root_dir, 'minecraft')
    destination_folder = os.path.join(root_dir, 'backup')

    # Create a timestamp for the backup file
    timestamp = time.strftime('%Y-%m-%d-%H%M%S')

    # Create the backup file name
    backup_file = os.path.join(destination_folder, f'backup-{timestamp}.zip')

    # Create a zip file of the source folder
    with zipfile.ZipFile(backup_file, 'w') as zipf:
        for root, dirs, files in os.walk(source_folder):
            for file in files:
                zipf.write(os.path.join(root, file),
                           os.path.relpath(os.path.join(root, file), source_folder))

    print(f'Backup created: {backup_file}')

    # Restart the Minecraft server
    start_server()

def stop_server():
    # Connect to the console window
    app = pywinauto.Application().connect(title_re="Coconut")
    # Get the console window
    console = app.window(title_re="Coconut")
    # Send the command to the console
    console.type_keys("stop")
    # Send the Enter key to run the command
    console.type_keys("{ENTER}")

def start_server():
    # Get the root directory path
    root_dir = os.path.dirname(os.path.abspath(__file__))
    # Change the working directory to the minecraft folder
    os.chdir(os.path.join(root_dir, 'minecraft'))
    # Start the START.bat file in a new command prompt window in maximized state
    subprocess.Popen(['cmd', '/c', 'start', '/max', 'cmd', '/k', os.path.join(root_dir, 'minecraft', 'START.bat')])
    time.sleep(10)
    app = pywinauto.Application().connect(title_re="Coconut")
    # Get the console window
    console = app.window(title_re="Coconut")
    # Restore the console window if it is minimized or hidden
    console.restore()

def close_window(title):
    # Connect to the window with the specified title
    app = pywinauto.Application().connect(title_re=title)
    # Get the window object
    window = app.window(title_re=title)
    # Close the window
    window.close()

# Schedule the backup function to run every 12 hours
schedule.every(12).hours.do(backup_folder)

# Start the Minecraft server
start_server()

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(1)
