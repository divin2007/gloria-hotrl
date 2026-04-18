from playwright.sync_api import sync_playwright

def run(page):
    # Log in as manager
    page.goto("http://localhost:3000/signin")
    page.click("text=Manager")
    page.wait_for_timeout(2000)

    print(f"Current URL: {page.url}")

    # Check for console errors
    # Note: we should have set up the console listener before navigation

    if "/dashboard/manager" in page.url:
        print("  [✓] Manager Dashboard reached")
        # Check if the header is visible
        if page.locator("h1:has-text('Executive Overview')").is_visible():
            print("  [✓] Header visible")
        else:
            print("  [!] Header NOT visible")
    else:
        print("  [!] Failed to reach Manager Dashboard")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        errors = []
        page.on("pageerror", lambda err: errors.append(err))

        try:
            run(page)
            if errors:
                print(f"  [!] Page Errors found: {errors}")
            else:
                print("  [✓] No Page Errors found")
        finally:
            browser.close()
