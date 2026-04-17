from playwright.sync_api import sync_playwright

def run_verify(page):
    try:
        page.goto("http://localhost:3000/admin")
        page.wait_for_timeout(3000)

        page.screenshot(path="/home/jules/verification/screenshots/admin_check_v3.png")

        # Check for header
        header = page.locator("h1:has-text('Executive Overview')")
        if header.is_visible():
            print("Admin Dashboard loaded successfully.")
        else:
            print("Admin Dashboard header NOT found.")

    except Exception as e:
        print(f"Error during verification: {e}")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        run_verify(page)
        context.close()
        browser.close()
