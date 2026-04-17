from playwright.sync_api import sync_playwright

def run(page):
    errors = []
    page.on("console", lambda msg: errors.append(f"CONSOLE ERROR: {msg.text}") if msg.type == "error" else None)
    page.on("pageerror", lambda err: errors.append(f"PAGE ERROR: {err}"))

    def check_route(route, name):
        print(f"Checking {name} ({route})...")
        page.goto(f"http://localhost:3000{route}")
        page.wait_for_timeout(1000)
        if len(errors) > 0:
            print(f"  [!] Errors found on {route}: {errors}")
            # Clear errors for next route
            errors.clear()
        else:
            print(f"  [✓] {name} OK")

    routes = [
        ("/", "Home"),
        ("/rooms", "Rooms"),
        ("/dining", "Dining"),
        ("/events", "Events"),
        ("/about", "About"),
        ("/signin", "Sign In"),
        ("/admin", "Admin Dashboard"),
        ("/admin/reservations", "Reservations"),
        ("/admin/front-desk", "Front Desk"),
        ("/admin/housekeeping", "Housekeeping"),
        ("/admin/maintenance", "Maintenance"),
        ("/admin/reports", "Reports"),
        ("/admin/settings", "Settings"),
        ("/staff/tasks", "Staff Tasks")
    ]

    for route, name in routes:
        check_route(route, name)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run(page)
        finally:
            browser.close()
